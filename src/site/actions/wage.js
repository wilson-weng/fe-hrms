import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';

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


export const getWageRecords = ({ commit }, params) => {
  return fetch(`${urls.WAGE_CRUD}?page=${params.page}&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_WAGE_LIST, result.content);
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
      return result.content;
    });
};
