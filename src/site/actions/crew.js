import * as mutationTypes from "src/site/constants/mutationTypes";

export const setCurrentCrew = ({ commit }, crew) => {
  commit(mutationTypes.SET_CUR_CREW, crew);
}
