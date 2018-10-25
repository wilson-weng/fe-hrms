<template>
  <el-container class="height-100">
    <el-header class="layout-header">
      <nav-top></nav-top>
    </el-header>
    <el-container class="height-100">
      <el-aside width="200px">
        <nav-slider></nav-slider>
      </el-aside>
      <div style="background-color: #F9FBFD;" class="width-100">
        <selection-bar v-if="showSelectionBar" :selected="currentProj" :options="projList" :on-select="onOrgSelect" :on-expand="onBarExpand">
          <div class="inline-block">{{currentProj? '单位: '+currentProj.proj_name: '请选择单位'}}</div>
        </selection-bar>
        <router-view class="router-view" v-if="!showSelectionBar || (showSelectionBar && currentProj)"></router-view>
      </div>
    </el-container>
  </el-container>
</template>


<script>
  import navTop from '../components/layout/navTop.vue';
  import navSlider from '../components/layout/navSlider.vue';
  import selectionBar from '../components/layout/selectionBar.vue';
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState({
        projList: state => state.proj.proj_list.map(item => {
          return { id: item.id, name: item.proj_name, filters: {'大区': item.region, '城市': item.city, '分类': item.category}};
        }),
        projRawList: state => state.proj.proj_list,
        currentProj: state => state.global.current_proj,
      })
    },
    components: { navTop, navSlider, selectionBar},

    data() {
      return {
        showSelectionBar: false,
      }
    },
    methods: {
      ...mapActions(['getProjs', 'setCurrentProj']),
      onOrgSelect(proj_id){
        this.setCurrentProj(this.projRawList.find(item=>item.id == proj_id))
      },
      query(){
        this.getProjs({page: 1, page_size: 5000});
      },
      onBarExpand(){
        if(!this.projList || this.projList.length == 0){
          this.query();
        }
      }
    },
    created(){
      this.query();
      if(this.$route.meta && this.$route.meta.projBar){
        this.showSelectionBar = true;
      }else{
        this.showSelectionBar = false;
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.meta && val.meta.projBar){
            this.showSelectionBar = true;
          }else{
            this.showSelectionBar = false;
          }
        },

        // 深度观察监听
        deep: true
      }
    },
  }
</script>
