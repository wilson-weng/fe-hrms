import * as actions from '../actions/fine';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  fine_list: [{
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

  }]
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_FINE_LIST](state, obj) {
    state.fine_list = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
