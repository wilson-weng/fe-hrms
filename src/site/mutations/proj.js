import * as actions from '../actions/proj';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  proj_list: [],
  proj_total_count: 0,
  offer_list: [],
  offer_total_count: 0,
  offer_plugin_list: [],
  offer_plugin_map: null,
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_PROJECT_LIST](state, obj) {
    state.proj_list = obj.datas;
    state.proj_total_count = obj.total_count;
  },
  [mutationTypes.SET_PROJECT_OFFERS](state, obj) {
    state.offer_list = obj.datas;
    state.offer_total_count = obj.total_count;
  },
  [mutationTypes.SET_OFFER_PLUGINS](state, obj) {
    state.offer_plugin_list = Object.values(obj);
    state.offer_plugin_map = obj;
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
