<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 系统设置
                </el-breadcrumb-item>
                <el-breadcrumb-item>用户信息分类编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
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
                <el-table-column prop="name" label="编号"></el-table-column>
                <el-table-column prop="name" label="初步名"></el-table-column>
                <el-table-column prop="name" label="选择内容"></el-table-column>

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
                    @click="editVisible = true"
                >+ 新增基线
                </el-button>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="1000"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="一级名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="选择内容">
                    <el-select v-model="form.region" placeholder="请选择">
                        <el-option key="zf" label="字符" value="zf"></el-option>
                        <el-option key="tp" label="图片" value="tp"></el-option>
                    </el-select>
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
    export default {
        name: "basetable",
        data: function () {
            return {
                url: "./static/vuetable.json",
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: "",
                select_word: "",
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: "111",
                    date: "",
                    address: "",
                    region: "",
                    value: ""
                },
                idx: -1
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
                var _this = this;
//                API.request({
//                    method: "post",
//                    url: API.admUserList,
//                    headers: this.headerobj,
//                    data: API.qs.stringify({
//                        page: this.pageindex,
//                        num: this.pagesize
//                    })
//                }).then(function (e) {
//                    if (e.data.code == 200) {
//                        if (e.data.success) {
//                            _this.pagecount = e.data.total;
//                            _this.tableData = e.data.data;
//                        }
//                        else {
//                            _this.$message.error(JSON.stringify(e.data.msg));
//                        }
//                    }
//                    else {
//                        _this.$message.error(JSON.stringify(e.data.msg));
//                    }
//
//                }).catch(function (e) {
//                    _this.$message.error(JSON.stringify(e));
//                })
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
            handleEdit: function (index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                };
                this.editVisible = true;
            },
            handleDelete: function (index, row) {
                this.idx = index;
                this.delVisible = true;
            },
            delAll: function () {
//                const length = this.multipleSelection.length;
//                let str = "";
//                this.del_list = this.del_list.concat(this.multipleSelection);
//                for (let i = 0; i < length; i++) {
//                    str += this.multipleSelection[i].name + " ";
//                }
//                this.$message.error("删除了" + str);
                this.multipleSelection = [];
            },
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit: function () {
//                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
//                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            },
            // 确定删除
            deleteRow: function () {
//                this.tableData.splice(this.idx, 1);
//                this.$message.success("删除成功");
                this.delVisible = false;
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
