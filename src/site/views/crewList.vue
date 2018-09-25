<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <div slot="header" class="clearfix">
        <span style="margin-top: 5px; margin-right: 20px; float: left;">员工列表</span>
        <div >
          <el-input placeholder="输入员工姓名或手机搜索" v-model="searchKey" style="width: 250px" size="small"></el-input>
          <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
          <el-button style="float: right;" size="small" @click="exportCrews()">导出明细</el-button>
          <a href="" download="人员名单.xlsx" id="crewDownload"></a>
        </div>
      </div>
      <list-view :table-attrs="tableAttrs" :table-data="crewList" :pages="Math.ceil(crewQueryCount/10)" :on-page-change="onPageChange"></list-view>
      <el-dialog
        :visible.sync="showConfirmDeleteDialog"
        width="30%">
        <span>点击确认将设置员工离职，不在计算该员工薪资。如要恢复请在工作台重新导入</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import listView from '../components/listView.vue';
import infoListItem from '../components/infoListItem.vue';
import { downloadExcel } from '../utils/excel';

import {datePickerQuickSelections} from '../constants/constants';

export default {
  components: { listView, infoListItem },

  computed: {
    ...mapState({
      currentProj: state => state.global.current_proj,
      crewList: state => state.crew.crew_list,
      crewTableDisplay: state => state.crew.crew_table_display,
      crewQueryCount: state => state.crew.crew_query_count,
    }),
    filters: function(){
      return {
        searchKey: this.searchKey
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
      searchKey: '',
      showDetailDialog: false
    }
  },
  created(){
    this.query(1, ()=>{
      this.tableAttrs = this.crewTableDisplay.split(',').map(item=>{
        return {prop: item, attrName: item}
      });
      this.tableAttrs.push({prop: 'modify', attrName: '操作', buttons: [{
          onClick: this.viewCrewRecord, text: '详情'
        },{
          onClick: this.deleteCrewRecord, text: '撤销'
        }]})
    })
  },
  methods: {
    ...mapActions(['getCrewRecords','exportCrewRecords', 'deleteCrewRecords', 'setCurrentCrew']),
    onPageChange(page){
      this.query(page);
    },
    deleteCrewRecord(row, index){
      this.currentRow = row;
      this.currentRowIndex = index;
      this.showConfirmDeleteDialog = true;
    },
    confirmDelete(){
      this.deleteCrewRecords({proj_id: this.currentProj.id, crew_id: this.currentRow.id}, this.currentRowIndex).then(()=>{
        this.showConfirmDeleteDialog = false;
        this.$message({message: '记录已撤销，如要恢复请重新上传', type: 'success'})
      })
    },
    onFilterClick(){
      this.query(1);
    },
    viewCrewRecord(row){
      this.setCurrentCrew(row);
      this.$router.push({path: '/crew/detail'});
    },
    query(page, callback){
      this.getCrewRecords({page: page, proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(()=>{
        callback && callback()
      })
    },
    exportCrews(){
      this.exportCrewRecords({proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(content=>{
        downloadExcel('人员名单', JSON.parse(content.result), 'xlsx', 'crewDownload')
      })
    }
  },

}
</script>
