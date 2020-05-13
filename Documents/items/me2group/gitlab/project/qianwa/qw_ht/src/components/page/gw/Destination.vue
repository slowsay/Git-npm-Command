<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i>目的地管理
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
                        <el-option key="2" label="目的地名称" value="2"></el-option>
                        <el-option key="3" label="所属国家" value="3"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" :offset="1">
                    <el-input v-model="select_word" placeholder="请输入内容"></el-input>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="searchHandle">搜索</el-button>
                </el-col>
                <el-col :span="1" :offset="1">
                    <el-button type="primary" icon="search" @click="refreshHandle">刷新</el-button>
                </el-col>

            </el-row>
            <el-table :data="data" border class="table">
                <el-table-column prop="destinationId" width="50" label="ID"></el-table-column>
                <el-table-column prop="destinationNumber" width="100" label="编号"></el-table-column>
                <el-table-column prop="destinationName" label="目的地名称" width="200"></el-table-column>
                <el-table-column label="图片" width="100">
                    <div slot-scope="scope">
                        <img :src="scope.row.destinationImage" height="50"/>
                    </div>
                </el-table-column>
                <el-table-column prop="countryName" label="所属国家" width="120"></el-table-column>
                <el-table-column prop="destinationInfos" label="目的地介绍"></el-table-column>
                <el-table-column prop="isRecommends" label="是否推荐" width="90"></el-table-column>
                <el-table-column label="操作" width="220" align="center" v-if="optionflag">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="introHandle(scope.row,1)"
                                   v-if="scope.row.isRecommend==2">设置推荐
                        </el-button>
                        <el-button type="text" icon="el-icon-edit" @click="introHandle(scope.row,2)" v-else>取消推荐
                        </el-button>
                        <el-button type="text" icon="el-icon-edit"
                                   @click="handleEdit(scope.row.destinationId,scope.row)">编辑
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
                    <el-button type="primary" icon="search" @click="createHandle" v-if="createflag">新增目的地</el-button>
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
        <!-- 确定编辑提示框 -->
        <el-dialog title="提示" :visible.sync="editConfirmFlag" width="300px">
            <div class="del-dialog-cnt">该目的地下有关联数据，如果修改就会删除该目的地下的关联数据.</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editConfirmFlag = false">取 消</el-button>
        <el-button type="primary" @click="editConfirmHandle">确 定</el-button>
      </span>
        </el-dialog>

        <!-- 编辑新增弹窗 -->
        <el-dialog :visible.sync="Visible" width="500px" :show-close="false">
            <p style="text-align:center;font-size:22px;margin-bottom:20px">{{title}}</p>
            <el-row class="handle-box">
                <el-col :span="3" :offset="1">国家:</el-col>
                <el-col :span="8" :offset="1">
                    <el-select v-model="continetname" @change="continetHandle" placeholder="请选择">
                        <el-option
                            v-for="item in continetData"
                            :key="item.continentId"
                            :label="item.continentName"
                            :value="item.continentId"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8" :offset="1">
                    <el-select v-model="countryname" @change="countryHandle" placeholder="请选择">
                        <el-option
                            v-for="item in countryData"
                            :key="item.countryId"
                            :label="item.countryName"
                            :value="item.countryId"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row class="handle-box">
                <el-col :span="3" :offset="1">图片:</el-col>
                <el-col :span="10" :offset="1">
                    <el-upload
                        :action="aliupload"
                        list-type="picture-card"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :on-success="onsuccessHandle"
                        multiple
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button style="width:50%" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row class="handle-box">
                <el-col :span="3" :offset="1">目的地:</el-col>
                <el-col :span="17" :offset="1">
                    <el-input v-model="destinationName" placeholder="请输入内容" maxlength="50"></el-input>
                </el-col>
            </el-row>
            <el-row class="handle-box">
                <el-col :span="3" :offset="1">介绍:</el-col>
                <el-col :span="17" :offset="1">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" maxlength="170"
                              v-model="destinationInfo"></el-input>
                </el-col>
            </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="onHandle">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import API from '../../../api/index';
    export default {
        name: "basetable",
        data: function () {
            return {
                //确定编辑
                editConfirmFlag: false,
                editConfirmData:{},
                //缩略图
                dialogVisible: false,
                dialogImageUrl: '',
                delobj: '',
                aliupload: '',
                flag: !0,
                headerobj: '',
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                userinfo: '',
                select_type: "1",
                select_word: "",
                //数据列表
                data: [],
                editData: {},
                delVisible: false,
                //新增编辑弹窗
                title: '',
                Visible: false,
                fileList: [],
                //国家
                countryData: [],
                //洲
                continetData: [],
                countryArrData: [],
                countryname: '',
                continetname: '',
                //目的地
                destinationName: '',
                //内容
                destinationInfo: '',
                //权限
                userRole: {},
                optionflag: false,
                createflag: false,
            };
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.userRole = JSON.parse(JSON.parse(localStorage.getItem("userRole")));
                this.init();
            }
            else {
                this.$router.push('/login');
            }
        },
        methods: {
            init: function () {
                this.aliupload = API.aliUpload;
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.userId};
                this.optionflag = this.userRole.detination.options.length > 1 ? true : false;
                this.createflag = this.userRole.detination.noptions.length > 1 ? true : false;
                this.getDestination();
                this.getContinent();
            },
            refreshHandle: function () {
                this.select_type = "", this.select_word = "";
                this.pagecount = 1,
                    this.pagesize = 10,
                    this.pageindex = 1;
                this.init();
            },
            searchHandle: function () {
                var _this = this, type = this.select_type, condition = this.select_word;
                var params = {};
                if (type && condition) {
                    if (type == 1) {
                        params = {
                            number: condition,
                            page: this.pageindex,
                            num: this.pagesize
                        }
                        API.request({
                            url: API.selectDestinationByNum,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.pagecount = e.data.total || 1;
                                    _this.data = _this.exchangeData(e.data.data) || [];
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
                    else if (type == 2) {
                        params = {
                            name: condition,
                            page: this.pageindex,
                            num: this.pagesize
                        }
                        API.request({
                            url: API.selectDestinationByName,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.pagecount = e.data.total;
                                    _this.data = _this.exchangeData(e.data.data) || [];
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
                            countryName: condition,
                            page: this.pageindex,
                            num: this.pagesize
                        }
                        API.request({
                            url: API.selectDestinationByCountry,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.pagecount = e.data.total;
                                    _this.data = _this.exchangeData(e.data.data) || [];
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
                    this.$message.warning("选择项内容不能为空");
                }
            },
            //目的地列表
            getDestination: function () {
                var _this = this;
                //admin端查询所有的目的地
                API.request({
                    url: API.selectAllDestination,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        num: this.pagesize,
                        page: this.pageindex
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
                            _this.continetData = e.data.data;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //洲联动国家
            continetHandle: function (id) {
                var _this = this;
                var _params = {
                    continetId: id
                };
                API.request({
                    url: API.selectCountryByCon,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(_params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.countryData = e.data.data;
                            _this.countryname = "";
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            countryHandle: function (id) {
                this.editData.countryId = id;
            },
            //设置推荐
            introHandle: function (row, kind) {
                var _this = this;
                if (kind == 1) {
                    //推荐
                    API.request({
                        url: API.setRecommend,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify({destinationId: row.destinationId, recommend: kind})
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("推荐成功");
                                _this.init();
                            }
                            else {
                                _this.$message.error(e.data.msg)
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
                    //取消推荐
                    API.request({
                        url: API.setRecommend,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify({destinationId: row.destinationId, recommend: kind})
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("取消推荐")
                                _this.init();
                            } else {
                                _this.$message.error(e.data.msg);
                            }
                        } else {
                            _this.$message.error(e.data.msg);
                        }
                    }).catch(function (e) {
                        _this.$message.error(JSON.stringify(e));
                    })
                }

            },
            //目的地更新
            onHandle: function () {
                var _this = this, _destinationName = this.destinationName, _params = {},
                    _countryId = this.editData.countryId,
                    _destinationId = this.editData.destinationId,
                    _destinationNumber = this.editData.destinationNumber,
                    _picurl = this.fileList,
                    _destinationInfo = this.destinationInfo;
                if (_picurl.length < 1) {
                    _this.$message.error(API.msg.ERROR_PICUPLOAD);
                }
                else if (_destinationName.length < 1) {
                    _this.$message.error(API.msg.ERROR_TARGET);
                }
                else if (_destinationInfo.length < 1) {
                    _this.$message.error(API.msg.ERROR_INTRO);
                }
                else {
                    if (this.title == "新增目的地") {
                        _params = {
                            countryId: _countryId,
                            destinationName: _destinationName,
                            destinationImage: _picurl[0].url,
                            destinationInfo: _destinationInfo,
                        };
                        if (this.countryname.length < 1) {
                            _this.$message.error("请选择国家");
                        } else {
                            API.request({
                                url: API.addDestination,
                                method: 'post',
                                headers: this.headerobj,
                                data: API.qs.stringify(_params)
                            }).then(function (e) {
                                if (e.data.code == 200) {
                                    if (e.data.success) {
                                        _this.Visible = false;
                                        _this.$message.success(API.msg.SUCCESS_TARGETCREATE);
                                        _this.getDestination()
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
                    } else {
                        _params = {
                            countryId: _countryId,
                            destinationName: _destinationName,
                            destinationId: _destinationId,
                            destinationNumber: _destinationNumber,
                            destinationImage: _picurl[0].url,
                            destinationInfo: _destinationInfo,
                        };
                        _this.editConfirmData=_params;
                        API.request({
                            url: API.updateDestination,
                            method: 'post',
                            headers: this.headerobj,
                            data: API.qs.stringify(_params)
                        }).then(function (e) {
                            if (e.data.code == 200) {
                                if (e.data.success) {
                                    _this.Visible = false;
                                    _this.$message.success(API.msg.SUCCESS_TARGET);
                                    _this.getDestination();
                                }
                                else {
                                    _this.$message.error(JSON.stringify(e.data.msg));
                                }
                            }
                            else if (e.data.code == 100) {
                                //显示确定弹框
                                _this.Visible = false;
                                _this.editConfirmFlag = true;
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
            editConfirmHandle: function () {
                //删除目的地关联信息并更新目的地信息
                var _this=this;
                var params = {
                    views: _this.editData.views,
                    diveCount: _this.editData.diveCount,
                    countryName: _this.editData.countryName,
                    continentName: _this.editData.continentName,
                    destinationId: _this.editConfirmData.destinationId,
                    countryId: _this.editConfirmData.countryId,
                    destinationName: _this.editConfirmData.destinationName,
                    destinationNumber: _this.editConfirmData.destinationNumber,
                    destinationImage: _this.editConfirmData.destinationImage,
                    destinationInfo: _this.editConfirmData.destinationInfo,
                    isRecommend: _this.editData.isRecommend,
                }
                _this.delupDestination(params);
            },
            //获取洲id
            getContinentValue: function (id) {
                for (var i = 0, arr = this.countryData; i < arr.length; i++) {
                    if (arr[i].countryId == id) {
                        return arr[i].id;
                        break;
                    }
                }
            },
            //获取国家名称
            getCountryValue: function (id) {
                for (var i = 0, arr = this.countryData; i < arr.length; i++) {
                    if (arr[i].countryId == id) {
                        return arr[i].countryName;
                        break;
                    }
                }
            },
            //取目的地名称
            getContinetValue: function (id) {
                for (var i = 0, arr = this.continetData; i < arr.length; i++) {
                    if (arr[i].continentId == id) {
                        return arr[i].continentName;
                        break;
                    }
                }
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.getDestination();
            },
            //搜索
            search: function () {
            },
            //新增目的地
            createHandle: function () {
                this.Visible = true, this.title = '新增目的地';
                this.continetname = "";
                this.fileList = [], this.destinationName = "", this.destinationInfo = "", this.countryname = "";
            },
            //编辑
            handleEdit: function (index, row) {
                if (row) {
                    this.Visible = true, this.title = '编辑目的地';
                    this.continetname = row.continentName;
                    this.countryData = [{countryId: row.countryId, countryName: row.countryName}]
                    this.destinationName = row.destinationName;
                    this.destinationInfo = row.destinationInfo;
                    this.countryname = row.countryId;
                    if (row.destinationImage && row.destinationImage.length > 0) {
                        this.fileList = [{name: "", url: row.destinationImage}];
                    }
                    this.editData = row;
                }
            },
            //删除
            handleDelete: function (index, row) {
                this.delVisible = true;
                this.delobj = row;
                console.log(row);
            },
            // 确定删除
            deleteRow: function () {
                var _this = this;
                API.request({
                    url: API.deleteDestination,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({destinationId: this.delobj.destinationId})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.delVisible = false;
                            _this.$message.success('删除成功');
                            _this.init();
                        } else {
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
            //删除目的地关联信息并更新目的地信息
            delupDestination: function (params) {
                var _this = this;
                API.request({
                    url: API.delupDestination,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.editConfirmFlag=false;
                            _this.$message.success('删除目的地关联信息并更新目的地信息');
                            _this.init();
                        } else {
                            _this.$message.error(e.data.msg);
                        }
                    } else {
                        _this.$message.error(e.data.msg);
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            //上传成功
            onsuccessHandle: function (res, file) {
                this.fileList = [{name: "", url: res}];
            },
            //图片显示
            handlePreview: function (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //上传
            handleExceed: function (files, fileList) {
                this.$message.warning('请先删除图片，再上传文件');
            },
            beforeRemove: function (file, fileList) {
                return this.$confirm('确定移除' + file.name + '？');
            },
            //数据转变
            exchangeData: function (v) {
                for (var i = 0, arr = v; i < arr.length; i++) {
                    arr[i].destinationInfos = (arr[i].destinationInfo).substr(0, 27) + '...';
                    arr[i].isRecommends = arr[i].isRecommend == 1 ? "已推荐" : "未推荐"
                }
                return arr;
            }
        }
    }
    ;
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

    /*table{table-layout: fixed;}*/
    /*td{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}*/
    .upload-demo > > > .el-upload--text {
        text-align: left;
        border: none;
    }
</style>
