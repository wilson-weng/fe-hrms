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
      <list-view :table-attrs="table.attrs" :table-data="crewList" :pages="table.pages" :on-page-change="onPageChange"></list-view>
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
import listView from '../components/listView.vue';

export default {
  components: { listView},

  computed: {
    ...mapState({
      crewList: state => state.crew.crew_list,
    }),
  },

  methods: {
    toCrewDetail(row){
    },

    deleteCrew(row){
      this.currentRow = row;
      this.showConfirmDeleteDialog = true;
    },
    confirmDelete(){
      console.log(this.currentRow)
    },
    onPageChange(){
      console.log('on page change')
    }
  },
  data() {
    return {
      searchKey: '',
      showConfirmDeleteDialog: false,
      currentRow: {},
      table: {
        pages: 2,
        attrs: [{prop: 'id', attrName: '员工编号'},{prop: 'real_name', attrName: '姓名'},
          {prop: 'phone', attrName: '电话'},{prop: 'enrolled_time', attrName: '入职日期'},
          {prop: 'work_days', attrName: '工作天数'},{prop: 'modify', attrName: '操作',
            buttons: [{
            onClick: this.toCrewDetail, text: '查看'
            },{
              onClick: this.deleteCrew, text: '离职'
            }]
          }]
      }
    }
  },
}
</script>
