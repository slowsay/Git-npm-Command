<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>通知列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="handle-box">
                <!--<el-col :span="2">-->
                <!--<p>选择项:</p>-->
                <!--</el-col>-->
                <!--<el-col :span="4">-->
                <!--<el-select v-model="select_type">-->
                <!--<el-option key="1" label="ID" :value="1"></el-option>-->
                <!--<el-option key="2" label="消息" :value="2"></el-option>-->
                <!--</el-select>-->
                <!--</el-col>-->
                <!--<el-col :span="4" :offset="1">-->
                <!--<el-input v-model="select_word" placeholder="请输入内容"></el-input>-->
                <!--</el-col>-->
                <!--<el-col :span="1" :offset="1">-->
                <!--<el-button @click="getListByIdOrUserNameOrEmailOrPhone()" type="primary" icon="search">搜索-->
                <!--</el-button>-->
                <!--</el-col>-->
                <el-col :span="2" :offset="2">
                    <!--<el-button type="primary" icon="search" @click="$router.push('/User')">返回用户列表</el-button>-->
                </el-col>
            </el-row>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <!--<el-table-column type="selection" align="center"></el-table-column>-->
                <el-table-column prop="noticeId" width="55" label="ID"></el-table-column>
                <el-table-column prop="noticeTitle" label="标题"></el-table-column>
                <el-table-column prop="admUserName" width="150" label="发送者" align="center"></el-table-column>
                <el-table-column label="状态" width="100" align="center">
                    <template slot-scope="scope">
                        <p>{{ scope.row.noticeStatus==1?"全部用户":scope.row.noticeStatus==2?"全部商家":"指定用户"}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" width="270" label="创建时间" align="center"></el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-view"
                                   @click="viewhandle(scope.row)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style='margin-top:20px'>
                <el-col :span="5">
                    <el-button type="primary" icon="search" @click="$router.push('/User')">返回用户列表</el-button>
                </el-col>
                <el-col :span="5" :offset="10">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="pagecount"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="通知内容" :visible.sync="conVisible">
            <el-row style="margin-bottom:20px;">
                <el-col :span="5" :offset="1" style="line-height:32px">用户ID&nbsp;:</el-col>
                <el-col :span="8" :offset="1">{{form.userId}}</el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="5" :offset="1" style="line-height:32px">标题&nbsp;:</el-col>
                <el-col :span="8" :offset="1">{{form.noticeTitle}}</el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="5" :offset="1" style="line-height:32px">发送者&nbsp;:</el-col>
                <el-col :span="8" :offset="1">{{form.admUserName}}</el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="5" :offset="1" style="line-height:32px">创建时间&nbsp;:</el-col>
                <el-col :span="8" :offset="1">
                    {{form.createTime}}
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="5" :offset="1" style="line-height:32px">状态&nbsp;:</el-col>
                <el-col :span="8" :offset="1">
                    {{ form.noticeStatus==1?"全部用户":form.noticeStatus==2?"全部商家":"指定用户"}}
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;" class="noticecon">
                <el-col :span="5" :offset="1" style="line-height:32px">内容&nbsp;:</el-col>
                <el-col :span="15" :offset="1" v-html="form.noticeText">
                    {{form.noticeText}}
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <!--<el-col>-->
                <!--<el-button @click="conVisible=false">关闭</el-button>-->
                <!--</el-col>-->
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    export default {
        name: "basetable",
        data: function () {
            return {
                conVisible: false,
                headerobj: '',
                userinfo: "",
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                id_0: "",
                id_1: "",
                value1: "",
                select_0: "手机号",
                select_type: "",   // 精准搜索tyoe
                select_word: "",  // 精准类型值
                data: [],    //userList 表格数据
                form: {
                    noticeTitle: '',
                    createTime: "",
                    noticeStatus: '',
                },
                pageData: {
                    page: 0,
                    total: 0
                }  // 页面信息
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.init();
            }
            else {
                this.$router.push({path: '/login'});
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                this.getList();
            },
            refreshHandle: function () {
                this.select_type = "", this.select_word = "";
                this.pagecount = 1,
                    this.pagesize = 10,
                    this.pageindex = 1;
                this.init();
            },
            handleSelectionChange: function (val) {
            },
            //查看-通知内容
            viewhandle: function (row) {
                this.conVisible = true;
                this.form = row;
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.getList();
            },
            search: function () {
            },
            /**
             * 获取用户列表请求方法
             */
            getList: function () {
                var _this = this;
                API.request({
                    url: API.noticeList,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        page: this.pageindex,
                        num: this.pagesize
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = _this.exchangeData(e.data.data.list);
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
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].createTime = publicFn.dateFormat(arr[i].createTime);
                }
                return arr;
            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }
</style>
