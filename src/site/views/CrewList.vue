<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <div slot="header" class="clearfix">
        <span style="margin-top: 5px; margin-right: 20px; float: left;">员工列表</span>
        <div >
          <el-input placeholder="输入员工姓名或手机搜索" v-model="searchKey" style="width: 250px" size="small">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-button style="float: right;" size="small">导出名单</el-button>
        </div>
      </div>
      <el-table :data="crewList" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
        <el-table-column
          prop="id"
          label="员工编号">
        </el-table-column>
        <el-table-column
          prop="real_name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          prop="enrolled_time"
          label="入职日期">
        </el-table-column>
        <el-table-column
          prop="work_days"
          label="工作天数">
        </el-table-column>
        <el-table-column
          prop="work_days"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="toCrewDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="deleteCrew(scope.row)">离职</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          layout="prev, pager, next"
          :total="1">
        </el-pagination>
      </div>
    </el-card>
    <el-dialog
      :visible.sync="showConfirmDeleteDialog"
      width="30%">
      <span>点击确认设置员工离职。 如需恢复，可在操作台重新导入此人。</span>
          <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      crewList: state => state.crew.crew_list,
    }),
  },

  methods: {
    toCrewDetail(row){
    },
    cellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex == 0){
        return {paddingLeft: '12px'}
      }
    },
    headerCellStyle({row, column, rowIndex, columnIndex}){
      if(columnIndex == 0){
        return {background:'#F9FBFD', paddingLeft: '12px'}
      }else {
        return {background:'#F9FBFD'};
      }

    },
    deleteCrew(row){
      console.log(row)
      this.currentRow = row;
      this.showConfirmDeleteDialog = true;
    },
    confirmDelete(){
      console.log(this.currentRow)
    }
  },
  data() {
    return {
      searchKey: '',
      showConfirmDeleteDialog: false,
      currentRow: {}
    }
  },
}
</script>
