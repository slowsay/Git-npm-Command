/**
 * Created by Feil.Wang(wangfeilong@xuexibao.cn) on 2015/7/21.
 */
var require = {
    baseUrl: 'javascripts/',
    paths: {
        jquery: 'lib/jquery-2.2.0.min',
        bootstrap: 'lib/bootstrap.min',
        vue: 'lib/vue.min',
        dialog: 'lib/dialog-plus-min',
        cookie: 'lib/jquery.cookie.min',
        wdatepicker: 'lib/My97DatePicker/WdatePicker',
        socketio: 'lib/socket.io',
        config: 'app/config',
        common: 'app/common',
        service: 'app/service'
    },
    urlArgs: 'v=' + VERSION,
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        dialog: {
            deps: ['jquery'],
            exports: 'dialog'
        },
        wdatepicker: {
            exports: 'WdatePicker'
        }
    }
};
