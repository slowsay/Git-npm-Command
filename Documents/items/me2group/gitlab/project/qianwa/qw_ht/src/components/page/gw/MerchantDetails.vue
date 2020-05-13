<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>商家管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">店铺名称&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.shopName" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">店铺类型&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.shopType" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">联系方式&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.phone" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">电子邮箱&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.email" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">址址&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.address" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">网站&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.website" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">运营媒体&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.operationMedia" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">营业时间&nbsp;:</el-col>
                <el-col :span="8">
                    <el-date-picker v-model="data.businessHours" @change="beginHandle" type="datetime"
                                    placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">特色&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.characteristic" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">付款方式&nbsp;:</el-col>
                <el-col :span="8">
                    <el-select v-model="data.payType" placeholder="付款方式">
                        <el-option key="1" label="现金" value="1"></el-option>
                        <el-option key="2" label="支付宝" value="2"></el-option>
                        <el-option key="3" label="微信" value="3"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">语言&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>

            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">停车场&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">交通&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">员工&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">课程&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">开放潜水点&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">游泳池&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">出租&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">维护&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">其他销售活动&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">压缩机&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">填写&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">品牌&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->

            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">服务&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">潜水船&nbsp;:</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="data.language" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--</el-row>-->


            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">当地潜水点类型&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.diveType" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>


            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">可选路线方案&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="data.routePlan" placeholder="请输入内容" maxlength="16"></el-input>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="3" :offset="3">
                    <el-button style="width:100%" type="primary" @click="confirmHandle">确认</el-button>
                </el-col>
                <el-col :span="3" :offset="1">
                    <el-button style="width:100%" @click="backHandle">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
            <p style=" text-align: center; font-size:25px">{{title}}</p>
            <el-input
                style="width:300px ;margin: 30px auto 0;display:block"
                v-model="select_word"
                placeholder="请输入内容"
            ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
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
                title: '',
                headerobj: '',
                pageindex: 1,
                pagesize: 10,
                select_word: "",
                data: {
                    address: "",
                    businessHours: "",
                    characteristic: "",
                    diveType: "",
                    email: "",
                    language: "",
                    operationMedia: "",
                    payType: "",
                    phone: "",
                    routePlan: "",
                    shopName: "",
                    shopRole: "",
                    shopRoleName: "",
                    shopType: "",
                    website: "",
                },
                status: 0,
                editVisible: false,
                title: "",
                index: ""
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
        activated: function () {
            this.init();
        },
        methods: {
            init: function () {
                var _this = this;
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.userId}
                this.status = this.$route.query.status;
                if (this.status == "1") {
                    this.title = '商家详细页面';
                    //更新
                    API.request({
                        method: "post",
                        url: API.businessInfo,
                        headers: {
                            token: this.userinfo.token,
                            userId: this.userinfo.id
                        },
                        data: API.qs.stringify({
                            businessId: this.$route.query.id,
                        })
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.data = e.data.data;
                            }
                            else {
                                API.dialog({message: JSON.stringify(e.data.msg)});
                            }
                        }
                        else {
                            API.dialog({message: JSON.stringify(e.data.msg)});
                        }

                    }).catch(function (e) {
                        API.dialog({message: JSON.stringify(e)});
                    })
                }
                else {
                    this.title = "新增店铺";
                    this.data = {
                        address: "",
                        businessHours: "",
                        characteristic: "",
                        diveType: "",
                        email: "",
                        language: "",
                        operationMedia: "",
                        payType: "",
                        phone: "",
                        routePlan: "",
                        shopName: "",
                        shopRole: "",
                        shopRoleName: "",
                        shopType: "",
                        website: "",
                    };
                }
            },
            beginHandle: function (date) {
                this.data.businessHours = publicFn.dateFormat(date.getTime());
            },
            // 分页导航
            handleCurrentChange: function (val) {
            },
            search: function () {
            },
            confirmHandle: function () {
                var _this = this,
                    _address = this.data.address,
                    _businessHours = this.data.businessHours,
                    _characteristic = this.data.characteristic,
                    _diveType = this.data.diveType,
                    _email = this.data.email,
                    _language = this.data.language,
                    _operationMedia = this.data.operationMedia,
                    _payType = this.data.payType,
                    _phone = this.data.phone,
                    _routePlan = this.data.routePlan,
                    _shopName = this.data.shopName,
                    _shopRole = this.data.shopRole,
                    _shopRoleName = this.data.shopRoleName,
                    _shopType = this.data.shopType,
                    _website = this.data.website;
//                if (_shopName.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_businessHours.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                } else if (_businessHours.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_diveType.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_email.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_language.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_operationMedia.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_payType.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_phone.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_routePlan.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_shopName.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_shopRole.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_shopRoleName.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_shopType.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else if (_website.length < 1) {
//                    API.dialog({message: API.msg.ERROR_STORE});
//                }
//                else {
                var _params ={}
                if (this.$route.query.status == 0) {
                    _params= {
                        address: _address,
                        businessHours: _businessHours,
                        characteristic: _characteristic,
                        diveType: _diveType,//潜水类型
                        email: _email,
                        language: _language,
                        operationMedia: _operationMedia,
                        payType: _payType,
                        phone: _phone,
                        routePlan: _routePlan,
                        shopName: _shopName,
                        shopRole: _shopRole,
                        shopRoleName: _shopRoleName,
                        shopType: _shopType,
                        website: _website
                    }
                    //新增
                    API.request({
                        url: API.addBusiness,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify(_params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.regionData = e.data.data;
                                _this.$message.success("添加成功");
                                _this.$router.push('/Merchant');
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
                } else {
                    //更新
                    _params= {
                        businessId:this.$route.query.id,
                        storeId:this.data.storeId,
                        number:this.data.number,
                        address: _address,
                        businessHours: _businessHours,
                        characteristic: _characteristic,
                        diveType: _diveType,//潜水类型
                        email: _email,
                        language: _language,
                        operationMedia: _operationMedia,
                        payType: _payType,
                        phone: _phone,
                        routePlan: _routePlan,
                        shopName: _shopName,
                        shopRole: _shopRole,
                        shopRoleName: _shopRoleName,
                        shopType: _shopType,
                        website: _website
                    }
                    API.request({
                        url: API.updateBusiness,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify(_params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.regionData = e.data.data;
                                _this.$router.push('/Merchant');
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
//                }

            },
            backHandle: function () {
                this.$router.push("/Merchant");
            },
            // 保存编辑
            saveEdit: function () {
                this.data[this.index].content = this.select_word;
                this.select_word = "";
                this.editVisible = false;
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
