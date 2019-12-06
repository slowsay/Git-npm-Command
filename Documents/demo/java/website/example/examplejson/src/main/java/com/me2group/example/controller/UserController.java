package com.me2group.example.controller;

import com.alibaba.fastjson.JSON;
import com.me2group.example.model.UserModel;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;


@Controller
public class UserController {
    private Map<String, UserModel> usermodel = new HashMap<String, UserModel>();

    public UserController() {
        usermodel.put("jack", new UserModel("jack", "12432", "jack@me2group.com", "管理员"));
    }

    /**
     * 直接转向首页
     *
     * @return
     */
    @RequestMapping({"/index", "/"})
    public String hello() {
        return "index";
    }

    @ResponseBody
    @RequestMapping(value = "/user/list", method = RequestMethod.GET)
    public byte[] list(Model model) {
        //转utf-8输出
        return JSON.toJSONString(usermodel).getBytes(Charset.forName("utf-8"));
    }

}
