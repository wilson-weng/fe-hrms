import * as actions from '../actions/apply';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  apply_list: [],
  apply_table_display: '',
  apply_query_count: 0,
  recruit_page: {
    qrcode_url: 'http://img.atobo.com/ProductImg/EWM/UWeb/3/2/6/7/034/3267034/1.gif',
    name: '华东陆家园区招募',
    content: '',
    share_img_url: ''
  }
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_APPLY_LIST](state, obj) {
    state.apply_list = JSON.parse(obj.result);
    state.apply_table_display = obj.display_format;
    state.apply_query_count = obj.count;
  },
  [mutationTypes.DELETE_APPLY](state, index) {
    state.apply_list.splice(index, 1);
  },
};


export default {
  state: initState,
  getters,
  actions,
  mutations,
};
