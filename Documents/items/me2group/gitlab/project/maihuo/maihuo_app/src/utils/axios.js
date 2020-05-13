import axios from 'axios'
import {baseUrl} from './api'
const qs = require('qs')
// http request拦截器 添加一个请求拦截器
//axios.interceptors.request.use(function (config) {
//  // Do something before request is sent
////  let token = window.localStorage.getItem("accessToken")
//	let token=1
//  if (token) {
//      config.headers.accessToken = token;    //将token放到请求头发送给服务器
//      return config;
//      //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
//      // config.headers['accessToken'] = Token;
//  }
//}, function (error) {
//  // Do something with request error
//  return Promise.reject(error);
//});
axios.interceptors.request.use((request) => {
request.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  request.baseURL = baseUrl;
	if(localStorage.getItem('Token')==null||localStorage.getItem('userId')==undefined||localStorage.getItem('userId')==''){
   	request.headers['token'] = 0;
  }else{
  	request.headers['token'] = localStorage.getItem('Token');//如果请求参数有Token 设置全局头部Token
  }
	if(localStorage.getItem('userId')==null||localStorage.getItem('userId')==undefined||localStorage.getItem('userId')==''){
		request.headers['userId'] = 0;
  }else{
  	request.headers['userId'] = localStorage.getItem('userId');//如果请求参数有userid 设置全局头部userid
  }
  return request
})
// // 添加一个响应拦截器
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
// });
//判断token失效跳转
axios.interceptors.response.use(response => {
    if (response) {
        switch (response.code) {
            case 2000: //与后台约定登录失效的返回码
                localStorage.removeItem('userId'); //删除用户ID
                localStorage.removeItem('Token'); //删除用户登录验证的token值
                router.replace({
                    path: '/',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
        }
    }
    return response;
},error => {
    return Promise.reject(error.response) //返回接口返回的错误信息
})
const request = {
    post (url, data) {
    //  if (store.state.auth_info) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    //         data.token = `${store.state.auth_info.token}`;
    //     //config.data.token = `${store.state.auth_info.token}`;
    //   }
        return new Promise((resolve, reject) => {
        	const URL = baseUrl + url
            axios.post(URL,qs.stringify(data)).then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
        })
    },
    get (url, data) {
        return new Promise((resolve, reject) => {
        	const URL = baseUrl + url
            axios.get(URL, {params:data}).then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
        })
    }
}
export default request

const instance = axios.create({
  //baseURL: 'http://172.16.0.159/yunjin/public/index.php/index/',  //本地接口地址
  // baseURL: 'http://192.168.2.198:8087',
  timeout: 10000, //响应时间
  headers: {
    'Accept': 'application/json',
    // 'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"
    //  'Content-Type' :'application/json;charset=utf-8'
  }
});
export const http_json = (option, params) => {
  if (typeof option == 'undefined') {
    option = {};
  }
  option.method = option.method || 'post';
  let config = {
    headers: {
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/json',
      'token':localStorage.getItem('Token'),
      "userId":localStorage.getItem('userId')//7-30新增
    }
  }
  return new Promise((resolve, reject) => {
    instance({
      method: option.method,
      url: option.url,
      data: params,
      config
    }).then(response => {
      // Toast.clear();
      // loading.close();
      resolve(response);
    }, err => {
      // loading.close();
      reject(err);
    }).catch((error) => {
      reject(error)
    })
  })
}