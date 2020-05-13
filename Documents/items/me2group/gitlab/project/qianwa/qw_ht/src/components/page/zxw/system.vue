<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button> -->
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="account" label="使用者账号">
                </el-table-column>
                <el-table-column prop="userName" label="账户姓名">
                </el-table-column>
                <el-table-column prop="loginTime" label="上次登录时间">
                </el-table-column>
                <el-table-column prop="roleName" label="所属等级">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column label="操作" width="250px" align="center" v-if="optionflag">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-setting" @click="stopHandle(scope.row)">
                            {{scope.row.status=='启用'?'停用':'启用'}}
                        </el-button>
                        <el-button type="text" icon="el-icon-view" @click="viewHandle(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="add">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="addHandle" v-if="createflag">
                    新增用户
                </el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="$router.push('/power')" v-if="optionflag">等级管理
                </el-button>
            </div>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="pagecount">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="name" :visible.sync="editVisible" width="40%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="账户名称">
                    <el-input v-model="form.userName" :disabled="viewflag"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.account" :disabled="viewflag"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" :disabled="viewflag"></el-input>
                </el-form-item>
                <el-form-item label="所属等级">
                    <!--<el-input v-model="form.roleName"></el-input>-->
                    <el-select v-model="form.roleName" placeholder="请选择" :disabled="viewflag">
                        <el-option v-for="item in roleNameData"
                                   :key="item"
                                   :label="item"
                                   :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="状态" :disabled="viewflag">
                        <el-option key="启用" label="启用" value="启用"></el-option>
                        <el-option key="终止" label="终止" value="终止"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" :disabled="viewflag">取 消</el-button>
                <el-button type="primary" @click="saveEdit" :disabled="viewflag">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    export default {
        name: 'basetable',
        data: function () {
            return {
                //权限
                userRole: {},
                optionflag: false,
                createflag: false,
                headerobj: '',
                //总页数
                pagecount: 1,
                //每页显示数
                pagesize: 10,
                //当前索引页码
                pageindex: 1,
                roleNameData: ['普通管理员', '系统管理员', '超级管理员'],
                url: './static/vuetable.json',
                viewflag: !1,
                name: "",
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                delist: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    userName: '',
                    account: '',
                    password: '',
                    status: '',
                    roleName: ''
                },
                data: [],
                idx: -1
            }
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.userRole = JSON.parse(JSON.parse(localStorage.getItem("userRole")));
                this.init();
            }
            else {
                this.$router.push({path: '/'});
            }
        },
        methods: {
            init: function () {
                var _this = this;
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                this.optionflag = this.userRole.system.options.length > 1 ? true : false;
                this.createflag = this.userRole.system.noptions.length > 1 ? true : false;
                API.request({
                    method: "post",
                    url: API.admUserList,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        page: this.pageindex,
                        num: this.pagesize
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.tableData = e.data.data;
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
            //点击添加时
            addHandle: function () {
                this.viewflag = !1;
                this.name = "新增";
                this.form = {
                    userName: '',
                    account: '',
                    password: '',
                    status: '',
                    roleName: ''
                }
                this.editVisible = true;
            },
            //停用
            stopHandle: function (row) {
                var _this = this, params = {id: row.id, status: row.status == "启用" ? "停用" : "启用"};
                API.request({
                    method: "post",
                    url: API.updateAdmUserStatus,
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("设置成功");
                            _this.init();
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
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.init();
            },
            search: function () {
                this.is_search = true;
            },
            formatter: function (row, column) {
                return row.address;
            },
            filterTag: function (value, row) {
                return row.tag === value;
            },
            //查看
            viewHandle: function (index, row) {
                this.viewflag = !0;
                this.name = "查看";
                this.form = {
                    userName: row.userName,
                    account: row.account,
                    status: row.status,
                    roleName: row.roleName
                }
                this.editVisible = true;
            },
            //编辑
            handleEdit: function (index, row) {
                this.viewflag = !1;
                this.name = "编辑";
                this.form = {
                    id: row.id,
                    userName: row.userName,
                    account: row.account,
                    status: row.status,
                    roleName: row.roleName
                }
                this.editVisible = true;
            },
            handleDelete: function (index, row) {
                this.delist = row;
                this.delVisible = true;
            },
            delAll: function () {
                if (this.multipleSelection.length < 1) {
                    this.$message.error("还没有选择");
                }
                else {
                    for (var i = 0, arr = this.multipleSelection, ids = []; i < arr.length; i++) {
                        ids.push(this.multipleSelection[i].id);
                    }
                    ids = ids.join(',');
                    var _this = this, params = {id: ids};
                    API.request({
                        method: "post",
                        url: API.deleteById,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("删除成功");
                                _this.init();
                                _this.multipleSelection = [];
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
            //数据转换
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
//                    arr[i].updateTimes = publicFn.dateFormat(arr[i].updateTime);
                }
                return arr;
            },
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit: function () {
                var _this = this, _account = this.form.account, _userName = this.form.userName,
                    _grade = this.form.roleName, _password = this.form.password, _status = this.form.status;
                var params = {
                    account: _account,
                    userName: _userName,
                    password: _password,
                    grade: _grade,
                    status: _status
                }
                if (this.name == "编辑") {
                    params.id = this.form.id;
                    API.request({
                        method: "post",
                        url: API.updateAdmUser,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("编辑成功");
                                _this.editVisible = false;
                                _this.init();
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
                else {
                    API.request({
                        method: "post",
                        url: API.addAdmUser,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("新增成功");
                                _this.editVisible = false;
                                _this.init();
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
            //单条数据删除
            deleteRow: function () {
                var _this = this, params = {id: this.delist.id};
                API.request({
                    method: "post",
                    url: API.deleteById,
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("删除成功");
                            _this.delVisible = false;
                            _this.init();
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
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .add {
        margin-top: 20px;
        float: left;
    }
</style>
