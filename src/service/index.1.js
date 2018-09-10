import axios from 'axios';
import Vue from 'vue'
import API from './api'
import config from '@/config'
export const httpGet = (url) => {
  const [urlKeys, params] = url.split('?');
  const [key1, key2] = urlKeys.split('/');
  
  axios({
    url: `${API[key1][key2]}?${params}}`,
    method: 'get'
  })
};

export const httpPost = (url, params) => {
  const [key1, key2] = url.split('/');
  return axios({
    url: API[key1][key2],
    method: 'post',
    data: {
      appId: config.APPID,
      ...params
    }
  })
};
/** 
 **上传接口**
 **/
const newAxios = axios.create({
    transformRequest: [(data) => {
        return data;
    }]
});
// export const $httpImgUpoad = (params) => newAxios({
//     url: API.upload.file,
//     method: 'post',
//     data: params
// });
export const httpUpload = (params) => {
  return axios({
    url: API.upload.file,
    method: 'post',
    headers: {
      "Content-Type": "multipart/form-data"
    },
    data: params
  })
};
// axios 全局配置
axios.defaults.baseURL = config.HOST_NAME;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.timeout = 20000;
axios.defaults.transformRequest = [(data) => {
  return JSON.stringify(data);
}];
// 缓存请求链接
let flangData = {}

axios.interceptors.request.use(function(config) {
  // Do something before request is sent 
  // Vue.$vux.loading.show('loading')
  let url = config.url
  if (!config.url.includes(config.baseURL)) {
    //console.log('11111111111111',config.baseURL.substr(0, config.baseURL.length-1) +config.url)
    url = config.baseURL.substr(0, config.baseURL.length-1) +config.url
  }
  //console.log(config)
  //console.log('config.url', url)
  if (flangData[url] && flangData[`${url}data`]) {
   
    if (flangData[`${url}data`] == JSON.stringify(config.data)) {
      // alert(1)
    return
    }
    }
    flangData[`${url}data`] = JSON.stringify(config.data)
    flangData[`${url}`] = url 

  return config;
}, function(error) {
  // Do something with request error 
  return Promise.reject(error);
});



axios.interceptors.response.use((response) => {
  // Vue.$vux.loading.hide()
  //console.log('response.config.url', response.config.url)
   flangData[`${response.config.url}data`] = null
   flangData[`${response.config.url}`] = null

  if (!response || response.status !== 200) return Vue.$vux.alert.show('网络错误');
  let returnCode = response.data.returnCode * 1;
  switch (returnCode) {
    case 1000:
    case 1002: // 请求成功，但列表数据为空
    case 2009:
      return response.data;
    case 1004:
      Vue.$vux.alert.show('服务器繁忙，请喝杯茶休息一会儿');
      break;
    case 2000:
      Vue.$vux.alert.show('号码归属地信息不存在，请检查后重输');
      break;
    default:
      Vue.$vux.alert.show(response.data.message);
      return response.data;
  }

}, (error) => {
  flangData = {}
  const isTimeout = error.toString().indexOf('timeout') > -1;
  // Vue.$vux.loading.hide()
  if (isTimeout) {
    Vue.$vux.alert.show('请求超时');
  }
  return 'timeout'
});