<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>用户管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>ID号:</p>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="Conditions.beginId" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span=".5">
                    <p>&nbsp;—&nbsp;</p>
                </el-col>
                <el-col :span="3">
                    <el-input v-model="Conditions.endId" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2" :offset="2">
                    <p>注册时间段:</p>
                </el-col>
                <el-col :span="4">
                    <div class="block">
                        <el-date-picker
                            v-model="Conditions.registerTime"
                            type="daterange"
                            @change="timeHandle"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        ></el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>账号类型:&nbsp;&nbsp;&nbsp;&nbsp;</p>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="Conditions.accountType" placeholder="账号类型">
                        <el-option key="1" label="手机号" value="手机号"></el-option>
                        <el-option key="2" label="微信" value="微信"></el-option>
                        <!--<el-option key="3" label="微博" value="微博"></el-option>-->
                        <!--<el-option key="4" label="QQ" value="QQ"></el-option>-->
                    </el-select>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button @click="getUserListByConditions()" type="primary" icon="search">筛选</el-button>
                </el-col>
            </el-row>
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>选择项:</p>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="select_type">
                        <el-option key="1" label="ID" :value="1"></el-option>
                        <el-option key="2" label="昵称" :value="2"></el-option>
                        <el-option key="3" label="邮箱" :value="3"></el-option>
                        <el-option key="4" label="手机号" :value="4"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-input v-model="select_word" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button @click="getUserListByIdOrUserNameOrEmailOrPhone()" type="primary" icon="search">搜索
                    </el-button>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="refreshHandle">刷新</el-button>
                </el-col>
            </el-row>
            <el-table :data="data" class="table" ref="multipleTable"  @selection-change="handleSelectionChange">
                <!--<el-table-column type="selection" align="center"></el-table-column>-->
                <el-table-column prop="id" width="70" label="ID" align="center" ></el-table-column>
                <el-table-column label="头像" width="70" align="center">
                    <div slot-scope="scope">
                        <img :src="scope.row.headPic" height="50">
                    </div>
                </el-table-column>
                <el-table-column label="昵称"  align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>昵称: {{ scope.row.userName }}</p>
                            <p>账号类型: {{ scope.row.registWays }}</p>
                            <p>设备类型: {{ scope.row.regId }}</p>
                            <p>版本号: {{ scope.row.appEdition }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="phone"  width="120"  label="手机号码" align="center"></el-table-column>
                <el-table-column prop="birthday" label="生日" width="130" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱"   align="center"></el-table-column>
                <!--<el-table-column prop="language" label="语言" align="center"></el-table-column>-->
                <!--<el-table-column prop="position" label="职位" align="center"></el-table-column>-->
                <!--<el-table-column prop="address" label="地址" align="center"></el-table-column>-->
                <el-table-column prop="createTime" width="120" label="注册时间" align="center"></el-table-column>
                <el-table-column prop="name" label="在线时间" width="120" align="center"></el-table-column>
                <!--<el-table-column prop="regId" label="设备类型" align="center"></el-table-column>-->
                <!--<el-table-column prop="appEdition" label="版本号" align="center"></el-table-column>-->
            </el-table>
            <el-row style='margin-top:20px'>
                <el-col :span="5">

                    <el-button type="primary" icon="search" @click="$router.push('/Notice')" v-if="viewNotice">通知
                    </el-button>
                    <el-button type="primary" icon="search" @click="$router.push('/Noticelist')" v-if="viewNotice">
                        通知列表
                    </el-button>
                </el-col>
                <el-col :span="5" :offset="13">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="pagecount"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    export default {
        name: "basetable",
        data: function () {
            return {
                headerobj: '',
                userinfo: "",
                userRole: {},
                viewNotice: false,
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                Conditions: {
                    beginId: "", // 开始ID
                    endId: "",  // 结束ID
                    registerTime: "",  // 注册时间段
                    accountType: "" // 账户类型
                },
                id_0: "",
                id_1: "",
                value1: "",
                select_0: "手机号",
                select_type: "",   // 精准搜索tyoe
                select_word: "",  // 精准类型值
                data: [],    //userList 表格数据
                pageData: {
                    page: 0,
                    total: 0
                }  // 页面信息
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.userRole = JSON.parse(JSON.parse(localStorage.getItem("userRole")));
                this.init();
            }
            else {
                this.$router.push({path: '/login'});
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                this.viewNotice = this.userRole.user.noptions.length > 0 ? true : false;
                //获取用户列表
                this.getUserList();
            },
            refreshHandle: function () {
                this.Conditions = {
                    beginId: "", // 开始ID
                    endId: "",  // 结束ID
                    registerTime: "",  // 注册时间段
                    accountType: "" // 账户类型
                };
                this.select_type = "", this.select_word = "";
                this.pagecount = 1,
                    this.pagesize = 10,
                    this.pageindex = 1;
                this.init();
            }
            ,
            handleSelectionChange: function (val) {
            }
            ,
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.getUserList();
            }
            ,
            search: function () {
            }
            ,
            /**
             * 获取用户列表请求方法
             */
            getUserList: function () {
                var _this = this;
                API.request({
                    url: API.userList,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        page: this.pageindex,
                        num: this.pagesize
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total||0;
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
            }
            ,
            /**
             * 搜索
             */
            getUserListByIdOrUserNameOrEmailOrPhone: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
                if (type && condition) {
                    var params = {
                        type: type,
                        condition: condition,
                        page: this.pageindex,
                        num: this.pagesize
                    };
                    API.request({
                        url: API.userByIdOrUserNameOrEmailOrPhone,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.pagecount = e.data.total||0;
                                _this.data = _this.exchangeData(e.data.data);
                                _this.select_type = "", _this.select_word = "";
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
                } else {
                    this.$message.warning("选择项内容不能为空");
                }
            }
            ,
            timeHandle: function (v) {
//                console.log(v);
            }
            ,
            /**
             * 筛选
             */
            getUserListByConditions: function (page, pageSize) {
                let _this = this;
                let { beginId, endId, registerTime, accountType } = this.Conditions;
                let registerBeginTime = registerTime[0];
                let registerEndTime = registerTime[1];
                if (beginId > endId) {
                    this.$message.warning("ID开始值必须小于结束值");
                    return false;
                }
//                if ((beginId && endId ) || (registerBeginTime && registerEndTime)) {
                var params = {
                    beginId: beginId,
                    endId: endId,
                    registerBeginTime: registerBeginTime ? publicFn.dateFormat(registerBeginTime.getTime()) : "",
                    registerEndTime: registerEndTime ? publicFn.dateFormat(registerEndTime.getTime()) : "",
                    accountType: accountType
                };
                API.request({
                    url: API.userListByConditions,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total || 0;
                            _this.data = _this.exchangeData(e.data.data.list||[]);
                            _this.Conditions = {
                                beginId: "", // 开始ID
                                endId: "",  // 结束ID
                                registerTime: "",  // 注册时间段
                                accountType: "" // 账户类型
                            };
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
//                } else {
//                    _this.$message.error("请输入相关筛选内容");
//                }
            }
            ,
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].createTime = publicFn.dateYMD(arr[i].createTime);
                    arr[i].updateTime = publicFn.dateYMD(arr[i].updateTime);
                    arr[i].headPic = arr[i].headPic || "";
                    arr[i].genders = arr[i].gender == 1 ? "男" : "女";
                }
                return arr;
            }
        }
    }
    ;
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
