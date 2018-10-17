<template>
  <div>
    <div class="el-card__header">
      <span style="margin-top: 5px; margin-right: 20px; float: left;">单位管理</span>
      <div >
        <el-input placeholder="输入员工姓名或手机搜索" v-model="filters.searchKey" style="width: 250px" size="small"></el-input>
        <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
        <el-button class="pull-right" size="small" @click="showProjForm = true">+ 新建项目</el-button>
      </div>
    </div>
    <list-view :table-data="projList" :columns="columns" :pages="Math.ceil(projTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
    <el-dialog
      :visible.sync="showProjForm"
      :title="currentProj.id? '新建项目':'修改项目'"
      width="50%">
      <proj-base-editor :proj-data="currentProj" :on-update="onProjUpdate"></proj-base-editor>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../listView.vue';
  import ProjBaseEditor from "src/site/components/proj/projBaseEditor";
  import {loadFormatToColumns} from "src/site/utils/excel";

  export default {
    name: 'projRecordList',
    components: { listView,  ProjBaseEditor},

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        projList: state => state.proj.proj_list,
        projTotalCount: state => state.proj.proj_total_count,
      }),
      filters: function(){
        return {
          page: this.page,
          page_size: 10,
          search_key: ''
        }
      }
    },
    data() {
      return {
        columns: [],
        page: 1,
        showProjForm: false,
        currentProj: {},
        remoteConfig: {
          tableColumns: '大区|region,城市|city,项目名称|proj_name,类型|category,项目编号|proj_code',
        }
      }
    },
    mounted(){
      this.query();
      this.columns = loadFormatToColumns(this.remoteConfig.tableColumns);
      this.columns.push({
        field: 'operate', title: '操作', componentName: 'proj-table-operation'
      });
    },
    methods: {
      ...mapActions(['getProjs', 'setCurrentProj']),
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
          this.setCurrentProj(selectedRow);
          this.showProjForm = true;
        }
        if(params.type === 'offer'){
          this.setCurrentProj(selectedRow);
          // this.$router.push({path: '/crew/detail'});

        }
      },
      query(){
        this.getProjs(this.filters);
      },
      onProjUpdate(){
        this.showProjForm = false;
        this.queryProjs();
      }
    },
  }

  import Vue from 'vue/dist/vue.js'

  Vue.component('projTableOperation', {
    template: `
      <span>
        <el-button type="text" @click="updateHandle()">修改</el-button>
        <el-button type="text" @click="offerHandle()">报价单</el-button>
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
      offerHandle(){
        let params = {type:'offer',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      },
    }
  })
</script>

