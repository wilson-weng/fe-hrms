import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';
import axios from 'axios'

export const getWageIoFormat = ({ commit }, projId) => {
  return fetch(`${urls.WAGE_INPUT_FORMAT}?proj_id=${projId}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_WAGE_INPUT, result.content);
      }
      return result;
    });
};



export function createWageRawData({ commit }, params){
  return fetch(`${urls.WAGE_RAW}`,{
    method: 'POST',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
}


export const getWageRecords = ({ commit }, filters) => {
  let options = '{"module":"wage","query":"list_wage_by_wage_time_desc","attrs":["meta_data","wage_time_str","crew_base_info"]}';
  return axios.get(`${urls.DATA_QUERY}?filters=${JSON.stringify(filters)}&options=${options}`)
    .then(response => response.data)
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_WAGE_LIST, result.data);
      }
      return result;
    });
};


export const exportWageRecords = ({ commit }, params) => {
  return fetch(`${urls.WAGE_CRUD}?page=0&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      return result.data;
    });
};
