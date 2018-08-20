import * as actions from '../actions/crew';
import * as mutationTypes from '../constants/mutationTypes';

const initState = {
  crew_list: [{
    id: 600001,
    real_name: '张三',
    phone: '18800009988',
    enrolled_time: '2018年7月1日',
    work_days: '10天'

  },{
    id: 600002,
    real_name: '张三',
    phone: '18800009988',
    enrolled_time: '2018年7月1日',
    work_days: '10天'

  },{
    id: 600003,
    real_name: '张三',
    phone: '18800009988',
    enrolled_time: '2018年7月1日',
    work_days: '10天'

  },{
    id: 600004,
    real_name: '张三',
    phone: '18800009988',
    enrolled_time: '2018年7月1日',
    work_days: '10天'

  }],
  crew_selected: {
    id: 1,
    real_name: '张三',
    phone: '18800009988',
    enrolled_time: '2018年7月1日',
    work_days: '10天'

  }
};

const getters = {

};

const mutations = {
  [mutationTypes.SET_CREW_LIST](state, obj) {
    state.crew_list = obj;
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
