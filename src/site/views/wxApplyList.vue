<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <div slot="header" class="clearfix">
        <span style="margin-top: 5px; margin-right: 20px; float: left;">员工列表</span>
        <div >
          <el-input placeholder="输入员工姓名或手机搜索" v-model="searchKey" style="width: 250px" size="small"></el-input>
          <el-select v-model="source" placeholder="选择供应商" size="small">
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button icon="el-icon-search" size="small"></el-button>
          <el-button style="float: right;" size="small">导出名单</el-button>
        </div>
      </div>
      <list-view :table-attrs="table.attrs" :table-data="applyList" :pages="table.pages" :on-page-change="onPageChange"></list-view>
    </el-card>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import listView from '../components/listView.vue';

  export default {
    components: { listView },

    computed: {
      ...mapState({
        applyList: state => state.apply.apply_list,
      }),
    },

    methods: {
      toApplicantProfile(row){
        this.currentRow = row;
      },
      confirmApplicant(row){
      },
      removeApplicant(row){
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
        table: {
          pages: 2,
          attrs: [
            {prop: 'real_name', attrName: '姓名'},
            {prop: 'phone', attrName: '电话'},
            {prop: 'age', attrName: '年龄'},
            {prop: 'apply_reason', attrName: '申请意向'},
            {prop: 'profile', attrName: '个人资料', buttons: [{
                onClick: this.toApplicantProfile, text: '查看'
              }]},
            {prop: 'modify', attrName: '操作', buttons: [{
                onClick: this.confirmApplicant, text: '确认入职'
              },{
                onClick: this.removeApplicant, text: '移除'
              }]}
          ]
        },
        sourceOptions: [
          {value: 0, label: '待确认'},
          {value: 1, label: '已入职'},
          {value: 2, label: '已移除'},
        ],
        source: '',
      }
    },
  }
</script>
