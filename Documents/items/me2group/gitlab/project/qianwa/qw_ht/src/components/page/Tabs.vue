<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger" @click="clearbox">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import API from '../../api/index';
    import {publicFn} from '../../utils/util';
    export default {
        name: 'tabs',
        data: function () {
            return {
                headerobj: '',
                //总页数
                pagecount: 1,
                //每页显示数
                pagesize: 10,
                //当前索引页码
                pageindex: 1,
                message: 'first',
                showHeader: false,
                unread: [
//                    {
//                    date: '2018-04-19 20:00:00',
//                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
//                }, {
//                    date: '2018-04-19 21:00:00',
//                    title: '今晚12点整发大红包，先到先得',
//                }
                ],
                read: [
//                    {
//                    date: '2018-04-19 20:00:00',
//                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
//                }
                ],
                recycle: [
//                    {
//                    date: '2018-04-19 20:00:00',
//                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
//                }
                ]
            }
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.init();
            }
            else {
                this.$router.push({path: '/'});
            }
        },
        activated: function () {
            this.init();
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                this.readData();
                this.unreadData();
                this.recycleListData();
            },
            //恢复
            handleRestore: function (index) {

            },
            //删除全部
            handleDel: function (index) {

            },
            //清空回收站
            clearbox: function () {
                var _this = this;
                for (var i = 0, arr = recycle, clearids = []; i < arr.length; i++) {
                    clearids.push(arr[i].id);
                }
                clearids = clearids.join(',');
                API.request({
                    method: "post",
                    url: API.udeleteBatch,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        noticeIds: clearids
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.unread = e.data.data.noticeVos;
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
            },
            //查找未读消息
            unreadData: function () {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.unReadList,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        userId: this.userinfo.id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.unread = e.data.data.noticeVos;
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
            },
            //查找已读消息
            readData: function () {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.alReadList,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        userId: this.userinfo.id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.read = e.data.data.noticeVos;
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
            },
            //查找回收站消息
            recycleListData: function () {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.recycleList,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        userId: this.userinfo.id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.recycle = e.data.data.noticeVos;
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
            },
            handleRead: function (index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel: function (index) {
                const item = this.read.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore: function (index) {
                const item = this.recycle.splice(index, 1);
                this.read = item.concat(this.read);
            }
        },
        computed: {
            unreadNum: function () {
                return this.unread.length;
            }
        }
    }

</script>

<style>
    .message-title {
        cursor: pointer;
    }

    .handle-row {
        margin-top: 30px;
    }
</style>

