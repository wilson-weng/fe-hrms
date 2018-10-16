import * as mutationTypes from '../constants/mutationTypes';
import * as urls from "src/site/constants/urls";
import * as Utils from "src/site/utils";
import axios from 'axios'

export const setCurrentProj = ({ commit }, currentProj) => {
  commit(mutationTypes.SET_CUR_PROJ, currentProj);
}


export const setPasswordChange = ({ commit }) => {
  return new Promise();
}



export const getPageConfigure = ({ commit }, params) => {
  return axios.get(`${urls.FE_CONFIGURE}?page_url=${params.page_url}`)
    .then(response => response.data)
    .then(res=>{
      commit(mutationTypes.SET_PAGE_CONF, res.data)
    });
};

export const updatePageConfigure = ({ commit }, params) => {
  return axios.post(`${urls.FE_CONFIGURE}`, params)
    .then(response => response.data)
};
