/**
 * Created by Feil.Wang(wangfeilong@xuexibao.cn) on 2016/04/14.
 */

require(['jquery', 'common', 'vue', 'service', 'dialog', 'wdatepicker'], function ($, Common, Vue, Service, Dialog, WdatePicker) {
    var pageItems = 20;
    var Page = {
        init: function () {
            this.getMyRoomList(1);
            this.getOtherRoomList(this.searchWord, 1);
            this.bindEvent();
        },
        searchWord: '',
        getMyRoomList: function (pageNo) {
            Service.getRoomList({
                pageNo: pageNo
            }, function (err, res) {
                if (err) {
                    Common.toast(err.msg)
                } else {
                    var pageCount = Math.ceil(res.data.count / pageItems);
                    vm.$set('myRoomList', res.data.list);
                    vm.$set('myPageCount', pageCount);
                }
            })
        },
        getOtherRoomList: function (name, pageNo, cb) {
            Service.getRoomListOther({
                name: name,
                pageNo: pageNo
            }, function (err, res) {
                if (err) {
                    Common.toast(err.msg)
                } else {
                    var pageCount = Math.ceil(res.data.count / pageItems);
                    vm.$set('otherRoomList', res.data.list);
                    vm.$set('otherPageCount', pageCount);
                    if (typeof cb == 'function')cb(res);
                }
            })
        },
        switchTabs: function () {
            var $tab = $(this),
                idx = $tab.index(),
                $content = $('.course-container'),
                $pagination = $('ul.pagination');
            $tab.addClass('active').siblings().removeClass('active');
            $content.eq(idx).fadeIn().siblings().hide();
            $pagination.eq(idx).fadeIn().siblings().hide();
            if (idx == 1) {
                $('#searchBtn').fadeIn();
                $('#refreshGetOtherRoomList').fadeIn();

            } else {
                $('#searchBtn').hide();
                $('#refreshGetOtherRoomList').hide();
            }

        },
        enterRoom: function (room, e, type) {
            //客户端启动参数
            var $checkbox = $(e.target).siblings('label').children('input[type="checkbox"]');
            var isOpenVideo = $checkbox.filter(':checked').val() ? "1" : "0";


          if (window.AlphaGoClient) {
                var runParams = Common.getClientRunParams(room.room_id, room.name, room.nickname, type,function(err,data){
                    console.info("runParams:",data)
                    window.AlphaGoClient.OnEnterRoom(data, isOpenVideo);
                });
         }

        },
        operateRoom: function (type, room) {
            var that = this;
            var data = {};
            switch (type) {
                case 1:
                    //创建课程
                    data.title = '创建课程';
                    data.okValue = '创建';
                    data.roomName = '';
                    data.begin_time = '';
                    data.httpFn = function (name, begin_time) {
                        Service.createRoom({
                            name: name,
                            begin_time: begin_time || ''
                        }, function (err, res) {
                            if (err) {
                                Common.toast(err.msg,function(){

                                });
                            } else {
                                Common.toast('课程创建成功!', function () {
                                    d.close().remove();
                                    that.getMyRoomList();
                                });
                            }
                        });
                    };
                    break;
                case 2:
                    //修改课程
                    data.title = '修改课程';
                    data.okValue = '修改';
                    data.roomName = room.name;
                    data.begin_time = room.begin_time || '';
                    data.httpFn = function (name, begin_time) {
                        Service.updateRoom({
                            id: room.id,
                            name: name,
                            begin_time: begin_time || ''
                        }, function (err, res) {
                            if (err) {
                                Common.toast(err.msg);
                            } else {
                                Common.toast('课程修改成功!', function () {
                                    d.close().remove();
                                    that.getMyRoomList();
                                });
                            }
                        });
                    };
                    break;
                default:
                    break;
            }
            var d = Dialog({
                title: data.title,
                content: '\
                <div class="create-container">\
                    <div class="form-horizontal">\
                        <div class="form-group">\
                            <label class="control-label col-sm-3">课程名称</label>\
                            <div class="col-sm-8"><input id="roomNameInput" type="text" class="form-control" name="name" placeholder="不超过30个字符（必填）" value="' + data.roomName + '" autofocus></div>\
                        </div>\
                        <div class="form-group">\
                            <label class="control-label col-sm-3">开始时间</label>\
                            <div class="col-sm-8"><input id="begin_time" type="text" class="form-control Wdate" name="name" onfocus="WdatePicker({dateFmt: \'yyyy-MM-dd HH:mm:ss\'});" placeholder="选择开始时间（选填）" value="' + data.begin_time + '"></div>\
                        </div>\
                    </div>\
                </div>',
                okValue: data.okValue,
                ok: function () {
                    var $name = $('#roomNameInput'),
                        name = $.trim($name.val()),
                        $begin_time = $('#begin_time'),
                        begin_time = $begin_time.val();
                    if (name.length == 0) {
                        Common.toast('请输入课程名称!', function () {
                            $name.focus();
                        });
                        return false;
                    }
                    if (name.length > 30) {
                        Common.toast('课程名称不超过30个字符!', function () {
                            $name.focus();
                        });
                        return false;
                    }
                    data.httpFn(name, begin_time);
                    return false;
                },
                cancel: function () {
                }
            }).showModal();
        },
        deleteRoom: function (room) {
            var d = Dialog({
                title: '提示',
                id: 'deleteRoomDialog',
                width: '250px',
                content: '确定要删除『' + room.name + '』吗?',
                okValue: '删除',
                ok: function () {
                    Service.deleteRoom({
                        id: room.id
                    }, function (err, res) {
                        if (err) {
                            Common.toast(err.msg)
                        } else {
                            d.close().remove();
                            Page.getMyRoomList();
                            Common.toast('删除成功!');
                        }
                    });
                    return false;
                },
                cancel: function () {
                }
            }).showModal()
        },
        joinRoomBox: function () {

            var nickName =   Common.getCookie('onlineroom.nickName');
            var userId = Common.getCookie('onlineroom.userId');
            var data = {};


            //加入课程
            data.title = '加入课程';
            data.okValue = '加入';
            data.httpFn = function (roomId) {

                Service.getRoomInfo({
                    roomId: roomId
                }, function (err, res) {
                    if (err) {
                        Common.toast(err.msg);
                    } else {
                      var roomName = res.data.name
                        if(!roomName){
                            Common.toast('未找到该课程号！')
                            return
                        }
                        var roomUserId = res.data.creator_id

                        var userId = Common.getCookie('onlineroom.userId');
                        var type = 1;
                        var createName = res.data.creator_name;
                        console.info("createName:",createName)
                        if(roomUserId == userId ){
                            type = 2;
                        }
                            if (window.AlphaGoClient) {
                                var isOpenVideo = "0";

                                var runParams = Common.getClientRunParams(roomId, roomName,createName, type,function(err,data){
                                    window.AlphaGoClient.OnEnterRoom(data, isOpenVideo);
                                });
                            }
                    }
                });
            };


            var d = Dialog({
                title: data.title,
                content: '\
                <div class="create-container">\
                    <div class="form-horizontal">\
                        <div class="form-group">\
                            <label class="control-label col-sm-3">课程号</label>\
                            <div class="col-sm-8"><input id="roomId" type="text" class="form-control" name="roomId" placeholder="不超过30个字符（必填）" value="" autofocus></div>\
                        </div>\
                    </div>\
                </div>',
                okValue: data.okValue,
                ok: function () {
                    var $roomId = $('#roomId'),
                        roomId = $.trim($roomId.val());
                    if (roomId.length == 0) {
                        Common.toast('请输入课程号!', function () {
                            $roomId.focus();
                        });
                        return false;
                    }

                    data.httpFn(roomId);
                    return false;
                },
                cancel: function () {
                }
            }).showModal();

        },
        searchRoom: function () {
            var that = this;
            var $searchBtn = $('#searchBtn');
            if ($searchBtn.data('type')==1) {
                var d = Dialog({
                    title: '搜索课程',
                    content: '\
                <div class="create-container">\
                    <div class="form-horizontal">\
                        <div class="form-group">\
                            <label class="control-label col-sm-3">课程名称</label>\
                            <div class="col-sm-8"><input id="roomNameInput" type="text" class="form-control" name="name" placeholder="支持模糊搜索"></div>\
                        </div>\
                    </div>\
                </div>',
                    okValue: '搜索',
                    ok: function () {
                        var $name = $('#roomNameInput');
                        that.searchWord = $.trim($name.val());
                        Page.getOtherRoomList(that.searchWord, 1, function (res) {
                            vm.resetPagination();
                            if (res.data.count == 0) {
                                Common.toast('未找到匹配课程！')
                            }
                        });
                        if (that.searchWord != '') {
                            $searchBtn.text('所有课程').data('type', 0);

                        } else {
                            console.info("----进入此处")
                   //         that.searchWord = ''
                            $searchBtn.text('搜索课程').data('type', 1);
                        }

                    },
                    cancel: function () {
                    }
                }).showModal();
            }else{
                that.searchWord = '';
                Page.getOtherRoomList(that.searchWord, 1, function () {
                    vm.resetPagination();
                    $searchBtn.text('搜索课程').data('type', 1);
                });
            }
        },
        bindEvent: function () {
            var that = this;
            $('.nav.nav-tabs > li').on('click', that.switchTabs);
            //that.getMyRoomList();
        }
    };

    var Pagination = Vue.extend({
        props: ['count', 'fn'],
        template: '<ul class="pagination" v-cloak>\
            <li v-if="showFirst">\
                <a aria-label="Previous" @click="cur--" title="上一页">\
                    <span aria-hidden="true">&laquo;</span>\
                </a>\
            </li>\
            <li :class="{\'active\':cur==index}" v-for="index in indexs"><a @click="btnClick(index)">{{index}}</a></li>\
            <li v-if="showLast">\
                <a aria-label="Next" @click="cur++" title="下一页">\
                    <span aria-hidden="true">&raquo;</span>\
                </a>\
            </li>\
        </ul>',
        data: function () {
            return {
                all: this.count,//总页面
                cur: 1//当前页码
            }
        },
        computed: {
            indexs: function () {
                var left = 1;
                var right = this.count;
                var arr = [];
                if (this.count >= 7) {
                    if (this.cur > 5 && this.cur < this.count - 4) {
                        left = this.cur - 3;
                        right = this.cur + 2
                    } else {
                        if (this.cur <= 5) {
                            left = 1;
                            right = 6
                        } else {
                            right = this.count;
                            left = this.count - 5
                        }
                    }
                }
                while (left <= right) {
                    arr.push(left);
                    left++
                }
                return arr;
            },
            showLast: function () {
                if (this.cur == this.count) {
                    return false;
                } else {
                    return true;
                }
            },
            showFirst: function () {
                if (this.cur == 1) {
                    return false;
                } else {
                    return true;
                }
            }
        },
        events: {
            'reset': function () {
                if (this.fn == 'Page.getOtherRoomList') {
                    this.cur = 1;
                }
            }
        },
        methods: {
            btnClick: function (data) {//页码点击事件
                if (data != this.cur) {
                    this.cur = data;
                    if (this.fn == 'Page.getOtherRoomList') {
                        eval(this.fn + '("' + Page.searchWord + '",' + data + ')');
                    } else {
                        eval(this.fn + '(' + data + ')');
                    }
                }
            }
        },
        watch: {
            cur: function (newValue, oldValue) {
                if (this.fn == 'Page.getOtherRoomList') {
                    eval(this.fn + '("' + Page.searchWord + '",' + newValue + ')');
                } else {
                    eval(this.fn + '(' + newValue + ')');
                }

            }
        }
    });

    Vue.component('pagination', Pagination);

    var vm = new Vue({
        el: '#roomListCtrl',
        data: {
            myRoomList: [],
            otherRoomList: [],
            myPageCount: 1,
            otherPageCount: 1
        },
        methods: {
            createRoomBox: function () {
                Page.operateRoom(1);
            },
            enterRoom: function (room, e, type) {
                Page.enterRoom(room, e, type);
            },
            editRoom: function (room) {
                Page.operateRoom(2, room);
            },
            deleteRoom: function (room) {
                Page.deleteRoom(room);
            },
            searchRoomBox: function () {
                Page.searchRoom();
            },
            joinRoomBox:function(type){

                Page.joinRoomBox(type);

            },
            searchOtherRoom:function(){
                Page.getOtherRoomList('', 1);
            },
            resetPagination: function () {
                this.$broadcast('reset')
            }
        },
        ready: function () {
            Page.init();
        }
    });
});