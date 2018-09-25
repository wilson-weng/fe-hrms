<template>
  <list-view :table-attrs="table.attrs" :table-data="wageList" :pages="table.pages" :on-page-change="onPageChange"></list-view>
</template>

<script>
import listView from '../listView.vue';

export default {
  components: { listView },

  methods: {
    onPageChange(){
    }
  },
  data() {
    return {
      table: {
        pages: 1,
        attrs: [
          {prop: 'work_date', attrName: '日期', width: '150'},
          {prop: 'id', attrName: '员工编号'},
          {prop: 'real_name', attrName: '姓名'},
          {prop: 'work_hours', attrName: '工时'},
          {prop: 'work_counts', attrName: '件数'},
          {prop: 'wage', attrName: '结算金额'},
          {prop: 'remark', attrName: '备注',}
        ]
      },
      wageList: [{
        id: 600001,
        real_name: '张三',
        work_date: '2018年8月18日',
        work_counts: '18.9小时',
        work_hours: '1000件',
        wage: '180元',
        remark: '达到日最高上限'
      },{
        id: 600002,
        real_name: '张三',
        work_date: '2018年8月18日',
        work_counts: '12.3小时',
        work_hours: '8000件',
        wage: '150元',
        remark: ''

      },{
        id: 600003,
        real_name: '张三',
        work_date: '2018年8月18日',
        work_counts: '16.1小时',
        work_hours: '1200件',
        wage: '180元',
        remark: ''

      },{
        id: 600004,
        real_name: '张三',
        work_date: '2018年8月18日',
        work_counts: '11.9小时',
        work_hours: '400件',
        wage: '110元',
        remark: '人效不达标'

      }]
    }
  },
}
</script>

<style scoped>

</style>
