/**
 * Created by Feil.Wang(wangfeilong@xuexibao.cn) on 2016/04/14.
 */

require(['jquery', 'common', 'config', 'service'], function ($, Common, Config, Service) {
    var $form = $('#formLogin'),
        $inputAccount = $('#inputAccount'),
        $inputPassword = $('#inputPassword'),
        $alert = $('#alert'),
        $submitBtn = $('#btnLoginSubmit'),
        $savePwdCkbox = $('#savePwd');
    if (localStorage.inputAccount && localStorage.inputPassword) {
        $inputAccount.val(localStorage.inputAccount);
        $inputPassword.val($.base64('decode', localStorage.inputPassword));
        $savePwdCkbox.prop('checked', true);
    }
    $submitBtn.on('click', function (e) {
        e.preventDefault();
        var formData = $form.serialize(),
            phoneNumber = $.trim($inputAccount.val()),
            password = $inputPassword.val();
        if (!phoneNumber.length || !Common.isPhone(phoneNumber)) {
            Common.tips.show($alert, 'warning', '请输入正确的邮箱！');
            return;
        }
        if (!password.length) {
            Common.tips.show($alert, 'warning', '请输入密码！');
            return;
        }
        Service.login(formData, function (err, res) {
            if (err) {
                Common.tips.show($alert, 'warning', err.msg);
            } else {
                Common.setCookie('onlineroom.userName', phoneNumber, 'd30');
                Common.setCookie('onlineroom.nickName', res.data.nickname, 'd30');
                Common.setCookie('onlineroom.userId', res.data.id, 'd30');

                //记住帐号密码
                if ($savePwdCkbox.prop('checked')) {
                    localStorage.inputAccount = phoneNumber;
                    localStorage.inputPassword = $.base64('encode', password);
                } else {
                    localStorage.clear();
                }
                //登录成功
                Common.tips.show($alert, 'success', '登录成功!',function(){
                    //启动客户端
                    if (window.AlphaGoClient) {
                        Service.getConfig({}, function (err, res) {
                            var windows_room_url = res.windows_room_url;
                            window.AlphaGoClient.OnEnterRoomList(windows_room_url);
                        });
                    } else {
                        window.location.href = '/room';
                    }

                });
            }
        });
    });
    $('#openRegLink').on('click', function () {
           if (window.AlphaGoClient) {
                Service.getConfig( {},function (err, res) {
                    var register_url = res.register_url
                    window.AlphaGoClient.OnRegister(register_url)

                });

            } else {
                window.location.href = '/register';
            }

    });
});
