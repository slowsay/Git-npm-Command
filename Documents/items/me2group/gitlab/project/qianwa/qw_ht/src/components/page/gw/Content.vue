<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>内容管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>选择项:</p>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="select_type">
                        <el-option key="1" label="编号" value="1"></el-option>
                        <el-option key="2" label="潜点名称" value="2"></el-option>
                        <el-option key="3" label="目的地" value="3"></el-option>
                        <el-option key="6" label="标签" value="6"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-input v-model="select_word" placeholder="请输入内容"></el-input>
                </el-col>
                <!--<el-col :offset="3" :span="2">出行时间:</el-col>-->
                <!--<el-col :span="4" :offset="0">-->
                <!--<el-date-picker v-model="gotime" type="date" placeholder="选择日期"></el-date-picker>-->
                <!--</el-col>-->
                <el-col :span="1" :offset="3">
                    <el-button type="primary" icon="search" @click="searchHandle">搜索</el-button>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="refreshHandle">刷新</el-button>
                </el-col>
            </el-row>
            <el-table :data="data" border class="table">
                <el-table-column prop="contentId" label="ID" width="50"></el-table-column>
                <el-table-column prop="contentNumber" label="编号" width="70"></el-table-column>
                <el-table-column label="文章标题">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.title }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.titles }}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="diveName"  width="100" label="潜点名称"></el-table-column>
                <el-table-column prop="destination" width="100" label="目的地"></el-table-column>
                <el-table-column label="图片" width="100">
                    <div slot-scope="scope">
                        <img :src="scope.row.image" height="50"/>
                    </div>
                </el-table-column>
                <el-table-column prop="brightSpotName" label="亮点"></el-table-column>
                <!--<el-table-column prop="marineOrganism" label="类目名称" width="100"></el-table-column>-->
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="hotSearchs" label="热搜" width="50"></el-table-column>
                <el-table-column label="操作" width="220" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="setHandle(scope.row)"
                                   v-if="scope.row.hotSearch==2">
                            设置热门
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="cancelHandle(scope.row)" v-else>取消热门
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="editHandle(scope.$index,scope.row)">编辑
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
                    <el-button type="primary" icon="search" @click="createHandle">新增内容</el-button>
                </el-col>
                <el-col :span="9" :offset="14">
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
        <el-dialog title="提示" :visible.sync="delVisible" width="300px">
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
                headerobj: '',
                delobj: '',
                userinfo: '',
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                select_type: "1",
                select_word: "",
                gotime: '',
                data: [],
                delVisible: false
                //新增编辑弹窗
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
        activated: function () {
            this.init();
        },
        methods: {
            init: function () {
                var _this = this;
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                //调用-admin端查询所有的潜点详情接口
                API.request({
                    url: API.selectAllDiveContent,
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
                            _this.data = _this.exchangeData(e.data.data);
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //设置热搜
            setHandle: function (row) {
                var _this = this;
                API.request({
                    url: API.setPopular,
                    method: 'post',
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.id
                    },
                    data: API.qs.stringify({
                        contentId: row.contentId
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("设置热搜");
                            _this.init();
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
            //取消热搜
            cancelHandle: function (row) {
                var _this = this;
                API.request({
                    url: API.cancelPopular,
                    method: 'post',
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.id
                    },
                    data: API.qs.stringify({
                        contentId: row.contentId
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("取消热搜");
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
            //编辑内容
            editHandle: function (index, row) {
                this.$router.push({path: '/AddContent', query: {status: 0, id: row.contentId}});
            },
            //新增内容
            createHandle: function () {
                var _this = this;
                API.request({
                    url: API.addDiveContent,
                    method: 'post',
                    headers: this.headerobj,
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$router.push({path: '/AddContent', query: {status: 1, id: e.data.data}})
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
            //搜索
            searchHandle: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
                var params = {};
                if (type && condition) {
                    if (type == 1) {
                        params = {
                            number: condition, page: this.pageindex,
                            num: this.pagesize
                        }
                        this.selectDiveContentByNumber(params)
                    }
                    else if (type == 2) {
                        params = {
                            name: condition, page: this.pageindex,
                            num: this.pagesize
                        }
                        this.selectDiveContentByName(params)
                    }
                    else if (type == 3) {
                        params = {
                            destination: condition, page: this.pageindex,
                            num: this.pagesize
                        }
                        this.selectDiveContentByDes(params)
                    }
                    else if (type == 4) {
                        params = {
                            cost: condition, page: this.pageindex,
                            num: this.pagesize
                        }
                        this.selectDiveContentByCost(params)
                    }
                    else if (type == 5) {
                        params = {
                            travelDay: condition, page: this.pageindex,
                            num: this.pagesize
                        }
                        this.selectDiveContentByDay(params)
                    }
                    else {
                        params = {
                            label: condition, page: this.pageindex,
                            num: this.pagesize
                        }
                        this.selectDiveContentByBright(params)
                    }

                } else {
                    this.$message.warning("选择项内容不能为空");
                }
            },
            //admin端根据编号查询潜点详情
            selectDiveContentByNumber: function (params) {
                var _this = this;
                API.request({
                    url: API.selectDiveContentByNumber,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = _this.exchangeData(e.data.data);
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
            //admin端根据潜点名称查询潜点详情
            selectDiveContentByName: function (params) {
                var _this = this;
                API.request({
                    url: API.selectDiveContentByName,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data =_this.exchangeData(e.data.data);
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
            //admin端根据目的地查询潜点详情
            selectDiveContentByDes: function (params) {
                var _this = this;
                API.request({
                    url: API.selectDiveContentByDes,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = _this.exchangeData(e.data.data);
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
            //admin端根据费用查询潜点详情
            selectDiveContentByCost: function (params) {
                var _this = this;
                API.request({
                    url: API.selectDiveContentByCost,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = _this.exchangeData(e.data.data);
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
            //admin端根据出行天数查询潜点详情
            selectDiveContentByDay: function (params) {
                var _this = this;
                API.request({
                    url: API.selectDiveContentByDay,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = _this.exchangeData(e.data.data);
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
            //admin端根据标签查询潜点详情
            selectDiveContentByBright: function (params) {
                var _this = this;
                API.request({
                    url: API.selectDiveContentByBright,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = _this.exchangeData(e.data.data);
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
                this.init()
            },
            search: function () {
            },

            handleDelete: function (index, row) {
                this.delVisible = true;
                this.delobj = row;
            },
            // 确定删除
            deleteRow: function () {
                var _this = this;
                API.request({
                    url: API.deleteDiveContent,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        contentId: this.delobj.contentId
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.delVisible = false;
                            _this.$message.success("删除成功");
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
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].travelDay = arr[i].travelDay || 0;
                    arr[i].hotSearchs = arr[i].hotSearch == 2 ? "否" : "是";
                    arr[i].titles=(arr[i].title||'').substr(0,10);
                    arr[i].cost = arr[i].cost || 0;
                    arr[i].travelTimes = publicFn.dateYMD(arr[i].travelTime);
                    arr[i].updateTime = publicFn.dateFormat(arr[i].updateTime)
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

    .handle-box .el-col {
        line-height: 32px;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .upload-demo > > > .el-upload--text {
        text-align: left;
        border: none;
        width: 100%;
        height: 100%;
    }
</style>
