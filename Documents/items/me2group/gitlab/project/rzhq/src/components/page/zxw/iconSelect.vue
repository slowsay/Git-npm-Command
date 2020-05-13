<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>标签类目选择项</el-breadcrumb-item>
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
                <el-table-column prop="categoryId" width="70" label="编号"></el-table-column>
                <el-table-column prop="categoryNames" label="类目" align="center"></el-table-column>
                <el-table-column label="操作" width="200px" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="add">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="createHandle">+ 新增类目
                </el-button>

            </div>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :total="pagecount">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="subject" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="类目">
                    <el-input v-model="form.categoryName"></el-input>
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
    export default {
        name: 'basetable',
        data: function () {
            return {
                subject: "编辑类目",
                url: './static/vuetable.json',
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    categoryName: '',
                    categoryId: '',
                },
                idx: -1
            }
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
                var _this = this;
                API.request({
                    url: API.categoryList,
                    method: 'post',
                    headers: {token: this.userinfo.token, userId: this.userinfo.id},
                    data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.tableData = _this.exchangeData(e.data.data.list);
                        }
                    }
                }).catch(function (e) {
                    API.dialog({message: JSON.stringify(e)});
                })
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.init();
            },
            handleEdit: function (row) {
                this.subject = "编辑类目";
                this.form = row;
                this.editVisible = true;
            },
            //删除操作
            handleDelete: function (row) {
                this.delVisible = true;
                this.form = row;
            },
            delAll: function () {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            createHandle: function () {
                this.form = {
                    categoryName: '',
                    categoryId: '',
                };
                this.subject = "新增类目";
                this.editVisible = true
            },
            // 保存编辑
            saveEdit: function () {
                this.$set(this.tableData, this.idx, this.form);
                var _this = this, _categoryName = this.form.categoryName;
                if (this.subject == "新增类目") {
                    if (_categoryName.length < 1) {
                        API.dialog({message: API.msg.ERROR_CATEGORYNAME});
                    }
                    else {
                        API.request({
                            url: API.addCategory,
                            method: 'post',
                            headers: {token: this.userinfo.token, userId: this.userinfo.id},
                            data: API.qs.stringify({categoryName: _categoryName})
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.form.categoryName = "";
                                    _this.editVisible = false
                                    _this.$message.success('新增成功');
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
                else {
                    if (_categoryName.length < 1) {
                        _this.$message.error(API.msg.ERROR_CATEGORYNAME);
                    }
                    else {
                        API.request({
                            url: API.updateCategory,
                            method: 'post',
                            headers: {token: this.userinfo.token, userId: this.userinfo.id},
                            data: API.qs.stringify({categoryName: _categoryName, categoryId: this.form.categoryId})
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.editVisible = false
                                    _this.$message.success('编辑成功');
                                    _this.init();
                                }
                                else {
                                    _this.$message.error(JSON.stringify(e.data.msg));
                                }
                            } else {
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
                API.request({
                    url: API.deleteCategory,
                    method: 'post',
                    headers: {token: this.userinfo.token, userId: this.userinfo.id},
                    data: API.qs.stringify({categoryIds: this.form.categoryId})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.delVisible = false;
                            _this.$message.success('删除成功');
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
                    arr[i].categoryNames = arr[i].categoryName;
                }
                return arr
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
