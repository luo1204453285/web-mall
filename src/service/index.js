import axios from 'axios';
import Vue from 'vue'
import API from './api'
import config from '@/config'
export const httpGet = (url) => {
  const [urlKeys, params] = url.split('?');
  const [key1, key2] = urlKeys.split('/');
  if(!params){
    return axios({
      url: API[key1][key2],
      method: 'get'
    })
  }else{
    return axios({
      url: `${API[key1][key2]}?${params}`,
      method: 'get'
    })
  }
};

// 不控制load层的请求
var instance = axios.create({
  timeout: 20000,
  // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});
instance.defaults.baseURL = config.HOST_NAME;
instance.defaults.headers['Content-Type'] = 'application/json';
instance.defaults.transformRequest = [(data) => {
  return JSON.stringify(data);
}];
instance.interceptors.request.use(function (config) {
  // Do something before request is sent 
  return config;
}, function (error) {
  // Do something with request error  
  return Promise.reject(error);
});
instance.interceptors.response.use((response) => {
  // Vue.$vux.loading.hide()
  if (!response || response.status !== 200) return Vue.$vux.alert.show('网络错误');
  let returnCode = response.data.ResultCode ? response.data.ResultCode * 1 : response.data.returnCode * 1;
  let message = response.data.Message ? response.data.Message : response.data.message;

  if ( returnCode == 1008 || returnCode == 1000 || returnCode == 1002 || returnCode == 2009 || returnCode > 5000){
    return response.data
  }else if(returnCode == 1004){
    return Vue.$vux.alert.show('服务器繁忙，请喝杯茶休息一会儿')
  }else if(returnCode == 2000){
    return Vue.$vux.alert.show('号码归属地信息不存在，请检查后重输')
  }else if(returnCode == 5000){
    return Vue.$vux.alert.show('登陆状态失效')
      try { //webview
        // console.log('返回1-1')
        window.LvUJsBridge.invoke('verificationFailure', { //给客户端提供token失效
          "token": "effect"
        }, function (response) { })
      } catch (error) { //外部浏览器头部是没有返回按钮的
        // alert('js桥返回失败')
      }
  }else{
    Vue.$vux.alert.show(message);
    return response.data;
  }

}, (error) => {
  const isTimeout = error.toString().indexOf('timeout') > -1;
  // Vue.$vux.loading.hide()
  // loadFoo--;
  // if(loadFoo == 0){
  //   Vue.$vux.loading.hide();
  // }
  if (isTimeout) {
    Vue.$vux.alert.show('请求超时');
  }
  return 'timeout'
});

export const httpPostnoLoad = (url, params, apiEnv) => {
  const [key1, key2] = url.split('/');
  if (apiEnv == '.net') {
    var baseURL = isLocal ? 'http://218.17.39.178:7172' : '';
    return instance({
      baseURL: baseURL,
      url: API[key1][key2],
      method: 'post',
      data: {
        ...params
      },
    })
  } else {
    return instance({
      url: API[key1][key2],
      method: 'post',
      data: {
        appId: config.APPID,
        ...params
      }
    })
  }
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
export const  $httpImgUpoad = (params) => {
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
// axios.defaults.baseURL = '';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.timeout = 20000;
// axios.defaults.transformRequest = [(data) => {
//   return JSON.stringify(data);
// }];
Array.prototype.$remove = function (val) { // 移除数组数据的方法
  var index = this.indexOf(val);
  if (index > -1) {
      this.splice(index, 1);
  }
};
let num = 0;
axios.interceptors.request.use(function(config) {
  // Do something before request is sent 
  // Vue.$vux.loading.show('loading')
  num++;
  // ajaxRequest.push( config.baseURL + config.url)
  Vue.$vux.loading.show({
      text: 'Loading'
  })
  return config;
}, function(error) {
  // Do something with request error 
  return Promise.reject(error);
});
axios.interceptors.response.use((response) => {
  num--;
  if (!num) Vue.$vux.loading.hide()
  if (!response || response.status !== 200) return Vue.$vux.alert.show('网络错误');
  if(!response.data.returnCode) return response.data;
  let returnCode = response.data.returnCode * 1;
  switch (returnCode) {
    case 1000:
    case 1002: // 请求成功，但列表数据为空
    case 2009:
      return response.data;
    case 1003:
      return response.data;
      break;
    case 1005:
      return response.data;
      break;
    case 1004:
      Vue.$vux.alert.show('服务器繁忙，请喝杯茶休息一会儿');
      break;
    case 2000:
      Vue.$vux.alert.show('号码归属地信息不存在，请检查后重输');
      break;
    default:
      console.log('response.data.message',response.data.message)
      Vue.$vux.alert.show(response.data.message);
      return response.data;
  }

}, (error) => {
  num--;
  if (!num) Vue.$vux.loading.hide()
  const isTimeout = error.toString().indexOf('timeout') > -1;
  // Vue.$vux.loading.hide()
  if (isTimeout) {
    Vue.$vux.alert.show('请求超时');
  }
  return 'timeout'
});