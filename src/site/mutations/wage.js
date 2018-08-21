import * as actions from '../actions/wage';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  wage_list: [{
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
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_WAGE_LIST](state, obj) {
    state.wage_list = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
