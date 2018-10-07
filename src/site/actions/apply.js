import * as urls from "src/site/constants/urls";
import * as Utils from "src/site/utils";
import * as mutationTypes from "src/site/constants/mutationTypes";

export const getApplyRecords = ({ commit }, params) => {
  return fetch(`${urls.APPLY_CRUD}?page=${params.page}&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_APPLY_LIST, result.data);
      }
      return result;
    });
};


export const exportApplyRecords = ({ commit }, params) => {
  return fetch(`${urls.APPLY_CRUD}?page=0&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      return result.data;
    });
};


export const updateApplyRecords = ({ commit }, params) => {
  return fetch(`${urls.APPLY_CRUD}`, {
    method: 'PUT',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
};
