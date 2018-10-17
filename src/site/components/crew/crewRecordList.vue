<template>
  <div>
    <div class="el-card__header">
      <span style="margin-top: 5px; margin-right: 20px; float: left;">员工列表</span>
      <div >
        <el-input placeholder="输入员工姓名或手机搜索" v-model="searchKey" style="width: 250px" size="small"></el-input>
        <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
        <export-button v-gear="'导出按钮'" style="float: right;" size="small" :file-title="getDownloadFileName()" file-id="crewDownload" :filters="filters" :getter="getCrewRecords"></export-button>
      </div>
    </div>
    <list-view :table-data="crewList" :columns="columns" :pages="Math.ceil(crewTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
    <el-dialog
      :visible.sync="showConfirmDeleteDialog"
      width="30%">
      <span>点击确认将设置员工离职，不在计算该员工薪资。如要恢复请在工作台重新导入</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../listView.vue';
  import infoListItem from '../infoListItem.vue';
  import exportButton from '../tools/exportButton.vue';
  import {loadFormatToColumns} from "src/site/utils/excel";

  export default {
    name: 'crewRecordList',
    components: { listView, infoListItem, exportButton },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        crewList: state => state.crew.crew_list,
        crewTotalCount: state => state.crew.crew_total_count,
      }),
      filters: function(){
        return {
          page: this.page,
          page_size: 10,
          proj_id: this.currentProj.id,
          search_key: this.searchKey
        }
      }
    },
    data() {
      return {
        columns: [],
        page: 1,
        searchKey: '',
        showConfirmDeleteDialog: false,
        remoteConfig: {
          tableColumns: '',
        }
      }
    },
    mounted(){
      this.query(()=>{
        this.columns = loadFormatToColumns(this.remoteConfig.tableColumns);
        this.columns.push({
          field: 'operate', title: '操作', componentName: 'crew-table-operation'
        });
        console.log(this.columns, this.crewList, this.crewTotalCount)
      })
    },
    methods: {
      ...mapActions(['getCrewRecords','exportCrewRecords', 'deleteCrewRecords', 'setCurrentCrew']),
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
        if(params.type === 'check'){
          this.setCurrentCrew(selectedRow);
          this.$router.push({path: '/crew/detail'});        }
      },
      query(callback){
        this.getCrewRecords(this.filters).then(()=>{
          callback && callback()
        })
      },
      getDownloadFileName(){
        if(this.dateRange){
          return `人员名单${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
        }else{
          return '人员名单（最新5000条）.xlsx'
        }
      }
    },
  }

  import Vue from 'vue/dist/vue.js'

  Vue.component('crewTableOperation', {
    template: `
      <span>
        <el-button type="text" @click="viewHandle()">详情</el-button>
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
      viewHandle(){
        let params = {type:'check',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);
      }
    }
  })
</script>

