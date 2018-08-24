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

// 上传图片
export const uploadImage = imageFile => {
  return fetch(`${CONSTANTS.IMG_UPLOAD_TOKEN}`)
    .then(response => response.json())
    .then(json => {
      if(json.status !== 'ok'){
        Vue.$message.warning(`获取服务器token失败`);
        return Promise.reject({
          flag: false,
        })
      }
      let formData = new FormData();
      formData.append('file', imageFile);
      formData.append('key', json.content.qiniu.key);
      formData.append('token', json.content.qiniu.token);
      return fetch(CONSTANTS.IMG_UPLOAD, {
        method: 'post',
        body: formData
      }).then(response => {
        if(response.status !== 200){
          Vue.$message.warning(`图片上传失败 ${response.statusText}`);
          return Promise.reject({
            flag: false,
          })
        }
        return json.content.qiniu.url;
      });
    })
    .catch(() => {
      return Promise.reject({
        flag: false,
      })
    })
};
