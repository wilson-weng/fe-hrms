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
          <el-select v-model="source" placeholder="选择供应商" size="small">
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button icon="el-icon-search" size="small"></el-button>
          <el-button style="float: right;" size="small">导出明细</el-button>
        </div>
      </div>
      <list-view :table-attrs="table.attrs" :table-data="wageList" :pages="table.pages" :on-page-change="onPageChange"></list-view>
    </el-card>
  </div>
</template>

<script>

  import { mapState } from 'vuex';
  import listView from '../components/listView.vue';

  import {datePickerQuickSelections} from '../constants/constants';

  export default {
    components: { listView},

    computed: {
      ...mapState({
        wageList: state => state.wage.wage_list,
      }),
    },

    methods: {
      onPageChange(){
        console.log('on page change', datePickerQuickSelections, this.dateRange)
      }
    },
    data() {
      return {
        table: {
          pages: 2,
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
        sourceOptions: [
          {value: 0, label: '全部供应商'},
          {value: 1, label: '一号供应商'},
          {value: 2, label: '二号供应商'},
          {value: 3, label: '三号供应商'},
        ],
        dateRange: '',
        datePickerOptions: datePickerQuickSelections,
        source: ''
      }
    },
  }
</script>
