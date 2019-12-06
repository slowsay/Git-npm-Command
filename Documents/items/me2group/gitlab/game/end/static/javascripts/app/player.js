/**
 * Created by bisheng on 2016/11/9.
 */

require(['jquery', 'common', 'socketio', 'service', 'bootstrap'], function ($, Common, Socketio, Service, Bootstrap) {

    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $message.find('.time').html(arg.time);
                $message.find('.name').html(arg.name);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    function receiveMessage (data) {
        var $messages, message;

        $messages = $('.messages');
        message_side = 'left';
        message = new Message({
            text: data.msg,
            message_side: message_side,
            time: data.time,
            name: data.userName
        });
        message.draw();
        return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    };

    $('.send_message').click(function() {
        var text = $('.message_input').val();
        if (text.trim() === '') {
            console.info("message can't be empty");
            return;
        }
        console.log('send msg: ' + text);
        socket.emit('SEND_MSG_REQUEST', '{"fuid":"1","msg":"' + text + '"}');
        $('.message_input').val('');
    });

    $(".message_input").keyup(function(event){
        if(event.keyCode == 13){
            $(".send_message").click();
        }
    });


    var eventArrs = ['LOGIN_RESPONSE',
        'GET_ATTENDEE_LIST_RESPONSE',
        'GET_STREAM_LIST_RESPONSE',
        'APPLY_SPEAKER_RESPONSE',
        'SPEAKER_STREAM_NOTIFY',
        'ACCREDIT_SPEAKER_RESPONSE',
        'GET_KEY_FRAMES_RESPONSE',
        'KICKED_OUT_RESPONSE',
        'CHANGE_VOLUME_NOTIFY',
        'SEND_MSG_RESPONSE',
        'USER_LEAVE_RESPONSE',
        'SCREEN_CHANGE_RESPONSE'
    ];

    var socket = Socketio.connect("livedev.abcpen.com:9090");
    socket.on('connect', function (data) {
        console.info('connect: socket connect');
    });
    socket.on('disconnect',function(data){
        console.info('disconnect: socket disconnect')
    });
    socket.on('SEND_MSG_RESPONSE', function (data) {
        data.time = new Date(data.time).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").substr(0, 5);
        receiveMessage(data);
    });

    $.each(eventArrs,function(i,v){
        socket.on(v,function(data){
            console.info(v.toLowerCase()+' : '+JSON.stringify(data));
        })
    });

    var room_id = Common.getQueryString('room_id');
    console.info('room_id:', room_id);
    socket.emit('LOGIN_REQUEST', '{"rid":"' + room_id +'", "uid":"1", "t":"pass", "uname":"jjj", "roleType":1,"device":1, "wbseq":-1}');
});