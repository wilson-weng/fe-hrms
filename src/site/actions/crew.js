import * as mutationTypes from '../constants/mutationTypes';
import * as urls from '../constants/urls';
import * as Utils from '../utils';
import axios from "axios";

export const setCurrentCrew = ({ commit }, crew) => {
  commit(mutationTypes.SET_CUR_CREW, crew);
};


export function createCrewRecords({ commit }, params){
  return fetch(`${urls.CREW_CRUD}`,{
    method: 'POST',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
}


export const getCrewRecords = ({ commit }, filters) => {
  let options = '{"module":"crew","query":"list_crew_by_create_time_desc","attrs":["create_time_str","crew_level_info","meta_data","source_str","work_status_str"]}'
  return axios.get(`${urls.DATA_QUERY}?filters=${JSON.stringify(filters)}&options=${options}`)
    .then(response => response.data)
    .then(result => {
      if(result.status == 'ok'){
        commit(mutationTypes.SET_CREW_LIST, result.data);
      }
      return result;
    });
};

export const getCrewById = ({ commit }, filters) => {
  let options = '{"module":"crew","query":"get_crew_by_id","attrs":["create_time_str","crew_level_info","meta_data","source_str","work_status_str"]}'
  return axios.get(`${urls.DATA_QUERY}?filters=${JSON.stringify(filters)}&options=${options}`)
    .then(response => response.data)
};


export const exportCrewRecords = ({ commit }, params) => {
  return fetch(`${urls.CREW_CRUD}?page=0&proj_id=${params.proj_id}&filters=${params.filters}`, {
    method: 'GET',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
    .then(result => {
      return result.data;
    });
};


export const deleteCrewRecords = ({ commit }, params) => {
  return fetch(`${urls.CREW_CRUD}?proj_id=${params.proj_id}&crew_id=${params.crew_id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: Utils.getFormHeader(),
  })
    .then(response => response.json())
};


export const updateCrewRecords = ({ commit }, params) => {
  return fetch(`${urls.CREW_CRUD}`, {
    method: 'PUT',
    credentials: 'include',
    headers: Utils.getFormHeader(),
    body: Utils.getPostParams(params)
  })
    .then(response => response.json())
    .then(result => {
      if(result.status === 'ok'){
        commit(mutationTypes.SET_CUR_CREW, result.content);
      }
      return result;
    });
};
