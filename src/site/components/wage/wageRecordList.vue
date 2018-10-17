<template>
  <div>
    <div class="el-card__header">
      <span style="margin-right: 20px; float: left;">结算查询</span>
      <div >
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="datePickerOptions" size="small">
        </el-date-picker>
        <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
        <el-button style="float: right;" size="small" @click="showExportPanel = !showExportPanel">{{showExportPanel?'收起':'导出明细'}}</el-button>
      </div>
    </div>
    <wage-export-panel v-gear="'结算导出'" :filters="filters" v-show="showExportPanel"></wage-export-panel>
    <list-view :table-data="wageList" :columns="columns" :pages="Math.ceil(wageTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
    <el-dialog
      :visible.sync="showDetailDialog"
      title="结算详情"
      width="50%">
      <info-list-item v-for='value, key in getDetailList()' :title="key" :value="value" :key="key"></info-list-item>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../listView.vue';
  import infoListItem from '../infoListItem.vue';
  import exportButton from '../tools/exportButton.vue';
  import wageExportPanel from './wageExportPanel.vue';
  import {datePickerQuickSelections} from '../../constants/constants';
  import {loadFormatToColumns, translateDataByFormat} from '../../utils/excel';

  export default {
    name: 'wageRecordList',
    props: ['crewId'],
    components: { listView, infoListItem, exportButton, wageExportPanel },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        wageList: state => state.wage.wage_list,
        wageTotalCount: state => state.wage.wage_total_count,
      }),
      filters: function(){
        return {
          start_time: this.dateRange? this.dateRange[0].getTime()/1000:0,
          end_time: this.dateRange? this.dateRange[1].getTime()/1000:0,
          page: this.page,
          page_size: 10,
          proj_id: this.currentProj.id,
          crew_id: ''
        }
      }
    },
    data() {
      return {
        columns: [],
        page: 1,
        showExportPanel: false,
        datePickerOptions: datePickerQuickSelections,
        currentRow: {},
        currentRowIndex: 0,
        dateRange: '',
        showDetailDialog: false,
        remoteConfig: {
          tableColumns: '',
          detailInfoList: '',
        }
      }
    },
    mounted(){
      this.crewId && (this.filters.crew_id = this.crewId);
      this.query(()=>{
        this.columns = loadFormatToColumns(this.remoteConfig.tableColumns);
        this.columns.push({
          field: 'operate', title: '操作', componentName: 'wage-table-operation'
        });
      })
    },
    methods: {
      ...mapActions(['getWageRecords']),
      onPageChange(page){
        this.page = page;
        this.query();
      },

      onFilterClick(){
        this.page = 1;
        this.query();
      },
      onTableButtonClick(params){
        this.currentRow = params.rowData;
        this.currentRowIndex = params.index;
        if(params.type === 'check'){
          this.showDetailDialog = true;
        }
      },
      query(callback){
        this.getWageRecords(this.filters).then(()=>{
          callback && callback()
        })
      },
      getDownloadFileName(){
        if(this.dateRange){
          return `结算明细${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
        }else{
          return '结算明细（最新5000条）.xlsx'
        }
      },
      getDetailList(){
        return translateDataByFormat([this.currentRow], this.remoteConfig.detailInfoList)[0]
      }
    },
  }

  import Vue from 'vue/dist/vue.js'

  Vue.component('wageTableOperation', {
    template: `
      <span>
        <el-button type="text" @click="viewHandle()">查看</el-button>
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
      },
    }
  })
</script>

