<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}" v-show="!showOfferForm">
      <div class="el-card__header">
        <span style="margin-right: 20px; float: left;">赔付查询</span>
        <div >
          <el-input placeholder="输入员工姓名或手机搜索" v-model="filters.searchKey" style="width: 250px" size="small"></el-input>
          <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
          <el-button class="pull-right" size="small" @click="createOfferHandle()">+ 新建报价单</el-button>
        </div>
      </div>
      <list-view :table-data="offerList" :columns="columns" :pages="Math.ceil(offerTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
    </el-card>
    <el-card class="m-a-1" v-show="showOfferForm">
      <div slot="header">
        <span style="margin-right: 20px;">{{selectedOffer.id? '修改报价单':'新建报价单'}}</span>
        <span class="pull-right"><el-button size="small" type="default" @click="onOfferBack()">返回</el-button></span>
      </div>
      <offer-editor :offer-data="selectedOffer" :on-update="onOfferUpdate" :on-back="onOfferBack" v-if="showOfferForm"></offer-editor>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import pluginButton from '../../components/tools/pluginButton.vue';
  import offerEditor from './components/offerEditor.vue';
  import listView from '../../components/listView.vue';

  export default {
    props: [],

    components: { offerEditor, listView },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        offerList: state => state.proj.offer_list,
        offerTotalCount: state => state.proj.offer_total_count,
        offerPluginList: state => state.proj.offer_plugin_list,
      }),
      filters: function(){
        return {
          page: this.page,
          page_size: 10,
        }
      }
    },

    data() {
      return {
        showPlugins: false,
        showPluginDialog: false,
        showOfferForm: false,
        loading: true,
        columns: [
          {title: '生效日期', field: 'start_time_str', width: 100},
          {title: '岗位', field: 'position', width: 50},
          {title: '类型', field: 'offer_type_str', width: 80},
          {title: '结算规则', field: 'proj_name', componentName: 'offer-plugins', width: 250},
          {title: '收入范围', field: 'wage_range', width: 100},
          {field: 'operate', title: '操作', componentName: 'offer-table-operation'}
        ],        page: 1,
        selectedOffer: {}
      }
    },
    methods: {
      ...mapActions(['getProjOffers', 'getOfferPlugins', 'setCurrentProj']),
      query(){
        this.getProjOffers(this.filters);
      },
      onPageChange(page){
        this.page = page;
        this.query();
      },
      onFilterClick(){
        this.page = 1;
        this.query();
      },
      onTableButtonClick(params){
        let selectedRow = params.rowData;
        if(params.type === 'update'){
          this.selectedOffer = selectedRow;
          this.showOfferForm = true;
        }
        // if(params.type === 'offer'){
        //   this.setCurrentProj(selectedRow);
        //   this.$router.push({path: '/offer'});
        //
        // }
      },
      createOfferHandle(){
        this.selectedOffer = {};
        this.showOfferForm = true;
      },
      onOfferUpdate(){
        this.query();
        this.showOfferForm = false;
      },
      onOfferBack(){
        this.showOfferForm = false;
      }
    },

    created() {
      this.query();
      this.offerPluginList.length == 0 && this.getOfferPlugins();

    },
  }
  import Vue from 'vue/dist/vue.js'

  Vue.component('offerPlugins', {
    template: `
      <span>
        <plugin-button :props="plugin.props" :plugin="offerPluginMap[plugin.plugin_id]" :disabled="true" v-for="plugin in rowData.plugins"
          :key="plugin.key" style="margin: 2px;" v-if="offerPluginMap"></plugin-button>
      </span>`,
    props: ['rowData', 'field', 'index'],
    components: { pluginButton },
    computed: {
      ...mapState({
        offerPluginMap: state => state.proj.offer_plugin_map,
      })
    },
    methods: {
      updateHandle(){
        let params = {type:'update',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },
      offerHandle(){
        let params = {type:'offer',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },
    }
  })

  Vue.component('offerTableOperation', {
    template: `
      <span>
        <el-button type="text" @click="updateHandle()">修改</el-button>
      </span>`,
    props: {
      rowData: {
        type: Object
      },
      field: {
        type: String
      },
      index: {
        type: Number
      }
    },
    methods: {
      updateHandle(){
        let params = {type:'update',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },
    }
  })

</script>
