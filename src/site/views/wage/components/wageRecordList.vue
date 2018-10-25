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
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="datePickerOptions" size="small">
        </el-date-picker>
        <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
        <el-button style="float: right;" size="small" @click="showExportPanel = !showExportPanel">{{showExportPanel?'收起':'导出明细'}}</el-button>
      </div>
    </div>
    <wage-export-panel :filters="filters" v-show="showExportPanel"></wage-export-panel>
    <list-view :table-data="wageList" :columns="columns" :pages="Math.ceil(wageTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
    <el-dialog
      :visible.sync="showDetailDialog"
      title="结算详情"
      width="50%">
      <info-list-item v-for='item in detailList' :title="item.title" :value="currentRow[item.field]" :key="item.value"></info-list-item>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../../../components/listView.vue';
  import infoListItem from '../../../components/infoListItem.vue';
  import exportButton from '../../../components/tools/exportButton.vue';
  import wageExportPanel from './wageExportPanel.vue';
  import {datePickerQuickSelections, wageColumns, wageDetailList} from '../../../constants/constants';

  export default {
    name: 'wageRecordList',
    props: ['crewId'],
    components: { listView, infoListItem, exportButton, wageExportPanel },

    computed: {
      ...mapState({
        wageList: state => state.wage.wage_list,
        wageTotalCount: state => state.wage.wage_total_count,
      }),
      filters: function(){
        return {
          start_time: this.dateRange? this.dateRange[0].getTime()/1000:0,
          end_time: this.dateRange? this.dateRange[1].getTime()/1000:0,
          page: this.page,
          page_size: 10,
          crew_id: this.crewId
        }
      }
    },
    data() {
      return {
        columns: wageColumns,
        page: 1,
        showExportPanel: false,
        datePickerOptions: datePickerQuickSelections,
        currentRow: {},
        currentRowIndex: 0,
        dateRange: '',
        showDetailDialog: false,
        detailList: wageDetailList
      }
    },
    mounted(){
      this.query()
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

