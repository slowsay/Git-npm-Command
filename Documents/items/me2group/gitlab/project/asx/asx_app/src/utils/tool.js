import api from './api.js'
import store from '../store'

export default {
    handleJump(url){
        wx.navigateTo({
            url: url
        })
    },
    toast(text){
        // Toast({
        //     message: text,
        //     duration: 500
        // })
        wx.showToast({
            title: text,
            icon: 'none',
            duration: 1000
        })
    },
    getToken() {
        return new Promise((resolve, reject) => {
            this.login(resolve, reject)
        })
    },
    getSet(resolve, reject){
        let _this = this
        wx.getSetting({
            success(res) {
                if(res.authSetting['scope.userInfo']){
                    wx.getUserInfo({
                        success(res){
                            let openid = wx.getStorageSync('openId')
                            let data = {
                              Openid: openid,
                              Nickname: res.userInfo.nickName,
                              Sex: res.userInfo.gender,
                              Headimgurl: res.userInfo.avatarUrl
                            }
                            // store.dispatch('saveUserInfo', res.userInfo)
                            api.register(data, {loading:1}).then(datas => {
                                wx.setStorageSync('userInfo',datas);
                                wx.setStorageSync('token',datas.data.token);
                                wx.setStorageSync('userId',datas.data.id);
                                resolve()
                            })
                        }
                    })
                }
            },
            fail(res) {
                console.log(res)
                reject()
            }
        })
    },
   	login(resolve, reject){
        let _this = this
        wx.login({
            success(res){
                if (res.code) {
                    api.login({Code: res.code}, {loading:1}).then(res => {
                        store.dispatch('saveOpenId', res.openid)
                        console.log(res.openid)
                        wx.setStorageSync('openId', res.openid)
                        _this.getSet(resolve, reject)
                    })
                }
            }
        })
    }
}