<template>
  <div>
    <div class="el-card__header">
      <span class="inline-block" style="margin-top: 5px; margin-right: 20px">单位管理</span>
      <div class="inline-block pull-right">
        <el-button size="small" @click="createProjHandle()">+ 新建项目</el-button>
      </div>
    </div>
    <list-view :table-data="displayList" :columns="columns" :pages="Math.ceil(projTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
    <el-dialog
      :visible.sync="showProjForm"
      :title="selectedProj.id? '新建项目':'修改项目'"
      width="50%">
      <proj-base-editor :proj-data="selectedProj" :on-update="onProjUpdate"></proj-base-editor>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../../../components/listView.vue';
  import ProjBaseEditor from "src/site/views/proj/components/projBaseEditor";

  export default {
    name: 'projRecordList',
    components: { listView,  ProjBaseEditor},

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        projList: state => state.proj.proj_list,
        projTotalCount: state => state.proj.proj_total_count,
      }),
    },
    data() {
      return {
        columns: [
          {title: '大区', field: 'region', width: 50},
          {title: '城市', field: 'city', width: 50},
          {title: '类型', field: 'category', width: 80},
          {title: '项目名称', field: 'proj_name', width: 250},
          {title: '项目编号', field: 'proj_code', width: 100},
          {field: 'operate', title: '操作', componentName: 'proj-table-operation'}
        ],
        page: 1,
        showProjForm: false,
        selectedProj: {},
        displayList: []
      }
    },
    created(){
      this.query();
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
          this.selectedProj = selectedRow;
          this.showProjForm = true;
        }
        if(params.type === 'offer'){
          this.setCurrentProj(selectedRow);
          this.$router.push({path: '/offer'});
        }
      },
      onProjUpdate(){
        this.showProjForm = false;
        this.query();
      },
      createProjHandle(){
        this.selectedProj = {};
        this.showProjForm = true;
      },
      query(){
        this.displayList = this.projList.slice((this.page-1)*10, this.page * 10)
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

