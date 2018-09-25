import * as actions from '../actions/crew';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {

  crew_list: [],
  current_crew: {},
  crew_input_format: false,
  crew_input_template: false,
  crew_table_display: '',
  crew_query_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_CREW_LIST](state, obj) {
    state.crew_list = JSON.parse(obj.result);
    state.crew_table_display = obj.display_format;
    state.crew_query_count = obj.count;
  },
  [mutationTypes.SET_CREW_INPUT](state, obj) {
    state.crew_input_format = obj.input_format;
    state.crew_input_template = obj.input_template;
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
