import * as CONSTANTS from '../constants/urls';
/**
 * 将参数对象转化为post参数.
 * @param  {[Object]} params [参数]
 * @return {[String]}        [post参数]
 */
export const getFormHeader = () => {
  let header = {};
  header["content-type"] = "application/x-www-form-urlencoded";
  return header;
};

export const getJsonHeader = () => {
  let header = {};
  header["content-type"] = "application/json";
  return header;
};
/**
 * 将参数对象转化为post参数.
 * @param  {[Object]} params [参数]
 * @return {[String]}        [post参数]
 */
export const getPostParams = params => {
  let result = "";
  for(let key in params){
    result = `${result}&${key}=${encodeURIComponent(params[key])}`;
  }
  return result.substr(1);
};
