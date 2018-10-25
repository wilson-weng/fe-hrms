import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';
import axios from 'axios'

export const getProjs = ({ commit }, filters) => {
  let options = '{"module":"proj","query":"list_proj","attrs":[]}';
  return axios.get(`${urls.DATA_QUERY}?filters=${JSON.stringify(filters)}&options=${options}`)
    .then(response => response.data)
    .then(res => {
      if(res.status == 'ok'){
        commit(mutationTypes.SET_PROJECT_LIST, res.data);
      }
      return res;
    });
}


export function createProj({ commit }, params){
  return axios.post(`${urls.PROJ_CRUD}`, params)
    .then(response => response.data)
}


export function updateProj({ commit }, params){
  return axios.put(`${urls.PROJ_CRUD}/${params.id}`, params)
    .then(response => response.data)
}


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


export const getProjOffers = ({ commit }, filters) => {
  let options = '{"module":"proj","query":"list_proj_offers","attrs":["offer_plugins","start_time_str","offer_type_str"]}';
  return axios.get(`${urls.DATA_QUERY}?filters=${JSON.stringify(filters)}&options=${options}`)
    .then(response => response.data)
    .then(res => {
      if(res.status == 'ok'){
        commit(mutationTypes.SET_PROJECT_OFFERS, res.data);
      }
      return res;
    });
}


export function createOffer({ commit }, params){
  return axios.post(`${urls.PROJ_OFFER}`, params)
    .then(response => response.data)
}

export function updatePlugin({ commit }, params){
  return axios.post(`${urls.PLUGIN}`, params)
    .then(response => response.data)
}


export function updateOffer({ commit }, params){
  return axios.put(`${urls.PROJ_OFFER}/${params.id}`, params)
    .then(response => response.data)
}

export function getOfferPlugins({ commit }, params){
  return axios.get(`${urls.OFFER_PLUGINS}`, params)
    .then(response => response.data)
    .then(res => {
      if(res.status == 'ok'){
        commit(mutationTypes.SET_OFFER_PLUGINS, res.data);
      }
      return res;
    });
}
