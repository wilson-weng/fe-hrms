import * as actions from '../actions/apply';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  apply_list: [{
    id: 600001,
    real_name: '张三',
    phone: '18800009988',
    age: '18',
    apply_time: '2018年7月1日',
    apply_reason: '能干活',
    apply_status: 0,
    has_record: 1,
    apply_status_text: '待确认',
  },{
    id: 600002,
    real_name: '张三',
    phone: '18800009988',
    age: '28',
    apply_time: '2018年7月1日',
    apply_reason: '吃苦耐劳',
    has_record: 0,
    apply_status: 1,
    apply_status_text: '已入职',

  },{
    id: 600003,
    real_name: '张三',
    phone: '18800009988',
    age: '22',
    apply_time: '2018年7月1日',
    apply_reason: '给钱够',
    has_record: 1,
    apply_status: 2,
    apply_status_text: '已移除',
  },{
    id: 600004,
    real_name: '张三',
    phone: '18800009988',
    age: '25',
    apply_time: '2018年7月1日',
    apply_reason: '包吃住',
    has_record: 0,
    apply_status: 0,
    apply_status_text: '待确认',
  }],
  recruit_page: {
    qrcode_url: 'http://img.atobo.com/ProductImg/EWM/UWeb/3/2/6/7/034/3267034/1.gif',
    name: '华东陆家园区招募',
    content: '',
    share_img_url: ''
  }
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_APPLY_LIST](state, obj) {
    state.apply_list = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
