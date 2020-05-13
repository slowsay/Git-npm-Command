import Vue from "vue";
import axios from "axios";
import qs from "qs";
import { Message, Loading } from "element-ui";

//创建axios实例
var service = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "content-type": "application/json"
  }
});
export default {
  //get请求
  get(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: "get",
        url,
        params: param
      })
        .then(res => {
          //axios返回的是一个promise对象
          var res_code = res.status.toString();
          if (res_code.charAt(0) == 2) {
            cback(res); //cback在promise执行器内部
          } else {
            console.log(res, "异常1");
          }
        })
        .catch(err => {
          if (!err.response) {
            console.log("请求错误");
            Message({
              showClose: true,
              message: "请求错误",
              type: "error"
            });
          } else {
            reject(err.response);
            console.log(err.response, "异常2");
          }
        });
    });
  },
  // Post请求
  post(url, params) {
    return new Promise((cback, reject) => {
      // let data = qs.parse(params);
      service({
        method: "post",
        url,
        params
      })
        .then(res => {
          //axios返回的是一个promise对象
          var res_code = res.status.toString();
          if (res_code.charAt(0) == 2) {
            cback(res); //cback在promise执行器内部
          } else {
            console.log(res, "异常1");
          }
        })
        .catch(err => {
          console.log(err);
          if (!err.response) {
            Message({
              showClose: true,
              message: "请求错误",
              type: "error"
            }); //Message是element库的组件，可以去掉
          } else {
            reject(err.response);
            console.log(err.response, "异常2");
            Message({
              showClose: true,
              message: "请求错误:" + err.response.status,
              type: "error"
            });
          }
        });
    });
  }
};
