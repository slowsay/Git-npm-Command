<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>商家管理
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
                        <el-option key="1" label="ID" value="1"></el-option>
                        <el-option key="2" label="店铺名称" value="2"></el-option>
                        <el-option key="3" label="联系方式" value="3"></el-option>
                        <el-option key="4" label="电子邮箱" value="4"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-input v-model="select_word" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="searchHandle">搜索
                    </el-button>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="refreshHandle">刷新</el-button>
                </el-col>
                <el-col :span="2" :offset="7">
                    <a class="modeldown" :href="modelurl">模板下载</a>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" style="width:100%" icon="search" @click="importHandle">批量导入</el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button type="primary" style="width:100%" icon="search" @click="extendHandle">批量导出</el-button>
                </el-col>
            </el-row>
            <el-table :data="data" border class="table">

                <el-table-column prop="businessId" width="50" label="ID"></el-table-column>
                <el-table-column prop="shopName" label="店铺名称"></el-table-column>
                <el-table-column prop="shopType" label="店铺类型"></el-table-column>
                <el-table-column prop="phone" label="联系方式"></el-table-column>
                <el-table-column prop="email" label="电子邮件"></el-table-column>
                <el-table-column label="操作" v-if="optionflag" width="180" align="center">
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
            <el-row style="margin-top:20px">
                <el-col :span="1">
                    <el-button type="primary" icon="search" v-if="createflag" @click="createHandle">新增店铺</el-button>
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
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 导入文件 -->
        <el-dialog title="文件导入" :visible.sync="exportVisible" width="400px" center>
            <el-upload
                class="upload-demo"
                list-type="text"
                name="excelFile"
                :action="aliupload"
                :on-success="onsuccessHandle"
                :on-exceed="handleExceed"
                :headers="headerobj"
                :limit='1'
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImportHandle">确 定</el-button>
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
                modelurl: '',
                fileList: [],
                optionflag: false,
                createflag: false,
                headerobj: '',
                userinfo: '',
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                select_type: "1",
                select_word: "",
                data: [],
                exportVisible: false,
                delVisible: false
            };
        },
        //初始化数据
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
        activated: function () {
            this.init();
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.id};
                this.optionflag = this.userRole.merchant.options.length > 1 ? true : false;
                this.createflag = this.userRole.merchant.noptions.length > 1 ? true : false;
                this.aliupload = API.importExcel;

                //商家列表
                this.businessList();
                //获取模板
                this.importModel();
            },
            //商家列表
            businessList: function () {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.businessList,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        num: this.pagesize,
                        page: this.pageindex
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.data = e.data.data.list;
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
            //获取模板
            importModel: function () {
                var _this = this;
                API.request({
                    url: API.importModel,
                    method: 'post',
                    headers: this.headerobj,
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.modelurl = e.data.data;
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
            handleExceed: function (files, fileList) {
                this.$message.warning('请先删除文件，再上传文件');
            },
            onsuccessHandle: function (file) {
                var _this = this;
                if (file.code == 200) {
                    if (file.success) {
                        _this.fileList.push({name: '', url: ''});
                    }
                }
                else {
                    _this.$message.error(file.msg);
                }
            },
            //确定导入
            confirmImportHandle: function () {
                var _this = this;
                if (this.fileList.length > 0) {
                    this.exportVisible = false;
                    _this.fileList = [];
                    _this.$message.success("导入成功");
                    _this.init();
                }
                else {
                    _this.$message.error("请上传文件");
                }
            },
            //导入
            importHandle: function () {
                this.fileList = [];
                this.exportVisible = true;
            },
            //批量导出
            extendHandle: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
//                if (type && condition) {
                API.request({
                    method: "get",
                    url: API.ExportExcel,
                    headers: this.headerobj,
//                        responseType: 'blob',
                    params: {
                        type: type || '',
                        condition: condition || '',
                    }
                }).then(function (e) {
                    location.href = e.request.responseURL;
//                        var blob = new Blob([e.data], {type: "application/vnd.ms-excel"});
//                        var filename="test.xlsx";
//                        var a = document.createElement('a');
//                        //生成文件
//                        var url = URL.createObjectURL(blob);
//                        url.download=f
//                        location.href = url;
//                        URL.revokeObjectURL(url);

                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
//                }
//                else {
//                    this.$message.warning("选择项内容以方便导出数据");
//                }
            },
            //搜索
            searchHandle: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
                var params = {
                    type: type,
                    condition: condition,
                    page: this.pageindex,
                    num: this.pagesize
                };
                if (type && condition) {
                    API.request({
                        url: API.businessListByConditions,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.pagecount = e.data.total;
                                _this.data = e.data.data;
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
                    this.$message.warning("选择项内容不能为空");
                }
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.init();
            },
            search: function () {
            },
            createHandle: function () {
                this.$router.push({path: '/MerchantDetails', query: {status: 0}});
            },
            //编辑
            handleEdit: function (index, row) {
                this.$router.push({path: '/MerchantDetails', query: {status: 1, id: row.businessId}})
            },
            handleDelete: function (index, row) {
                this.idx = row.businessId;
                this.delVisible = true;
            },
            // 确定删除
            deleteRow: function () {
                var _this = this;
                var params = {
                    businessId: this.idx
                }
                API.request({
                    url: API.deleteBusiness,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
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

    .modeldown {
        color: #000;
        text-decoration: underline
    }

    .table {
        width: 100%;
        font-size: 14px;
    }
</style>
