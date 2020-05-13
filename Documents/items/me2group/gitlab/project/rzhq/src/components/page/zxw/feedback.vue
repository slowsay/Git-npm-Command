<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 反馈管理:</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="doAll">批量处理</el-button>
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <span style="margin-left:40px">状态：</span>
                <el-select v-model="select_type" placeholder="全部" class="handle-select mr10">
                    <el-option key="1" label="未处理" value="未处理"></el-option>
                    <el-option key="2" label="已处理" value="已处理"></el-option>
                </el-select>
                <span style="margin-left:40px">用户ID</span>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="searchHandle">搜索</el-button>
                <el-button type="primary" icon="search" @click="refreshHandle">刷新</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="createTimes" label="日期">
                </el-table-column>
                <el-table-column prop="feedbackUserId" label="反馈用户id" align="center">
                </el-table-column>
                <el-table-column prop="feedbackContents" label="内容">
                </el-table-column>
                <el-table-column prop="regId" label="设备类型">
                </el-table-column>
                <el-table-column prop="appEdition" label="版本号">
                </el-table-column>
                <el-table-column prop="email" label="电子邮箱">
                </el-table-column>
                <el-table-column prop="feedbackStatusf" label="状态">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" v-if="optionflag">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" v-if="scope.row.feedbackStatus==1"
                                   @click="doHandle(scope.row)">处理
                        </el-button>
                        <div v-else>
                            <el-button type="text" icon="el-icon-check"/>
                            处理
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="pagecount">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
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
                url: './static/vuetable.json',
                tableData: [],
                multipleSelection: [],
                select_type: '',
                select_word: '',
                dolist: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
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
                this.optionflag = this.userRole.feedback.options.length > 1 ? true : false;
                this.createflag = this.userRole.feedback.noptions.length > 1 ? true : false;
                API.request({
                    method: "post",
                    url: API.feedbackList,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        page: this.pageindex,
                        num: this.pagesize
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total || 1;
                            _this.tableData = _this.exchangeData(e.data.data.list || []);
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
            doHandle: function (row) {
                var params = {
                    feedbackIds: row.feedbackId
                }, _this = this;
                API.request({
                    method: "post",
                    url: API.handleBatch,
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success(JSON.stringify("处理成功"));
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
            refreshHandle: function () {
                this.select_type = "", this.select_word = "";
                this.pagecount = 1,
                    this.pagesize = 10,
                    this.pageindex = 1;
                this.init();
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.init();
            },
            //搜索
            searchHandle: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
                var params = {
                    feedbackStatus: type,
                    feedbackUserId: condition,
                    page: this.pageindex,
                    num: this.pagesize
                };
//                if (type && condition) {
                API.request({
                    url: API.feedbackListByConditions,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.tableData = _this.exchangeData(e.data.data.list || e.data.data);
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
//                }
//                else {
//                    this.$message.warning("选择项内容不能为空");
//                }
            },
            formatter: function (row, column) {
                return row.address;
            },
            filterTag: function (value, row) {
                return row.tag === value;
            },
            handleEdit: function (index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete: function (index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            //批量处理
            doAll: function () {
                var _this = this;
                for (var i = 0, arr = this.multipleSelection, feedbackIds = []; i < arr.length; i++) {
                    feedbackIds.push(this.multipleSelection[i].feedbackId);
                }
                feedbackIds = feedbackIds.join(',');
                var params = {
                    feedbackIds: feedbackIds
                };
                if (feedbackIds.length < 1) {
                    _this.$message.error("暂没有数据可删除");
                }
                else {
                    API.request({
                        method: "post",
                        url: API.handleBatch,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success(JSON.stringify("批理处理成功"));
                                _this.multipleSelection = [];
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
            //批量删除
            delAll: function () {
                var _this = this;
                for (var i = 0, arr = this.multipleSelection, countryIds = []; i < arr.length; i++) {
                    countryIds.push(this.multipleSelection[i].feedbackId);
                }
                countryIds = countryIds.join(',');
                var params = {
                    feedbackIds: countryIds
                }
                if (this.multipleSelection.length < 1) {
                    this.$message.error("还没有选择");
                } else {
                    API.request({
                        method: "post",
                        url: API.deleteBatch,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("批理删除成功");
                                _this.multipleSelection = [];
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
            //批量选择
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            //数据转换
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].appEdition = arr[i].appEdition || "无";
                    arr[i].feedbackContents = (arr[i].feedbackContent).substr(0, 10);
                    arr[i].feedbackStatusf = arr[i].feedbackStatus == 2 ? "已处理" : "未处理";
                    arr[i].createTimes = publicFn.dateFormat(arr[i].createTime);
                }
                return arr;
            },
            // 保存编辑
            saveEdit: function () {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
            },
            // 确定删除
            deleteRow: function () {
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
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
</style>
