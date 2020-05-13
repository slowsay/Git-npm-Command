<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 系统管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 管理员设置
                </el-breadcrumb-item>
                <el-breadcrumb-item>权限设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <span>选择项：</span>
            <el-select v-model="form.region" placeholder="请选择" @change="powerHandle">
                <el-option key="1" label="普通管理员" value="1"></el-option>
                <el-option key="2" label="系统管理员" value="2"></el-option>
                <el-option key="3" label="超级管理员" value="3"></el-option>
            </el-select>
            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="user.isIndeterminate" v-model="user.checkAll"
                                 @change="userCheckHandle">
                        {{user.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{user.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="user.options" @change="userOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{user.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="user.noptions" @change="usernOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="merchant.isIndeterminate" v-model="merchant.checkAll"
                                 @change="merchantCheckHandle">
                        {{merchant.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{merchant.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="merchant.options" @change="merchantOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{merchant.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="merchant.noptions" @change="merchantnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="detination.isIndeterminate" v-model="detination.checkAll"
                                 @change="detinationCheckHandle">
                        {{detination.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{detination.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="detination.options" @change="detinationOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{detination.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="detination.noptions" @change="detinationnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="diving.isIndeterminate" v-model="diving.checkAll"
                                 @change="divingCheckHandle">
                        {{diving.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{diving.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="diving.options" @change="divingOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{diving.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="diving.noptions" @change="divingnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{diving.nnn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="diving.nnoptions" @change="divingnnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>
            <!--advert-->
            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="advert.isIndeterminate" v-model="advert.checkAll"
                                 @change="advertCheckHandle">
                        {{advert.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{advert.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="advert.options" @change="advertOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{advert.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="advert.noptions" @change="advertnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{advert.nnn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="advert.nnoptions" @change="advertnnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>
            <!--feedback-->
            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="feedback.isIndeterminate" v-model="feedback.checkAll"
                                 @change="feedbackCheckHandle">
                        {{feedback.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{feedback.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="feedback.options" @change="feedbackOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{feedback.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="feedback.noptions" @change="feedbacknOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>
            <!--datastatus-->
            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="datastatus.isIndeterminate" v-model="datastatus.checkAll"
                                 @change="datastatusCheckHandle">
                        {{datastatus.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{datastatus.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="datastatus.options" @change="datastatusOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>
            <!--system-->
            <div class="box">
                <div class="name">
                    <el-checkbox :indeterminate="system.isIndeterminate" v-model="system.checkAll"
                                 @change="systemCheckHandle">
                        {{system.title}}
                    </el-checkbox>
                </div>
                <div class="itemName">
                    <div class="formBox">
                        <el-col :span="4">
                            <div class="title">{{system.n}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="system.options" @change="systemOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                        <el-col :span="4">
                            <div class="title">{{system.nn}}</div>
                        </el-col>
                        <el-col :span="4">
                            <el-checkbox-group v-model="system.noptions" @change="systemnOptionsHandle">
                                <el-checkbox v-for="option in options" :label="option" :key="option">{{option}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-col>
                    </div>
                </div>
            </div>
            <div class='onhand'>
                <el-button type="primary" @click="onHandle">更新权限</el-button>
            </div>
            <!--<div class="box" v-for="(item,index) in data" :key="index">-->
            <!--<div class="name">-->
            <!--<el-checkbox :indeterminate="item.isIndeterminate" :v-model="item.flag"-->
            <!--@change="handleCheckAllChange(item.flag,item,index)">-->
            <!--{{item.name}}-->
            <!--</el-checkbox>-->
            <!--</div>-->
            <!--<div class="itemName">-->
            <!--<div v-for="(item1,i) in data[index].form" :key="i" class="formBox">-->
            <!--<el-col :span="4">-->
            <!--<div class="title">{{item1.title}}</div>-->
            <!--</el-col>-->
            <!--<el-col :span="4">-->
            <!--<el-checkbox-group :v-model="item1.checkedOptions" @change="handleCheckedCitiesChange">-->
            <!--<el-checkbox v-for="items in options" :label="items" :key="items">{{items}}-->
            <!--</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--</el-col>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    const optionsBox = ['查看', '操作'];
    export default {

        data: function () {
            return {
                headerobj: '',
                options: optionsBox,
                form: {
                    region: "1",
                },
                user: {
                    title: "用户管理",
                    n: "用户管理",
                    nn: "用户通知",
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: [],
                },
                merchant: {
                    title: "商家管理",
                    n: "商家管理-编辑",
                    nn: "商家管理-新建",
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: [],
                },
                detination: {
                    title: "目的地管理",
                    n: '目的地-编辑',
                    nn: '目的地-新建',
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: []
                },
                diving: {
                    title: "潜点管理",
                    n: '潜点新建',
                    nn: '潜点编辑',
                    nnn: '标签管理',
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: [],
                    nnoptions: []
                },
                advert: {
                    title: "广告管理",
                    n: '广告编辑',
                    nn: '广告添加',
                    nnn: '广告上/下架',
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: [],
                    nnoptions: []
                },
                feedback: {
                    title: "反馈管理",
                    n: '反馈处理',
                    nn: '反馈添加',
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: []
                },
                datastatus: {
                    title: "数据统计",
                    n: '数据统计',
                    isIndeterminate: false,
                    checkAll: false,
                    options: []
                },
                system: {
                    title: "系统管理",
                    n: '新增/编辑角色',
                    nn: '权限设置',
                    isIndeterminate: false,
                    checkAll: false,
                    options: [],
                    noptions: []
                },
                data: {}
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
                this.powerHandle(this.form.region);
            },
            powerHandle: function (val) {
                var _this = this;
                API.request({
                    method: "post",
                    url: API.selectRole,
                    headers: this.headerobj,
                    data: API.qs.stringify({
                        roleId: val
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            if (e.data.data) {
                                var obj = JSON.parse(e.data.data);
                                _this.user = obj.user;
                                _this.merchant = obj.merchant;
                                _this.detination = obj.detination;
                                _this.diving = obj.diving;
                                _this.advert = obj.advert;
                                _this.feedback = obj.feedback;
                                _this.datastatus = obj.datastatus;
                                _this.system = obj.system;
                            }
                        }
                        else {
                            _this.$message.error(JSON.stringify(e.data.msg));
                        }
                    }
                    else {
                        _this.$message.error(JSON.stringify(e.data.msg));
                    }

                }).catch(function (e) {
                    console.log(e);
                    _this.$message.error(JSON.stringify(e));
                })
            },
            userCheckHandle: function (flag) {
                this.user.options = flag ? optionsBox : [];
                this.user.noptions = flag ? optionsBox : [];
                this.user.isIndeterminate = false;
                console.log(JSON.stringify(this.user));
            },
            userOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.user.checkAll = checkedCount === this.options.length;
                this.user.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            usernOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.user.checkAll = checkedCount === this.options.length;
                this.user.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //merchant
            merchantCheckHandle: function (flag) {
                this.merchant.options = flag ? optionsBox : [];
                this.merchant.noptions = flag ? optionsBox : [];
                this.merchant.isIndeterminate = false;
                console.log(this.merchant);
            },
            merchantOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.merchant.checkAll = checkedCount === this.options.length;
                this.merchant.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            merchantnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.merchant.checkAll = checkedCount === this.options.length;
                this.merchant.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //detination
            detinationCheckHandle: function (flag) {
                this.detination.options = flag ? optionsBox : [];
                this.detination.noptions = flag ? optionsBox : [];
                this.detination.isIndeterminate = false;
                console.log(this.detination);
            },
            detinationOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.detination.checkAll = checkedCount === this.options.length;
                this.detination.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            detinationnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.detination.checkAll = checkedCount === this.options.length;
                this.detination.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //diving
            divingCheckHandle: function (flag) {
                this.diving.options = flag ? optionsBox : [];
                this.diving.noptions = flag ? optionsBox : [];
                this.diving.nnoptions = flag ? optionsBox : [];
                this.diving.isIndeterminate = false;
                console.log(this.diving);
            },
            divingOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.diving.checkAll = checkedCount === this.options.length;
                this.diving.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            divingnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.diving.checkAll = checkedCount === this.options.length;
                this.diving.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            divingnnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.diving.checkAll = checkedCount === this.options.length;
                this.diving.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //advert
            advertCheckHandle: function (flag) {
                this.advert.options = flag ? optionsBox : [];
                this.advert.noptions = flag ? optionsBox : [];
                this.advert.nnoptions = flag ? optionsBox : [];
                this.advert.isIndeterminate = false;
                console.log(this.advert);
            },
            advertOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.advert.checkAll = checkedCount === this.options.length;
                this.advert.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            advertnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.advert.checkAll = checkedCount === this.options.length;
                this.advert.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            advertnnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.advert.checkAll = checkedCount === this.options.length;
                this.advert.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //feedback
            feedbackCheckHandle: function (flag) {
                this.feedback.options = flag ? optionsBox : [];
                this.feedback.noptions = flag ? optionsBox : [];
                this.feedback.isIndeterminate = false;
                console.log(this.feedback);
            },
            feedbackOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.feedback.checkAll = checkedCount === this.options.length;
                this.feedback.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            feedbacknOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.feedback.checkAll = checkedCount === this.options.length;
                this.feedback.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //datastatus
            datastatusCheckHandle: function (flag) {
                this.datastatus.options = flag ? optionsBox : [];
                this.datastatus.noptions = flag ? optionsBox : [];
                this.datastatus.isIndeterminate = false;
                console.log(this.datastatus);
            },
            datastatusOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.datastatus.checkAll = checkedCount === this.options.length;
                this.datastatus.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            datastatusnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.datastatus.checkAll = checkedCount === this.options.length;
                this.datastatus.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //system
            systemCheckHandle: function (flag) {
                this.system.options = flag ? optionsBox : [];
                this.system.noptions = flag ? optionsBox : [];
                this.system.isIndeterminate = false;
                console.log(this.system);
            },
            systemOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.system.checkAll = checkedCount === this.options.length;
                this.system.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            systemnOptionsHandle: function (value) {
                var checkedCount = value.length;
                this.system.checkAll = checkedCount === this.options.length;
                this.system.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length;
            },
            //更新权限
            onHandle: function () {
                var _this = this, _menuIds = {}, _region = this.form.region;
                _menuIds = {
                    user: this.user,
                    merchant: this.merchant,
                    detination: this.detination,
                    diving: this.diving,
                    advert: this.advert,
                    feedback: this.feedback,
                    datastatus: this.datastatus,
                    system: this.system
                }
                var _params = {roleId: _region, menuIds: JSON.stringify(_menuIds)};
                API.request({
                    url: API.setRoleMenu,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(_params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("设置成功");
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
<style lang="less" scoped>
    .box {
        width: 100%;
        min-width: 1000px;
        height: 82px;
        border: 1px solid #cccccc;
        margin-top: 30px;
        line-height: 40px;
        box-sizing: border-box;
        .name {
            height: 40px;
            line-height: 40px;
            padding-left: 20px;
            border-bottom: 1px solid #ccc;
        }
        .itemName {
            .formBox {
                text-align: center;
                .el-col {
                    border-right: 1px solid #ccc;
                    text-align: center;
                    height: 40px;
                }
                .title {
                    text-align: center;
                }
            }
        }
    }

    .onhand {
        margin: 50px 0;
    }
</style>
