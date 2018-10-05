import * as actions from '../actions/proj';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  proj_list: [],
  proj_total_page: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_PROJECT_LIST](state, obj) {
    state.proj_list = obj.result;
    state.proj_total_page = obj.total_page;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
