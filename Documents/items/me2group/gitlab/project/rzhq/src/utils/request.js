//请求插件
import Fly from 'flyio/dist/npm/wx'
import store from '@/store'
// import Toast from '../../static/vant/toast/toast';

import {baseUrl} from './api'


const request = new Fly()

request.interceptors.request.use((request) => {
  request.headers['Content-Type'] = "application/x-www-form-urlencoded";
  request.baseURL = baseUrl;
//console.log(request)
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

request.interceptors.response.use(
  (response, promise) => {
    // console.log(response.data)
    wx.hideLoading()
    if(response.data.Code != 200){
      if(response.data.Msg == ''){
        wx.showToast({
          title: '',
          icon: 'none',
          duration: 1000
        })
      }else{
        wx.showToast({
          title: response.data.Msg,
          icon: 'none',
          duration: 1000
        })
      }
    }
    return promise.resolve(response.data)
    //   return promise.reject(response)
  },
  (err, promise) => {
    wx.hideLoading()
    wx.showToast({
      title: '网络繁忙，请稍后重试！',
      icon: 'none',
      duration: 1000
    })
    return promise.reject(err)
  }
)

export default request
