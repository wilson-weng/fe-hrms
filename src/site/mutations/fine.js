import * as actions from '../actions/fine';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  fine_list: [],
  fine_total_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_FINE_LIST](state, obj) {
    state.fine_list = obj.datas;
    state.fine_total_count = obj.total_count;
  },
  [mutationTypes.DELETE_FINE](state, index) {
    state.fine_list.splice(index, 1);
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
