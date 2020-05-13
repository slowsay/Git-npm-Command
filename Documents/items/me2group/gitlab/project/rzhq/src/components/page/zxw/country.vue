<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 系统设置
                </el-breadcrumb-item>
                <el-breadcrumb-item>国家选择项</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
                <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>-->
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="countryId" width="90" label="编号"></el-table-column>
                <el-table-column prop="continentIds" label="洲"></el-table-column>
                <el-table-column prop="countryName" label="国家"></el-table-column>
                <el-table-column prop="updateTimes"  label="更新时间"></el-table-column>

                <el-table-column label="操作" width="200px" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑
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
            <div class="add">
                <el-button
                    type="primary"
                    icon="delete"
                    class="handle-del mr10"
                    @click="createHandle"
                >+ 新增
                </el-button>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="pagecount"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="name" :visible.sync="editVisible" width="20%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="洲">
                    <el-select v-model="form.continentId" placeholder="请选择">
                        <el-option v-for="item in continentData"
                                   :key="item.continentId"
                                   :label="item.continentName"
                                   :value="item.continentId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="国家">
                    <el-input v-model="form.countryName"></el-input>
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
        name: "basetable",
        data: function () {
            return {
                headerobj: '',
                //总页数
                pagecount: 1,
                //每页显示数
                pagesize: 10,
                //当前索引页码
                pageindex: 1,
                url: "./static/vuetable.json",
                name: "",
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: "",
                select_word: "",
                dellist: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                continentData: [],
                form: {
                    countryName: "",
                    continentId: "",
                    countryId: ""
                },
            };
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
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                //admin端查询所有的洲
                this.getContinentData();
            },
            //admin端查询所有的国家
            getCountryData: function () {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.selectAllCountry,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        page: this.pageindex,
                        num: this.pagesize
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.tableData = _this.exchangeData(e.data.data);
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
            //admin端查询所有的洲
            getContinentData: function () {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.selectAllContinent,
                    headers: this.headerobj,
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.continentData = e.data.data;
                            //admin端查询所有的国家
                            _this.getCountryData();
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
            createHandle: function () {
                this.name = "新增";
                this.form = {
                    continentId: "",
                    countryName: "",
                    countryId: ""
                }
                this.editVisible = true
            },
            //编辑
            handleEdit: function (index, row) {
                this.name = "编辑"
                this.form = {
                    continentId: row.continentId,
                    countryName: row.countryName,
                    countryId: row.countryId
                };
                this.editVisible = true;
            },
            //删除弹框
            handleDelete: function (index, row) {
                this.dellist = row;
                this.delVisible = true;
            },
            //批量删除国家
            delAll: function () {
                var _this = this;
                for (var i = 0, arr = this.multipleSelection, countryIds = []; i < arr.length; i++) {
                    countryIds.push(this.multipleSelection[i].countryId);
                }
                countryIds = countryIds.join(',');
                var params = {
                    countryIds: countryIds
                };
                if (this.multipleSelection.length < 1) {
                    this.$message.error("还没有选择");
                } else {
                    API.request({
                        method: "post",
                        url: API.deleteCountry,
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success(JSON.stringify("批理删除成功"));
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
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            //数据转换
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].continentIds = this.exchangeContinent(arr[i].continentId);
                    arr[i].updateTimes = publicFn.dateFormat(arr[i].updateTime);
                }
                return arr;
            },
            exchangeContinent: function (id) {
                for (var i = 0, arr = this.continentData; i < arr.length; i++) {
                    if (arr[i].continentId == id) {
                        return arr[i].continentName;
                        break;
                    }

                }
            },
            // 保存编辑
            saveEdit: function () {
                var _this = this, _countryId = this.form.countryId, _countryName = this.form.countryName, _continentId = this.form.continentId;
                var params = {}
                if (_continentId.length < 1) {
                    _this.$message.error("请输入洲名");
                }
                else if (_countryName.length < 1) {
                    _this.$message.error("请输入国家名");
                }
                else {
                    if (this.name == "编辑") {
                        params = {
                            countryId: _countryId,
                            countryName: _countryName,
                            continentId: _continentId
                        }
                        API.request({
                            method: "post",
                            url: API.updateConutry,
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
                        params = {
                            countryName: _countryName,
                            continentId: _continentId
                        }
                        API.request({
                            method: "post",
                            url: API.addConutry,
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
                }
            },
            // 确定删除
            deleteRow: function () {
                var _this = this;
                var params = {
                    countryId: this.dellist.countryId
                }
                API.request({
                    method: "post",
                    url: API.deleteCountry,
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

    .add {
        margin-top: 20px;
        float: left;
    }
</style>
