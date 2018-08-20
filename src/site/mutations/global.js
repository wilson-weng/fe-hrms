import * as actions from '../actions/global';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  current_proj: {
    proj_thumbnail: 'http://www.jdwl.com/resource/images/logo.png',
    proj_name: '京东昆山亚一园区3C仓',
    proj_desc: '15元一小时，提供宿舍',
    crew_num: 100,
    current_crew_num: 80,
    month_cumulate_revenue: 189000,
    proj_msg_num: 10
  },
  current_user: {
    real_name: '王经理',
    phone: '18898323455'
  }
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_CUR_PROJ](state, obj) {
    state.current_proj = obj;
  },
  [mutationTypes.SET_CUR_USER](state, obj) {
    state.current_user = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
