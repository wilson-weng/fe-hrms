export const fineColumns = [
  {title: '员工账号', field: 'crew_account', width: 50},
  {title: '员工姓名', field: 'crew_name', width: 50},
  {title: '异常单号', field: 'bill_id', width: 80},
  {title: '异常类型', field: 'fine_type', width: 250},
  {title: '赔付金额', field: 'amount', width: 100},
  {field: 'operate', title: '操作', componentName: 'proj-table-operation'}
];

export const fineDetailList = [
  {title: '员工账号', field: 'crew_account'},
  {title: '员工姓名', field: 'crew_name'},
  {title: '异常单号', field: 'bill_id'},
  {title: '异常类型', field: 'fine_type'},
  {title: '异常描述', field: 'desc'},
  {title: '赔付金额', field: 'amount'},
  {title: '发生时间', field: 'occur_time_str'},
  {title: '异常登记人员', field: '异常登记人员'},
  {title: '异常登记人员ERP', field: '异常登记人员ERP'},
];

export const fineUploadDataList = [
  {title: '员工账号', field: 'crew_account', example: 'shzhangsan0001'},
  {title: '员工姓名', field: 'crew_name', example: '张三'},
  {title: '异常单号', field: 'bill_id', example: '76702199458/76702554'},
  {title: '异常类型', field: 'fine_type', example: '错发'},
  {title: '异常描述', field: 'desc', example: '打包过程中货物错发'},
  {title: '赔付金额', field: 'amount', example: '100'},
  {title: '发生时间', field: 'occur_time_str', example: '2018-06-08'},
  {title: '异常登记人员', field: '异常登记人员', example: '老王'},
  {title: '异常登记人员ERP', field: '异常登记人员ERP', example: 'shlaowang'},
];



export const datePickerQuickSelections = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }]
}

