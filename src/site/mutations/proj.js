import * as actions from '../actions/proj';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  proj_list: [],
  proj_total_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_PROJECT_LIST](state, obj) {
    state.proj_list = obj.datas;
    state.proj_total_count = obj.total_count;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
