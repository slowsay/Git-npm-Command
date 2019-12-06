/**
 * Created by Feil.Wang(wangfeilong@xuexibao.cn) on 2016/04/14.
 */

require(['jquery', 'common', 'dialog', 'service'], function ($, Common, Dialog, Service) {
    var $form = $('#formRegister'),
        $phoneNumber = Common.getField('phoneNumber'),
        $nickName = Common.getField('nickName'),
        $password = Common.getField('password'),
        $rePassword = Common.getField('rePassword'),
        $vCode = Common.getField('verifyCode'),
        $sendVcodeBtn = $form.find('.btn-vcode');
    var $returnLogin = $('#returnLogin');
    var Page = {
        init: function () {
            this.bindEvent();
        },
        submitForm: function () {
            var phoneNumber = Common.getFieldVal('phoneNumber');
            var nickName = Common.getFieldVal('nickName');
            var password = Common.getFieldVal('password');
            var rePassword = Common.getFieldVal('rePassword');
            var vCode = Common.getFieldVal('verifyCode');
            if (phoneNumber.length == 0 || !Common.isPhone(phoneNumber)) {
                Common.toast('请输入正确的手机号码!', function () {
                    $phoneNumber.focus();
                });
                return;
            }
            if (nickName.length == 0) {
                Common.toast('请输入昵称!', function () {
                    $nickName.focus();
                });
                return;
            }
            if (nickName.length > 30) {
                Common.toast('用户名不能超过20个字符', function () {
                    $nickName.focus();
                });
                return;
            }
            if (password.length == 0) {
                Common.toast('请输入密码!', function () {
                    $password.focus();
                });
                return;
            }
            if (password.length < 6 || password.length > 20) {
                Common.toast('密码长度6~20位!', function () {
                    $password.focus();
                });
                return;
            }
            if (rePassword.length == 0) {
                Common.toast('请再次输入密码!', function () {
                    $rePassword.focus();
                });
                return;
            }
            if (password !== rePassword) {
                Common.toast('两次密码输入不一致!', function () {
                    $rePassword.focus();
                });
                return;
            }
            if (vCode.length !== 4) {
                Common.toast('请输入4位数验证码!', function () {
                    $vCode.focus();
                });
                return;
            }
            Service.register({
                phoneNumber: phoneNumber,
                nickname: nickName,
                password: password,
                verifyCode: vCode
            }, function (err, res) {
                if (err) {
                    Common.toast(err.msg);
                } else {
                    Dialog({
                        title: '提示',
                        width: '200px',
                        content: '恭喜您,注册成功!',
                        ok: function () {
                            $form[0].reset();
                        }
                    }).showModal();

                }
            });
        },
        returnEvent:function(){
            if (window.AlphaGoClient) {
                window.AlphaGoClient.OnReturnLogin();

            }else{
                Service.getConfig({},function(err,data){
                    var server = data.cts_ip
                    window.location.href = "http://"+server+"/login"

                })
            }

        },
        getVcode: function () {
            var time = 120;
            var timer;
            var phoneNumber = Common.getFieldVal('phoneNumber');
            if (phoneNumber.length == 0 || !Common.isPhone(phoneNumber)) {
                Common.toast('请输入正确的手机号码!', function () {
                    $phoneNumber.focus();
                })
            } else {
                $sendVcodeBtn.prop('disabled', true);
                Service.getVCode({
                    phoneNumber: phoneNumber
                }, function (err, res) {
                    if (err) {
                        Common.toast(err.msg);
                        $sendVcodeBtn.prop('disabled', false);
                    } else {
                        Common.toast('验证码已发送,请注意查收!');
                        $sendVcodeBtn.addClass('disabled');
                        timer = setInterval(function () {
                            if (time > 0) {
                                --time;
                                $sendVcodeBtn.text(time + '秒后可再次发送');
                            } else {
                                clearInterval(timer);
                                $sendVcodeBtn.prop('disabled', false).removeClass('disabled');
                                $sendVcodeBtn.text('发送验证码');
                                time = 120;
                            }
                        }, 1000);
                    }
                });
            }
        },
        bindEvent: function () {
            var that = this;
            $form.submit(function (e) {
                e.preventDefault();
                that.submitForm();
            });
            $sendVcodeBtn.on('click', that.getVcode);
            $returnLogin.on('click', that.returnEvent);
        }
    };

    Page.init();
});
