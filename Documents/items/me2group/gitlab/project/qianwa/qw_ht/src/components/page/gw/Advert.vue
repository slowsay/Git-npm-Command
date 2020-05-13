<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <span style="margin:0 20px 0 40px;">广告名称:</span>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <span style="margin:0 20px 0 40px;">广告位置:</span>
                <el-select v-model="select_type" placeholder="请选择" class="handle-select mr10">
                    <el-option v-for="(item,index) in Choice" :key="index" :label=item :value=item></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="searchHandle">搜索</el-button>
                <el-button style="float:right" type="primary" icon="search" @click="refreshHandle">刷新</el-button>
            </div>
            <el-table
                :data="data"
                border
                class="table"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="advertId" width="55" label="ID"></el-table-column>
                <el-table-column prop="advertNum" width="90"  label="编号"></el-table-column>
                <el-table-column prop="advertName" label="广告名称"></el-table-column>
                <el-table-column prop="advertPosition" label="广告位置"></el-table-column>
                <el-table-column label="广告图片"  width="90" >
                    <div slot-scope="scope">
                        <img :src="scope.row.advertImage" height="50">
                    </div>
                </el-table-column>
                <el-table-column prop="endTime" label="到期时间" align="center"></el-table-column>
                <el-table-column prop="advertStatusf" width="70" align="center"  label="状态"></el-table-column>
                <el-table-column prop="clickCount"  width="90" align="center" label="点击次数"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="editHandle(scope.row)" v-if="editflag">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" @click="upHandle(scope.row)" v-if="updownflag">{{scope.row.advertStatus==1?"下架":"上架"}}
                        </el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top:20px">
                <el-col :span="1">
                    <el-button type="primary" icon="search" @click="createHandle" v-if="createflag">新增广告</el-button>
                </el-col>
                <el-col :span="10" :offset="13">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="pagecount"
                    ></el-pagination>
                </el-col>
            </el-row>
        </div>

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
        name: "basetable",
        data: function () {
            return {
                userRole: {},
                //权限
                editflag: false,
                createflag: false,
                updownflag: false,
                headerobj: '',
                deldata: "",
                userinfo: "",
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                multipleSelection: [],
                select_word: "",
                select_type: "",
                delVisible: false,
                data: [],
                Choice: ['首页', '潜点详细页']
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
        activated: function () {
            this.init();
        },
        methods: {
            init: function () {
                var _this = this;
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                this.editflag = this.userRole.advert.options.length > 1 ? true : false;
                this.createflag = this.userRole.advert.noptions.length > 1 ? true : false;
                this.updownflag = this.userRole.advert.nnoptions.length > 1 ? true : false;
                //调用-广告列表接口
                API.request({
                    url: API.adminAdvertList,
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
                            _this.data = _this.exchangeData(e.data.data.list || []);
                        }
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
            //编辑广告
            editHandle: function (row) {
                this.$router.push({path: '/AddAdvert', query: {status: 1, id: row.advertId}})
            },
            //添加广告
            createHandle: function () {
                this.$router.push({path: '/AddAdvert', query: {status: 0}})
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
                    advertPosition: type,
                    advertName: condition,
                    page: this.pageindex,
                    num: this.pagesize
                };
//                if (type && condition) {
                API.request({
                    url: API.selectByConditions,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = e.data.data.list || [];
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
            upHandle: function (row) {
                var _this = this;
                if (row.advertStatus == 2) {
                    //需要上架
                    API.request({
                        url: API.shelvesAdvert,
                        method: 'post',
                        headers: {
                            token: this.userinfo.token,
                            userId: this.userinfo.id
                        },
                        data: API.qs.stringify({
                            advertId: row.advertId
                        })
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success(API.msg.SUCCESS_GETUP);
                                _this.init();
                            }
                        }
                    }).catch(function (e) {
                        _this.$message.error(JSON.stringify(e));
                    })
                }
                else {
                    //需要下架
                    API.request({
                        url: API.unShelvesAdvert,
                        method: 'post',
                        headers: {
                            token: this.userinfo.token,
                            userId: this.userinfo.id
                        },
                        data: API.qs.stringify({
                            advertId: row.advertId
                        })
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success(API.msg.SUCCESS_GETDOWN);
                                _this.init();
                            }
                        }
                    }).catch(function (e) {
                        _this.$message.error(JSON.stringify(e));
                    })
                }
            },
            //删除广告
            handleDelete: function (index, row) {
                this.delVisible = true;
                this.deldata = row;
            },
            // 确定删除
            deleteRow: function () {
                var _this = this;
                //需要下架
                API.request({
                    url: API.deleteBatchAdvert,
                    method: 'post',
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.id
                    },
                    data: API.qs.stringify({
                        adverts: _this.deldata.advertId
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("删除成功");
                            _this.delVisible = false;
                            _this.init();
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })

            },
            //选中
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            delAll: function () {
                if (this.multipleSelection.length < 1) {
                    this.$message.error("还没有选择");
                }
                else {
                    for (var i = 0, arr = this.multipleSelection, ids = []; i < arr.length; i++) {
                        ids.push(this.multipleSelection[i].advertId);
                    }
                    ids = ids.join(',');
                    var _this = this, params = {adverts: ids};
                    API.request({
                        method: "post",
                        url: API.deleteBatchAdvert,
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
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].advertStatusf = arr[i].advertStatus == 1 ? "已上架" : "未上架";
//                    arr[i].endTime = publicFn.dateYMD(arr[i].endTime)
                }
                return arr;
            }
        }
    };
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
        text-align: center;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }
</style>
