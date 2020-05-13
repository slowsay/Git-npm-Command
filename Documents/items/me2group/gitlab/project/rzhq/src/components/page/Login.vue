<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="loginHandle">登录</el-button>
                </div>
                <!--<p class="login-tips">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import API from '../../api/index';
    export default {
        data: function () {
            return {
                userinfo: '',
                headerobj: {token: "asfsafsad", userId: "12434"},
                ruleForm: {
                    token: "asfsafsad",
                    id: "12434",
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.$router.push({path: '/'});
            }
            else {
                this.$router.push('/login');
            }
        },
        methods: {
            submitForm: function (formName) {
//                var _this = this;
//                this.$refs[formName].validate(function (valid) {
//                    if (valid) {
//                        //保存数据到本地
//                        localStorage.setItem("userInfo", JSON.stringify(_this.ruleForm));
//                        localStorage.setItem('ms_username', _this.ruleForm.username);
//                        _this.$router.push('/');
//                    } else {
//                        API.dialog('error submit!!');
//                        return false;
//                    }
//                });
            },
            //登录
            loginHandle: function () {
                var _this = this, _username = this.ruleForm.username, _pwd = this.ruleForm.password;
                if (_username.length < 1) {
                    this.$message.error("请输入用户名");
                }
                else if (_pwd.length < 1) {
                    this.$message.error("请输入密码");
                }
                else {
                    var params = {
                        account: _username,
                        password: _pwd
                    }
                    API.request({
                        method: "post",
                        url: API.adminLogin,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("登录成功");
                                localStorage.setItem("userInfo", JSON.stringify(e.data.data));
                                _this.getRole(e.data.data.roleId);
//                                localStorage.setItem('ms_username', _this.ruleForm.username);

                            }
                            else {
                                _this.$message.error(JSON.stringify(e.data.msg));
                            }
                        }
                        else {
                            _this.$message.error(JSON.stringify(e.data.msg));
                        }

                    }).catch(function (e) {
                        _this.$message.error(JSON.stringify(e));
                    })
                }
            },
            //获取权限
            getRole: function (id) {
                var _this=this;
                API.request({
                    method: "post",
                    url: API.selectRole,
                    headers: this.headerobj,
                    data: API.qs.stringify({roleId: id})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            localStorage.setItem("userRole", JSON.stringify(e.data.data));
                            _this.$router.push({path: '/'});
                        }
                        else {
                            _this.$message.error(JSON.stringify(e.data.msg));
                        }
                    }
                    else {
                        _this.$message.error(JSON.stringify(e.data.msg));
                    }

                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
