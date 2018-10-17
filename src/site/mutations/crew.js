import * as actions from '../actions/crew';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {

  crew_list: [],
  current_crew: {},
  crew_total_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_CREW_LIST](state, obj) {
    state.crew_list = obj.datas;
    state.crew_total_count = obj.total_count;
  },
  [mutationTypes.DELETE_CREW](state, index) {
    state.crew_list.splice(index, 1);
  },
  [mutationTypes.SET_CUR_CREW](state, obj) {
    state.current_crew = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
