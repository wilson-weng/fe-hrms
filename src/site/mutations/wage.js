import * as actions from '../actions/wage';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  wage_list: [],
  wage_input_format: false,
  wage_input_template: false,
  wage_table_display: '',
  wage_query_count: 0,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_WAGE_LIST](state, obj) {
    state.wage_list = JSON.parse(obj.result);
    state.wage_table_display = obj.display_format;
    state.wage_query_count = obj.count;
  },
  [mutationTypes.SET_WAGE_INPUT](state, obj) {
    state.wage_input_format = obj.input_format;
    state.wage_input_template = obj.input_template;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
