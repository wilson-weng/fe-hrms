import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';


export const getProjs = ({ commit }, params) => {
  return fetch(`${urls.PROJ_CRUD}?page=${params.page}&company_id=${params.company_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_PROJECT_LIST, result.content);
      }
      return result;
    });
};

export const getProjContent = ({ commit }, proj_id) => {
  return fetch(`${urls.PROJ_CONTENT}?proj_id=${proj_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json());
};

export const createRichText = ({ commit }, params) => {
  return fetch(`${urls.PROJ_RICHTEXT}`, {
    method: 'POST',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json());
};

export const deleteRichText = ({ commit }, id) => {
  return fetch(`${urls.PROJ_RICHTEXT}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams({id: id})
  })
    .then(response => response.json());
};

export const updateProjBasicInfo = ({ commit }, params) => {
  return fetch(`${urls.PROJ_CRUD}`, {
    method: 'PUT',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
    .then(response => {
      commit(mutationTypes.SET_CUR_PROJ, response.content)
    });
};

export const deletProjPic = ({ commit }, id) => {
  return fetch(`${urls.PROJ_PIC}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams({id: id})
  })
    .then(response => response.json());
};
