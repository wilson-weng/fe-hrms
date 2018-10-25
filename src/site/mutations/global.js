import * as actions from '../actions/global';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  current_proj: null,
  current_user: {
    id: 1,
    real_name: '王经理',
    phone: '18898323455'
  },
  org_id: 1,
  page_config: {}
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
  [mutationTypes.SET_PAGE_CONF](state, obj) {
    obj.map(item=>{
      state.page_config[item.gear_id] = item;
    })
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
