<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>内容管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>标签管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-row class="handle-box">
                <el-col :span="2">
                    <p>标签名:</p>
                </el-col>
                <el-col :span="4">
                    <el-input v-model="select_word" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="2" :offset="3">
                    <p>所属类目:</p>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="select_type">
                        <el-option
                            v-for="item in categoryData"
                            :key="item.categoryId"
                            :label="item.categoryName"
                            :value="item.categoryId"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="1" :offset="8">
                    <el-button type="primary" icon="search" @click="searchHandle">搜索</el-button>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="refreshHandle">刷新</el-button>
                </el-col>
            </el-row>
            <el-table :data="data"
                      border
                      class="table"
                      ref="multipleTable"
                      @selection-change="handleSelectionChange">
                <el-table-column prop="tagId"  width="70" label="编号"></el-table-column>
                <el-table-column prop="tagName" label="标签名"></el-table-column>
                <el-table-column prop="categoryName" label="所属类目"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row)"
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
            <el-row style="margin-top:20px">
                <el-col :span="1">
                    <el-button type="primary" icon="search" @click="createHandle">新增标签</el-button>
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

        <!-- 编辑弹出框 -->
        <el-dialog :title="title" :visible.sync="editVisible" width="30%">
            <el-row style="margin-bottom:30px;">
                <el-col :span="4" :offset="2">
                    <p style="line-height:32px">标签名:</p>
                </el-col>
                <el-col :span="12">
                    <el-input v-model="tagName" placeholder="请输入内容"></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4" :offset="2">
                    <p style="line-height:32px">所属类目:</p>
                </el-col>
                <el-col :span="12">
                    <el-select v-model="categoryName" @change="categoryHandle" placeholder="请选择">
                        <el-option
                            v-for="item in categoryData"
                            :key="item.value"
                            :label="item.categoryName"
                            :value="item.categoryId"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveHandle">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import API from '../../../api/index';
    export default {
        name: "basetable",
        data: function () {
            return {
                headerobj: {},
                select_type: "",
                select_word: "",
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                data: [],
                editVisible: false,
                tagName: "",
                tagId: "",
                categoryName: "",
                title: "",
                categoryData: [],
                delVisible: false
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.init();
            }
            else {
                this.$route.push('/login');
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                //获取标签列表
                this.getTagList();
                this.getCategoryList();
            },
            refreshHandle: function () {
                this.pagecount = 1,
                    this.pagesize = 10,
                    this.pageindex = 1;
                this.init();
            },
            //获取标签列表
            getTagList: function () {
                var _this = this;
                API.request({
                    url: API.tagList,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = e.data.data.list;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            categoryHandle: function (id) {

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
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.init();
            },
            handleDelete: function (index, row) {
                this.delVisible = true;
                this.tagId = row.tagId;
            },
            //保存
            saveHandle: function () {
                var _this = this, _tagName = this.tagName, _categoryId = this.categoryName, _tagId = this.tagId;
                var _params = {
                    tagName: _tagName,
                    categoryId: _categoryId
                }
                if (_tagName.length < 1) {
                    _this.$message.error(API.msg.ERROR_TAGNAME);
                }
                else if (!_categoryId) {
                    _this.$message.error(API.msg.ERROR_CATEGORE);
                }
                else {
                    if (this.title == "新增") {
                        API.request({
                            url: API.addTag,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(_params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.editVisible = false
                                    _this.$message.success(e.data.data);
                                    _this.init();
                                }
                                else {
                                    _this.$message.error(e.data.msg);
                                }
                            }
                            else {
                                _this.$message.error(e.data.msg);
                            }
                        }).catch(function (e) {
                            _this.$message.error(JSON.stringify(e));
                        })
                    }
                    else {
                        _params.tagId = _tagId;
                        API.request({
                            url: API.updateTag,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(_params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.editVisible = false
                                    _this.$message.success(e.data.data);
                                    _this.init();
                                }
                                else {
                                    _this.$message.error(e.data.msg);
                                }
                            }
                            else {
                                _this.$message.error(e.data.msg);
                            }
                        }).catch(function (e) {
                            _this.$message.error(JSON.stringify(e));
                        })
                    }
                }


            },
            //获取类目列表
            getCategoryList: function () {
                var _this = this;
                API.request({
                    url: API.categoryList,
                    method: 'post',
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.categoryData = e.data.data.list;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            // 确定删除
            deleteRow: function () {
                var _this = this;
                var _params = {tagIds: this.tagId};
                API.request({
                    url: API.deleteTag,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(_params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.delVisible = false;
                            _this.$message.success("删除成功");
                            _this.init();
                        }
                        else {
                            _this.$message.error(e.data.msg);
                        }
                    }
                    else {
                        _this.$message.error(e.data.msg);
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },

            //搜索
            searchHandle: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
                var params = {
                    categoryId: type,
                    tagName: condition,
                    page: this.pageindex,
                    num: this.pagesize
                };
//                if (type && condition) {
                API.request({
                    url: API.tagListByConditions,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = e.data.data.list;
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
//                }
//                else {
//                    this.$message.warning("选择项内容不能为空");
//                }
            },
            //新增
            createHandle: function () {
                this.editVisible = true, this.title = '新增';
                this.tagName = '', this.categoryName = '';

            },
            //编辑
            handleEdit: function (row, title) {
                this.title = '编辑';
                this.tagName = row.tagName;
                this.tagId = row.tagId;
                this.categoryName = row.categoryId;
                this.editVisible = true;
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
