import * as actions from '../actions/global';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  current_proj: {
  },
  current_user: {
    id: 1,
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
