<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <div slot="header" class="clearfix">
        <span style="margin-top: 5px; margin-right: 20px; float: left;">结算查询</span>
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
          <!--<el-select v-model="source" placeholder="选择供应商" size="small">-->
          <!--<el-option-->
          <!--v-for="item in sourceOptions"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <el-button icon="el-icon-search" size="small"></el-button>
          <el-button style="float: right;" size="small" @click="showExportPanel = !showExportPanel">{{showExportPanel?'收起':'导出明细'}}</el-button>
        </div>
      </div>
      <wage-export-panel v-show="showExportPanel"></wage-export-panel>
      <list-view :table-attrs="tableAttrs" :table-data="wageList" :pages="Math.ceil(wageQueryCount/10)" :on-page-change="onPageChange"></list-view>
    </el-card>
    <el-dialog
      :visible.sync="showDetailDialog"
      title="结算详情"
      width="50%">
      <info-list-item v-for='item in Object.keys(currentRow)' :title="item" :value="currentRow[item]" :key="item"></info-list-item>
    </el-dialog>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../../../components/listView.vue';
  import wageExportPanel from '../../wage/components/wageExportPanel.vue';
  import infoListItem from '../../../components/infoListItem.vue';
  import { downloadExcel } from '../../../utils/excel';

  import {datePickerQuickSelections} from '../../../constants/constants';

  export default {
    components: { listView, infoListItem, wageExportPanel },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        currentCrew: state => state.crew.current_crew,
        wageList: state => state.wage.wage_list,
        wageTableDisplay: state => state.wage.wage_table_display,
        wageQueryCount: state => state.wage.wage_query_count,
      }),
      filters: function(){
        return {
          startTime: this.dateRange? this.dateRange[0].getTime()/1000:0,
          endTime: this.dateRange? this.dateRange[1].getTime()/1000:0,
          crew_id: this.currentCrew.id,
        }
      }
    },
    data() {
      return {
        tableAttrs: [],
        datePickerOptions: datePickerQuickSelections,
        showConfirmDeleteDialog: false,
        currentRow: {},
        currentRowIndex: 0,
        dateRange: '',
        showDetailDialog: false,
        showExportPanel: false
      }
    },
    created(){
      this.query(1, ()=>{
        this.tableAttrs = this.wageTableDisplay.split(',').map(item=>{
          return {prop: item, attrName: item}
        });
        this.tableAttrs.push({prop: 'modify', attrName: '操作', buttons: [{
            onClick: this.viewWageRecord, text: '详情'
          }]})
      })
    },
    methods: {
      ...mapActions(['getWageRecords','exportWageRecords']),
      onPageChange(page){
        this.query(page);
      },
      onFilterClick(){
        this.query(1);
      },
      viewWageRecord(row){
        this.currentRow = row;
        this.showDetailDialog = true;
      },
      query(page, callback){
        this.getWageRecords({page: page, proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(()=>{
          callback && callback()
        })
      },
      exportWages(){
        this.exportWageRecords({proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(content=>{
          downloadExcel('结算明细', JSON.parse(content.result), 'xlsx', 'wageDownload')
        })
      },
      getDownloadFileName(){
        if(this.dateRange){
          return `结算明细${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
        }else{
          return '结算明细（最新500条）.xlsx'
        }
      }
    },

  }
</script>
