import * as mutationTypes from '../constants/mutationTypes';

export const setCurrentProj = ({ commit }, currentProj) => {
  commit(mutationTypes.SET_CUR_PROJ, currentProj);
}


export const setPasswordChange = ({ commit }) => {
  return new Promise();
}


