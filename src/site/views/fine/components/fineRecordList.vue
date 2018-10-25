<template>
  <div>
    <div class="el-card__header">
      <span style="margin-right: 20px; float: left;">赔付查询</span>
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
        <export-button style="float: right;" size="small" :file-title="getDownloadFileName()" file-id="fineDownload" :filters="filters" :getter="getFineRecords"></export-button>
      </div>
    </div>
    <list-view :table-data="fineList" :columns="columns" :pages="Math.ceil(fineTotalCount/10)" :on-page-change="onPageChange" :on-custom-comp="onTableButtonClick"></list-view>
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
      <info-list-item v-for='item in detailList' :title="item.title" :value="currentRow[item.field]" :key="item.value"></info-list-item>
    </el-dialog>

  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../../../components/listView.vue';
  import infoListItem from '../../../components/infoListItem.vue';
  import exportButton from '../../../components/tools/exportButton.vue';
  import {datePickerQuickSelections, fineColumns, fineDetailList} from '../../../constants/constants';

  export default {
    name: 'fineRecordList',
    props: ['crewId'],
    components: { listView, infoListItem, exportButton },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        fineList: state => state.fine.fine_list,
        fineTotalCount: state => state.fine.fine_total_count,
      }),
      filters: function(){
        return {
          start_time: this.dateRange? this.dateRange[0].getTime()/1000:0,
          end_time: this.dateRange? this.dateRange[1].getTime()/1000:0,
          page: this.page,
          page_size: 10,
          crew_id: this.crew_id
        }
      }
    },
    data() {
      return {
        page: 1,
        datePickerOptions: datePickerQuickSelections,
        currentRow: {},
        currentRowIndex: 0,
        dateRange: '',
        showConfirmDeleteDialog: false,
        showDetailDialog: false,
        columns: fineColumns,
        detailList: fineDetailList
      }
    },
    mounted(){
      this.query()
    },
    methods: {
      ...mapActions(['getFineRecords','exportFineRecords', 'deleteFineRecords']),
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
        }else if (params.type === 'delete'){
          this.showConfirmDeleteDialog = true
        }
      },
      confirmDelete(){
        this.deleteFineRecords({fine_id: this.currentRow.id, rowIndex: this.currentRowIndex}).then(()=>{
          this.showConfirmDeleteDialog = false;
          this.$message({message: '记录已撤销，如要恢复请重新上传', type: 'success'})
        })
      },
      query(callback){
        this.getFineRecords(this.filters).then(()=>{
          callback && callback()
        })
      },
      getDownloadFileName(){
        if(this.dateRange){
          return `赔付明细${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
        }else{
          return '赔付明细（最新5000条）.xlsx'
        }
      },
    },
  }

  import Vue from 'vue/dist/vue.js'

  Vue.component('fineTableOperation', {
    template: `
      <span>
        <el-button type="text" @click="viewHandle()">查看</el-button>
        <el-button type="text" @click="deleteHandle()">删除</el-button>
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

      deleteHandle(){
        let params = {type:'delete',index:this.index,rowData:this.rowData};
        this.$emit('on-custom-comp',params);

      }
    }
  })
</script>

