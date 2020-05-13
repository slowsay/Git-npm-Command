<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 系统设置
                </el-breadcrumb-item>
                <el-breadcrumb-item>潜点管理</el-breadcrumb-item>
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
                <el-table-column prop="diveId" label="ID"></el-table-column>
                <el-table-column prop="diveName" label="潜点名称"></el-table-column>
                <el-table-column prop="destinationName" label="所属地"></el-table-column>
                <el-table-column prop="countryName" label="国家"></el-table-column>
                <el-table-column prop="continentName" label="洲"></el-table-column>
                <el-table-column label="操作" width="200px" align="center" v-if="optionflag">
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
                    v-if="createflag"
                >+ 新增潜点
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
        <el-dialog :title="dialogTitle" :visible.sync="editVisible" width="600px">
            <el-form ref="form" :model="form" label-width="90px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="潜点所在地">
                    <el-select v-model="form.continetName" placeholder="洲" @change="continetHandle">
                        <el-option
                            v-for="item in regionData"
                            :key="item.continentId"
                            :label="item.continentName"
                            :value="item.continentId"
                        ></el-option>
                    </el-select>
                    <el-select v-model="form.countryName" placeholder="国家" @change="countryHandle">
                        <el-option
                            v-for="item in countryData"
                            :key="item.countryId"
                            :label="item.countryName"
                            :value="item.countryId"
                        ></el-option>
                    </el-select>

                    <el-select v-model="form.destinationName" placeholder="目的地" @change="destinatHandle">
                        <el-option
                            v-for="item in destinatData"
                            :key="item.destinationId"
                            :label="item.destinationName"
                            :value="item.destinationId"
                        ></el-option>
                    </el-select>

                    <el-select v-model="form.divingName" placeholder="潜点" @change="divingHandle">
                        <el-option
                            v-for="item in divingData"
                            :key="item.diveId"
                            :label="item.diveName"
                            :value="item.diveId"
                        ></el-option>
                    </el-select>
                    <el-tag
                        :key="tag"
                        v-for="tag in dynamicTags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >{{tag}}
                    </el-tag>
                    <!--<el-input-->
                    <!--class="input-new-tag"-->
                    <!--v-if="inputVisible"-->
                    <!--v-model="inputValue"-->
                    <!--ref="saveTagInput"-->
                    <!--size="small"-->
                    <!--@keyup.enter.native="handleInputConfirm"-->
                    <!--@blur="handleInputConfirm"-->
                    <!--&gt;</el-input>-->
                    <!--<el-button v-else class="button-new-tag" size="small" @click="showInput">+ 子潜点</el-button>-->
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
                //权限
                userRole: {},
                optionflag: false,
                createflag: false,
                headerobj: '',
                dialogTitle: '',
                dynamicTags: [],
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                inputVisible: false,
                inputValue: "",
                url: "./static/vuetable.json",
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: "",
                select_word: "",
                delist: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: "",
                    continetName: "",
                    countryName: "",
                    destinationName: "",
                    divingName: "",
                    value: "",
                },
                regionData: [],
                countryData: [],
                destinatData: [],
                divingData: [],
                idx: -1,
                value: [],
                countryArrData: [],
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.userRole = JSON.parse(JSON.parse(localStorage.getItem("userRole")));
                this.init();
            }
            else {
                this.$route.push('/');
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.userId};
                this.optionflag = this.userRole.system.options.length > 1 ? true : false;
                this.createflag = this.userRole.system.noptions.length > 1 ? true : false;
                //潜点列表
                this.selectAllDiveSit();
                //获取国家
                this.getCountryData();
                //调用洲接口
                this.getContinent();
            },
            returnCountry: function (id) {
                for (var i = 0, arr = this.countryArrData; i < arr.length; i++) {
                    if (arr[i].countryId == id) {
                        return arr[i].countryName;
                        break;
                    }
                }
            },
            returnContinent: function (id) {
                for (var i = 0, arr = this.regionData; i < arr.length; i++) {
                    if (arr[i].continentId == id) {
                        return arr[i].continentName;
                        break;
                    }
                }
            },
            //列表
            selectAllDiveSit: function () {
                var _this = this;
                API.request({
                    url: API.selectAllDiveSit,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({page: this.pageindex, num: this.pagesize})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.tableData = _this.exchangeData(e.data.data);
                        }
                    }
                }).catch(function (e) {
                    API.dialog({message: JSON.stringify(e)});
                })
            },
            //获取所有国家
            getCountryData: function () {
                var _this = this;
                API.request({
                    url: API.selectAllCountry,
                    method: 'post',
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.countryArrData = e.data.data;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //新增潜点
            createHandle: function () {
                this.form = {
                    name: "",
                    continetName: "",
                    countryName: "",
                    destinationName: "",
                    divingName: ""
                };
                this.editVisible = true;
                this.dialogTitle = "新增"
            },
            //编辑选择地址
            handleChange: function (value) {
//                console.log(value);
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.selectAllDiveSit();
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
            //保存
            saveEdit: function () {
                var _this = this, _destinationName = this.form.destinationName, _countryName = this.form.countryName, _continetName = this.form.continetName,
                    _divingName = this.form.divingName,
                    _diveName = this.form.name, _params = {};
//                    _dynamicTags = this.dynamicTags;
                if (_diveName.length < 1) {
                    _this.$message.error("请输入名称")
                }
                else if (_continetName.length < 1) {
                    _this.$message.error("请输入洲")
                }
                else if (_countryName.length < 1) {
                    _this.$message.error("请输入国家")
                }
                else if (_destinationName.length < 1) {
                    _this.$message.error("请输入目的地")

                }
//                else if (_divingName.length < 1) {
//                    _this.$message.error("请输入潜点")
//                }
                else {
                    if (this.dialogTitle == "新增") {
                        _params = {
                            diveName: _diveName,
                            continentId: _continetName,
                            countryId: _countryName,
                            destinationId: _destinationName,
                            diveParentId: _divingName
                        }
                        API.request({
                            url: API.addDiveSit,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(_params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.$message.success("添加成功")
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
                    } else {
                        var _continentId = this.form.continentId, _countryId = this.form.countryId, _diveParentId = this.form.diveParentId, _destinationId = this.form.destinationId;
                        if (!_continentId) {
                            _this.$message.error("请选择洲");
                        }
                        else if (!_destinationId) {
                            _this.$message.error("请选择目的地");
                        }
                        else if (!_countryId) {
                            _this.$message.error("请选择国家");
                        }
                        else {
                            _params = {
                                diveId: this.form.diveId,
                                diveName: _diveName,
                                continentId: typeof _continetName == 'string' ? _continentId : _continetName,
                                countryId: typeof _countryName == 'string' ? _countryId : _countryName,
                                destinationId: typeof _destinationName == 'string' ? _destinationId : _destinationName,
                                diveParentId: typeof _divingName == 'string' ? _diveParentId : _divingName
                            }
                            API.request({
                                url: API.updateDiveSit,
                                method: 'post',
                                headers: this.headerobj,
                                data: API.qs.stringify(_params)
                            }).then(function (e) {
                                if (e.data.code == 200) {
                                    if (e.data.success) {
                                        _this.$message.success("更新成功");
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
                }
            },
            returnContinentData: function (n) {
                for (var i = 0, arr = this.regionData; i < arr.length; i++) {
                    if (arr[i].continentName == n) {
                        return arr[i].continentId;
                        break;
                    }
                }
            },
            returnCounryData: function (n) {
                for (var i = 0, arr = this.countryData; i < arr.length; i++) {
                    if (arr[i].countryName == n) {
                        return arr[i].countryId;
                        break;
                    }
                }
            },
            returnDestinationData: function (n) {
                for (var i = 0, arr = this.data; i < arr.length; i++) {
                    if (arr[i].destinationName == n) {
                        return arr[i].destinationId;
                        break;
                    }
                }
            },
            //编辑
            handleEdit: function (index, row) {
                this.dialogTitle = "编辑";
                //潜点id
                this.countryData = [{countryId: row.countryId, countryName: row.countryName}];
                this.destinatData = [{destinationId: row.destinationId, destinationName: row.destinationName}];
                this.form = {
                    diveId: row.diveId,
                    continentId: row.continentId || '',
                    continetName: row.continentName || '',
                    countryId: row.countryId || '',
                    countryName: row.countryId || '',
                    destinationId: row.destinationId || '',
                    destinationName: row.destinationId || '',
                    name: row.diveName,
                    divingName: row.fname,
                    diveParentId: row.diveParentId
                };
                this.editVisible = true;
            },
            //admin端根据国家id查询目的地列表
            getDestinationData: function (id) {
                var _this = this;
                API.request({
                    url: API.selectByCountryId,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        countryId: id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.data = _this.exchangeData(e.data.data);
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //目的地列表
            getDestination: function () {
                var _this = this;
                //admin端查询所有的目的地
                API.request({
                    url: API.selectAllDestination,
                    method: 'post',
                    headers: this.headerobj,
                    data: {
                        num: this.pagesize,
                        page: this.pageindex
                    }
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.page;
                            _this.data = _this.exchangeData(e.data.data);
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //获取洲列表
            getContinent: function () {
                var _this = this;
                API.request({
                    url: API.selectAllContinent,
                    method: 'post',
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.regionData = e.data.data;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //洲联动国家
            continetHandle: function (id) {
                var _this = this;
                API.request({
                    url: API.selectCountryByCon,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        continetId: id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.countryData = e.data.data;
                            _this.form.countryName = "";
                            _this.form.divingName = "";
                            _this.form.destinationName = "";
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //用id获取国家名
            exchangeCountry: function (id) {
                for (var i = 0, arr = this.countryData; i < arr.length; i++) {
                    if (arr[i].countryId == id) {
                        return arr[i].countryName;
                        break;
                    }
                }
            },
            //国家联动目的地
            countryHandle: function (id) {
                var _this = this;
                //目的地Admin类-admin端根据所属国家模糊查询
                API.request({
                    url: API.selectDestinationByCountry,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        countryName: this.exchangeCountry(id)
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.destinatData = e.data.data;
                            _this.form.destinationName = "";
                            _this.form.divingName = "";
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //目的地联动潜点
            destinatHandle: function (id) {
                var _this = this;
                API.request({
                    url: API.selectDiveSitBydes,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        destinationId: id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.divingData = e.data.data;
                            _this.form.divingName = "";
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //id转潜点
            exchangeDiving: function (id) {
                for (var i = 0, arr = this.divingData; i < arr.length; i++) {
                    if (arr[i].diveId == id) {
                        return arr[i].diveName;
                        break;
                    }
                }
            },
            //潜点获取
            divingHandle: function (id) {

            },
            //删除
            handleDelete: function (index, row) {
                this.delist = row;
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
            //确定删除
            deleteRow: function () {
                var _this = this;
                var params = {
                    diveId: this.delist.diveId
                }
                API.request({
                    url: API.deleteDiveSit,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("删除成功");
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
                this.delVisible = false;
            },
            //子潜点模块
            handleClose: function (tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            },
            showInput: function () {
                this.inputVisible = true;
                this.$nextTick(
                    function (_) {
                        _this.$refs.saveTagInput.$refs.input.focus();
                    }
                )
                ;
            },
            handleInputConfirm: function () {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].createTime = publicFn.dateFormat(arr[i].createTime);
                }
                return arr;
            }
        }
    };
</script>

<style scoped>
    .table {
        min-width: 1000px;;
    }

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

    .el-select {
        margin: 0 10px 20px 0;
    }

    .el-tag + .el-tag {
        margin-right: 10px;
        height: 32px;
        line-height: 32px;
    }

    .button-new-tag {
        margin-right: 10px;
        height: 32px;
        line-height: 32px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-right: 10px;
        vertical-align: bottom;
    }

    .el-tag--small {
        height: 32px;
        line-height: 32px;
        margin-right: 10px;
    }
</style>
