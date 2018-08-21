import * as actions from '../actions/proj';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  proj_list: [{
    id: 1,
    proj_thumbnail: 'http://www.jdwl.com/resource/images/logo.png',
    proj_name: '京东昆山亚一园区3C仓',
    proj_desc: '15元一小时，提供宿舍',
    crew_num: 100,
    current_crew_num: 80,
    month_cumulate_revenue: 189000,
    proj_msg_num: 10
  },{
    id: 2,
    proj_thumbnail: 'http://www.foxconn.com.cn/GW-WEB-YT/logo.gif',
    proj_name: '富士康昆山陆家电子厂',
    proj_desc: '15元一小时，提供宿舍，计件结算',
    crew_num: 300,
    current_crew_num: 180,
    month_cumulate_revenue: 481000,
    proj_msg_num: 6
  }],
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_PROJECT_LIST](state, obj) {
    state.proj_list = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
