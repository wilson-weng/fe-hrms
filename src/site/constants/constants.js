export const fineColumns = [
  {title: '员工账号', field: 'crew_account', width: 100},
  {title: '员工姓名', field: 'crew_name', width: 100},
  {title: '异常单号', field: 'bill_id', width: 100},
  {title: '异常类型', field: 'fine_type', width: 100},
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

export const crewColumns = [
  {title: '姓名', field: 'crew_name', width: 100},
  {title: '账号', field: 'crew_account', width: 100},
  {title: '渠道', field: 'source', width: 100},
  {title: '手机号', field: 'phone', width: 100},
  {title: '入职时间', field: 'create_time_str', width: 100},
  {title: '累计天数', field: 'accumulate_work_days', width: 100},
  {title: '等级', field: 'level_name', width: 100},
  {title: '状态', field: 'work_status_str', width: 100},
  {field: 'operate', title: '操作', componentName: 'crew-table-operation'}
];

export const crewDetailList = [
  {title: '姓名', field: 'crew_name'},
  {title: '账号', field: 'crew_account'},
  {title: '渠道', field: 'source_str'},
  {title: '手机号', field: 'phone'},
  {title: '身份证号', field: 'id_card_num'},
  {title: '供应商', field: 'supplier_name'},
  {title: '入职时间', field: 'create_time_str'},
  {title: '累计天数', field: 'accumulate_work_days'},
  {title: '等级', field: 'level_name'},
  {title: '状态', field: 'work_status_str'},
];

export const crewUploadDataList = [
  {title: '姓名', field: 'crew_name', example: '张三'},
  {title: '手机号', field: 'phone', example: '18811112222'},
  {title: '身份证号', field: 'id_card_num', example: '330111199910901101'},
  {title: '账号', field: 'crew_account', example: 'shzhangsan0001'},
  {title: '供应商', field: 'supplier_name', example: '杭州人才劳务'},
];

export const wageColumns = [
  {title: '生产时间', field: 'wage_time_str', width: 100},
  {title: '姓名', field: 'crew_name', width: 100},
  {title: '账号', field: 'crew_account', width: 100},
  {title: '岗位', field: 'position', width: 100},
  {title: '工作数据', field: 'work_data', width: 100},
  {title: '当日收入', field: 'amount', width: 100},
  {field: 'operate', title: '操作', componentName: 'wage-table-operation'}
];

export const wageDetailList = [
  {title: '生产时间', field: 'wage_time_str'},
  {title: '姓名', field: 'crew_name'},
  {title: '账号', field: 'crew_account'},
  {title: '岗位', field: 'position'},
  {title: '工作数据', field: 'work_data'},
  {title: '当日收入', field: 'amount'},
];

export const wageUploadDataList = [
  {title: '姓名', field: 'crew_name', example: '张三'},
  {title: '账号', field: 'crew_account', example: 'shzhangsan0001'},
  {title: '生产时间', field: 'wage_time', example: '2018-10-10'},
  {title: '岗位', field: 'position', example: '拣货'},
  {title: '工作时长', field: 'work_hours', example: '8.2'},
  {title: '拣货件数', field: 'jh_amount', example: ''},
  {title: '复核件数', field: 'fh_amount', example: ''},
  {title: '打包一体化单量', field: 'yth_amount', example: ''},
  {title: '打包非一体化单量', field: 'fyth_amount', example: ''},
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

