import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import axios from 'axios';


export function createFineRecords({ commit }, params){
  return axios.post(`${urls.FINE_CRUD}`, params)
    .then(response => response.data)
}


export const getFineRecords = ({ commit }, filters) => {
  let options = '{"module":"fine","query":"list_fine_by_occur_time_desc","attrs":["meta_data","crew_base_info","occur_time_str"]}';
  return axios.get(`${urls.DATA_QUERY}?filters=${JSON.stringify(filters)}&options=${options}`)
    .then(response => response.data)
    .then(result => {
      if(result.status === 'ok'){
        commit(mutationTypes.SET_FINE_LIST, result.data);
      }
      return result;
    });
};


export const deleteFineRecords = ({ commit }, params) => {
  return axios.delete(`${urls.FINE_CRUD}?fine_id=${params.fine_id}`)
    .then(response => response.data)
    .then(result => {
      if(result.status === 'ok'){
        commit(mutationTypes.DELETE_FINE, params.rowIndex);
      }
      return result;
    });
};
