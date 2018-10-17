import * as actions from '../actions/wage';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  wage_list: [],
  wage_total_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_WAGE_LIST](state, obj) {
    state.wage_list = obj.datas;
    state.wage_total_count = obj.total_count;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
