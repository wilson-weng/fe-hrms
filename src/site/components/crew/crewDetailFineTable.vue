<template>
  <list-view :table-attrs="table.attrs" :table-data="fineList" :pages="table.pages" :on-page-change="onPageChange"></list-view>
</template>

<script>
import listView from '../listView.vue';

export default {
  components: { listView },

  methods: {
    onPageChange(){
    },
    deleteFineRecord(row){
      this.currentRow = row;
      this.showConfirmDeleteDialog = true;
    },
    confirmDelete(){
      console.log(this.currentRow)
    },
  },
  data() {
    return {
      table: {
        pages: 2,
        attrs: [
          {prop: 'work_date', attrName: '日期', width: '150'},
          {prop: 'id', attrName: '员工编号'},
          {prop: 'real_name', attrName: '姓名'},
          {prop: 'fine_reason', attrName: '赔付原因'},
          {prop: 'fine_value', attrName: '赔付金额'},
          {prop: 'remark', attrName: '备注',},
          {
            prop: 'modify', attrName: '操作', buttons: [{
              onClick: this.deleteFineRecord, text: '撤销'
            }]
          }
        ]
      },
      fineList: [{
        id: 600001,
        real_name: '张三',
        work_date: '2018年8月18日',
        fine_reason: '商品破损',
        fine_value: '200元',
        remark: ''
      },{
        id: 600002,
        real_name: '张三',
        work_date: '2018年8月18日',
        fine_reason: '质量不达标',
        fine_value: '20元',
        remark: ''

      },{
        id: 600003,
        real_name: '张三',
        work_date: '2018年8月18日',
        fine_reason: '商品丢失',
        fine_value: '120元',
        remark: ''

      },{
        id: 600004,
        real_name: '张三',
        work_date: '2018年8月18日',
        fine_reason: '发错件',
        fine_value: '100元',
        remark: ''

      }],
      showConfirmDeleteDialog: false,
      currentRow: {}
    }
  },
}
</script>

