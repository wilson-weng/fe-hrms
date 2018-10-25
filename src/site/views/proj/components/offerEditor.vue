<template>
  <el-row type="flex" :gutter="40">
    <el-col>
      <el-form label-position="right" label-width="100px" :model="offerModel" v-loading="loading" style="margin-top: 1em;">
        <el-form-item label="岗位: ">
          <el-autocomplete
            class="inline-input"
            :disabled="isUpdate"
            v-model="offerModel.position" style="max-width: 220px"
            :fetch-suggestions="querySearch"
            placeholder="请输入岗位名称"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="类型: ">
          <el-radio v-model="offerModel.offer_type" :label="0" :disabled="isUpdate">员工到手</el-radio>
          <el-radio v-model="offerModel.offer_type" :label="1" :disabled="isUpdate">供应商应收</el-radio>
        </el-form-item>
        <el-form-item label="标准工作量: ">
          <el-input v-model="offerModel.standard_value" style="max-width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="生效日期: ">
          <el-date-picker
            v-model="startDate" :disabled="isUpdate"
            type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结算规则： ">
          <div>从右侧选取结算规则添加</div>
        </el-form-item>
        <div v-for="(item, index) in plugins" style="border: 1px solid #e8e8e8; margin-bottom: 8px">
          <div class="text-center m-t-2"> {{'规则' + (index + 1) +': '+ item.name}}</div>
          <div class="subtitle text-center p-a-2" style="font-size: 0.88rem; margin-bottom: 8px">{{item.desc}}</div>
          <el-form-item :label="prop.comment + ': ' " v-for="(prop, propIndex) in item.props" :key="prop.name">
            <el-input v-model="plugins[index].props[propIndex].value" style="max-width: 220px" :type="prop.type"></el-input>
          </el-form-item>
        </div>
        <el-form-item class="text-right">
          <el-button type="primary" @click="confirmUpdate()">确定</el-button>
          <el-button type="default" @click="onBack&&onBack()">返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col style="overflow-y: auto">
      <h3>结算规则选择： </h3>
      <el-collapse v-model="activePlugin" accordion >
        <el-collapse-item :title="item.name" :name="item.id" :key="item.id" v-for="item in offerPluginList">
          <div class="subtitle" style="font-size: 0.88rem; margin-bottom: 8px">{{item.desc}}</div>
          <div>参数：
            <el-tag type="success" v-for="tag in item.props" :key="tag.name" style="margin: 4px;">{{tag.comment}}</el-tag>
          </div>
          <div class="text-right">
            <el-button @click="addPlugin(item)" size="small" :type="isPluginAdded(item)?'default':'primary'" :disabled="isPluginAdded(item)">{{isPluginAdded(item)?'已添加': '添加'}}</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>

</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import imgUploader from '../../../components/imgUploader.vue';
  import ImgSquare from "src/site/components/imgSquare";

  export default {
    components: {ImgSquare, imgUploader },
    props: ['onUpdate', 'offerData', 'onBack'],
    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        offerPluginList: state => state.proj.offer_plugin_list,
        offerPluginMap: state => state.proj.offer_plugin_map,
      }),
    },
    data() {
      return {
        offerModel: {},
        loading: false,
        startDate: '',
        activePlugin: '',
        plugins: [],
        isUpdate: false,
      }
    },

    methods: {
      ...mapActions(['updateOffer', 'createOffer', 'getOfferPlugins', 'updatePlugin']),

      confirmUpdate(){
        this.loading = true;

        this.startDate && (this.offerModel.start_time = new Date(this.startDate).getTime()/1000);
        let apiFunc = this.isUpdate? this.updateOffer : this.createOffer;
        apiFunc(this.offerModel).then(res=>{
          for(let plugin of this.plugins){
            let props = {};
            for(let item of plugin.props){
              props[item.name] = item.value;
            }
            let params = {
              bus_type: 'offer',
              bus_id: res.data.id,
              plugin_id: plugin.id,
              plugin_name: plugin.name,
              props: JSON.stringify(props),
            };
            this.updatePlugin(params);
          }
          this.loading = false;
          this.onUpdate(this.offerModel)
        })
      },
      addPlugin(plugin){
        this.plugins.push(Object.assign({}, plugin));
      },
      initPlugins(){
        if(!this.isUpdate){
          return;
        }
        for(let item of this.offerModel.plugins){
          let plugin = Object.assign({}, this.offerPluginMap[item.plugin_id]);
          for(let prop of plugin.props){
            let itemProps = JSON.parse(item.props);
            prop.value = itemProps[prop.name]
          }
          this.plugins.push(plugin);
        }
      },
      isPluginAdded(item){
        let index = this.plugins.findIndex(p => p.name == item.name)
        return index >= 0
      },
      querySearch(queryString, cb) {
        var options = this.currentProj.position_options.map(item=>{
          return {value: item}
        });
        options.splice(0,0,{value: '所有'});
        cb(options);
      },
    },

    mounted() {
      this.isUpdate = !!this.offerData.id;
      this.offerModel = JSON.parse(JSON.stringify(this.offerData));
      this.isUpdate && (this.startDate = this.offerModel.start_time_str);
      if(this.offerPluginList.length == 0){
        this.getOfferPlugins().then(()=>this.initPlugins())
      }else{
        this.initPlugins();
      }
    }
  }
</script>
