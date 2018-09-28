<template>
  <el-card class="m-a-1">
    <div slot="header" class="clearfix">
      <span style="margin-top: 5px; margin-right: 20px; float: left;">赔付查询</span>
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
        <el-button style="float: right;" size="small" @click="exportFines()">导出明细</el-button>
        <a href="" :download="getDownloadFileName()" id="fineDownload"></a>
      </div>
    </div>
    <list-view :table-attrs="tableAttrs" :table-data="fineList" :pages="Math.ceil(fineQueryCount/10)" :on-page-change="onPageChange"></list-view>
    <el-dialog
      :visible.sync="showConfirmDeleteDialog"
      width="30%">
      <span>点击确认撤销改记录，撤销后员工无需赔付。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showDetailDialog"
      title="赔付详情"
      width="50%">
      <info-list-item v-for='item in Object.keys(currentRow)' :title="item" :value="currentRow[item]" :key="item"></info-list-item>
    </el-dialog>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import listView from '../listView.vue';
  import infoListItem from '../infoListItem.vue';
  import { downloadExcel } from '../../utils/excel';

  import {datePickerQuickSelections} from '../../constants/constants';

  export default {
    components: { listView, infoListItem },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        currentCrew: state => state.crew.current_crew,
        fineList: state => state.fine.fine_list,
        fineTableDisplay: state => state.fine.fine_table_display,
        fineQueryCount: state => state.fine.fine_query_count,
      }),
      filters: function(){
        return {
          startTime: this.dateRange? this.dateRange[0].getTime()/1000:0,
          endTime: this.dateRange? this.dateRange[1].getTime()/1000:0,
          crew_id: this.currentCrew.id
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
        showDetailDialog: false
      }
    },
    created(){
      this.query(1, ()=>{
        this.tableAttrs = this.fineTableDisplay.split(',').map(item=>{
          return {prop: item, attrName: item}
        });
        this.tableAttrs.push({prop: 'modify', attrName: '操作', buttons: [{
            onClick: this.viewFineRecord, text: '详情'
          },{
            onClick: this.deleteFineRecord, text: '撤销'
          }]})
      })
    },
    methods: {
      ...mapActions(['getFineRecords','exportFineRecords', 'deleteFineRecords']),
      onPageChange(page){
        this.query(page);
      },
      deleteFineRecord(row, index){
        this.currentRow = row;
        this.currentRowIndex = index;
        this.showConfirmDeleteDialog = true;
      },
      confirmDelete(){
        this.deleteFineRecords({proj_id: this.currentProj.id, fine_id: this.currentRow.id}, this.currentRowIndex).then(()=>{
          this.showConfirmDeleteDialog = false;
          this.$message({message: '记录已撤销，如要恢复请重新上传', type: 'success'})
        })
      },
      onFilterClick(){
        this.query(1);
      },
      viewFineRecord(row){
        this.currentRow = row;
        this.showDetailDialog = true;
      },
      query(page, callback){
        this.getFineRecords({page: page, proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(()=>{
          callback && callback()
        })
      },
      exportFines(){
        this.exportFineRecords({proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(content=>{
          downloadExcel('异常明细', JSON.parse(content.result), 'xlsx', 'fineDownload')
        })
      },
      getDownloadFileName(){
        if(this.dateRange){
          return `赔付明细${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
        }else{
          return '赔付明细（最新5000条）.xlsx'
        }
      }
    },

  }
</script>

