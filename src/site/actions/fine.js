import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';

export const getFineIoFormat = ({ commit }, projId) => {
  return fetch(`${urls.FINE_INPUT_FORMAT}?proj_id=${projId}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_FINE_INPUT, result.content);
      }
      return result;
    });
};



export function createFineRecords({ commit }, params){
  return fetch(`${urls.FINE_CRUD}`,{
    method: 'POST',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
}


export const getFineRecords = ({ commit }, params) => {
  return fetch(`${urls.FINE_CRUD}?page=${params.page}&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_FINE_LIST, result.content);
      }
      return result;
    });
};


export const exportFineRecords = ({ commit }, params) => {
  return fetch(`${urls.FINE_CRUD}?page=0&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      return result.content;
    });
};


export const deleteFineRecords = ({ commit }, params, rowIndex) => {
  return fetch(`${urls.FINE_CRUD}?proj_id=${params.proj_id}&fine_id=${params.fine_id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status === 'ok'){
        commit(mutationTypes.DELETE_FINE, rowIndex);
      }
      return result;
    });
};
