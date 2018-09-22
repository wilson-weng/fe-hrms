import * as actions from '../actions/fine';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  fine_list: [],
  fine_input_format: false,
  fine_input_template: false,
  fine_table_display: '',
  fine_query_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_FINE_LIST](state, obj) {
    state.fine_list = JSON.parse(obj.result);
    state.fine_table_display = obj.display_format;
    state.fine_query_count = obj.count;
  },
  [mutationTypes.SET_FINE_INPUT](state, obj) {
    state.fine_input_format = obj.input_format;
    state.fine_input_template = obj.input_template;
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
