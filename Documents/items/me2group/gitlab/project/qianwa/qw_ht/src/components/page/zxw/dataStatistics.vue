<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 数据统计
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <!-- app端访问量 -->
            <div class="visit">
                <div id="myVisit" :style="{width:'900px',height:'300px'}"></div>
                <div class="rightbox">
                    <div class="box">
                        <p>今日访问量</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>本周访问量</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>本月访问量</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>访问量</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                </div>
            </div>
            <!-- 用户统计-添加用户 -->
            <div class="visit">
                <div id="userLine" :style="{width:'900px',height:'300px'}"></div>
                <div class="rightbox">
                    <div class="box">
                        <p>今日注册量</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>本周注册量</p>

                        <p>{{form.weekVisit}}</p>
                    </div>
                    <div class="box">
                        <p>本月注册量</p>

                        <p>{{form.monthVisit}}</p>
                    </div>
                    <div class="box">
                        <p>总用户人数</p>

                        <p>{{form.totalVisit}}</p>
                    </div>
                </div>
            </div>
            <!-- 用户统计-活跃用户 -->
            <div class="visit">
                <div id="activeUser" :style="{width:'900px',height:'300px'}"></div>
                <div class="rightbox">
                    <div class="box">
                        <p>今日活跃用户</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>本周活跃用户</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>本月活跃用户</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                    <div class="box">
                        <p>总用户人数</p>

                        <p>{{form.todayVisit}}</p>
                    </div>
                </div>
            </div>
            <!-- 用户使用时长 -->
            <div class="user">
                <p class="title">用户使用时长</p>

                <div class="formBox">
                    <div class="block">
                        <span class="demonstration">选择时间</span>
                        <el-date-picker
                            v-model="userUsed"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </div>
                    <div class="itemBox">
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>日平均时长</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>周平均时长</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>月平均时长</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 用户存留率 -->
            <div class="user">
                <p class="title">用户存留率</p>

                <div class="formBox">
                    <div class="block">
                        <span class="demonstration">选择时间</span>
                        <el-date-picker
                            v-model="userRetention"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </div>
                    <div class="itemBox">
                        <div>
                            <p>{{form.point}}</p>

                            <p>日存活率</p>
                        </div>
                        <div>
                            <p>{{form.point}}</p>

                            <p>周存活率</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>月平均时长</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 项目统计 -->
            <div class="user">
                <p class="title">项目统计</p>

                <div class="formBox">
                    <div class="block">
                        <span class="demonstration">选择目的地</span>
                        <el-cascader :options="options" clearable></el-cascader>
                    </div>
                    <div class="itemBox">
                        <div>
                            <p>{{form.time}}</p>

                            <p>总PV</p>
                        </div>
                        <div>
                            <p>{{form.time}}</p>

                            <p>总UV</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>总点赞</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>总收藏</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>总分享</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>平均停留时间</p>
                        </div>
                        <div>
                            <p>{{form.time}} 小时</p>

                            <p>跳出率</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 潜点统计 -->
            <div class="user">
                <p class="title">潜点统计</p>

                <div class="formBox">
                    <div class="block">
                        <span class="demonstration">选择目的地</span>
                        <el-cascader :options="options1" clearable @change="changeHandle"></el-cascader>
                        <el-select v-model="selectdiving" @change="getDivingHandle">
                            <el-option v-for="item in divingData" key="item.diveId" label="item.diveName"
                                       value="item.diveId"></el-option>
                        </el-select>
                    </div>
                    <div class="itemBox">
                        <div>
                            <p>{{destination.pv}}</p>

                            <p>总PV</p>
                        </div>
                        <div>
                            <p>{{destination.uv}}</p>

                            <p>总UV</p>
                        </div>
                        <div>
                            <p>{{destination.isLike||0}} 小时</p>

                            <p>总点赞</p>
                        </div>
                        <div>
                            <p>{{destination.isCollect||0}} 小时</p>

                            <p>总收藏</p>
                        </div>
                        <div>
                            <p>{{destination.share||0}} 小时</p>

                            <p>总分享</p>
                        </div>
                        <div>
                            <p>{{destination.avertime}} 小时</p>

                            <p>平均停留时间</p>
                        </div>
                        <div>
                            <p>{{destination.quitrate}} 小时</p>

                            <p>跳出率</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 下载渠道统计 -->
            <div class="user">
                <p class="title">下载渠道统计</p>

                <div class="formBox">
                    <div class="itemBox">
                        <div>
                            <p>{{form.number}}</p>

                            <p>苹果商场</p>
                        </div>
                        <div>
                            <p>{{form.number}}</p>

                            <p>华为商城</p>
                        </div>
                        <div>
                            <p>{{form.number}} 小时</p>

                            <p>360手机助手</p>
                        </div>
                        <div>
                            <p>{{form.number}} 小时</p>

                            <p>应用宝</p>
                        </div>
                        <div>
                            <p>{{form.number}} 小时</p>

                            <p>小米应用商城</p>
                        </div>
                        <div>
                            <p>{{form.number}} 小时</p>

                            <p>平均停留时间</p>
                        </div>
                        <div>
                            <p>{{form.number}} 小时</p>

                            <p>跳出率</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 设备类型统计 -->
            <div class="user">
                <p class="title">设备类型统计</p>

                <div class="listBox">
                    <el-table :data="tableData" style="width: 100%;font-size:16px">
                        <el-table-column prop="name" label="设备类型" align="center"></el-table-column>
                        <el-table-column prop="number" label="统计机数" align="center"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    export default {
        data: function () {
            return {
                headerobj: '',
                selectdiving: '',
                destination: {
                    pv: 0,
                    uv: 0,
                    collection: 0,
                    time: 0,
                    quitrate: 0,
                    avertime: 0
                },
                form: {
                    todayVisit: "",
                    weekVisit: "",
                    monthVisit: '',
                    totalVisit: '',
                    time: "4.5",
                    point: "50%",
                    number: "3000",
                    name: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: true,
                    type: ["步步高"],
                    resource: "小天才",
                    desc: "",
                    options: []
                },
                //地址选择器
                options: [
                    {
                        value: "zhinan",
                        label: "指南",
                        children: [
                            {
                                value: "shejiyuanze",
                                label: "设计原则",
                                children: [
                                    {
                                        value: "yizhi",
                                        label: "一致"
                                    },
                                ]
                            },
                            {
                                value: "daohang",
                                label: "导航",
                                children: [
                                    {
                                        value: "cexiangdaohang",
                                        label: "侧向导航"
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        value: "zujian",
                        label: "组件",
                        children: [
                            {
                                value: "basic",
                                label: "Basic",
                                children: [
                                    {
                                        value: "layout",
                                        label: "Layout 布局"
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        value: "ziyuan",
                        label: "资源",
                        children: [
                            {
                                value: "axure",
                                label: "Axure Components"
                            },
                        ]
                    }
                ],
                //潜点地址选择器
                options1: [
                    {
                        value: "1",
                        label: "大洋洲",
                        children: [
                            {
                                value: "16",
                                label: "中国",
                                children: [
                                    {
                                        value: "yizhi",
                                        label: "杭州",
                                        children: [
                                            {
                                                value: "hangzhou",
                                                label: "杭州"
                                            }
                                        ]
                                    },
                                    {
                                        value: "fankui",
                                        label: "反馈"
                                    },
                                    {
                                        value: "xiaolv",
                                        label: "效率"
                                    },
                                    {
                                        value: "kekong",
                                        label: "可控"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                userUsed: "",//用户使用度
                userRetention: "",//用户留存率
                //设备类型
                tableData: [
                    {
                        number: "2016",
                        name: "苹果11"
                    },
                    {
                        number: "2016",
                        name: "苹果xr"
                    },
                    {
                        number: "2016",
                        name: "黑莓22"
                    },
                    {
                        number: "2016",
                        name: "小米8"
                    }
                ],
                userData: [],
                cutarr: [],
                setime: 0,
                divingDatas: [],
            };
        },
        mounted: function () {
            this.drawLine();
            this.drawUserLine();
            this.activeUser();
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
                //注册数
                this.userRegData();
                //用户图表
                this.userChartData();
                //潜点统计
                this.divingData();
            },
            //
            getDivingHandle: function () {

            },
            //根据选择的目的地名称查询这个目的地下的所有潜点的分享数，收藏数，点赞数
            selectStatByDestinationName: function (val) {
                var _this = this;
                API.request({
                    url: API.selectStatByDestinationName,
                    method: 'get',
                    headers: this.headerobj,
                    params: {destinationName: val}
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {

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
            //获取潜点列表
            getDivingData: function (id) {
                var _this = this;
                API.request({
                    url: API.selectDiveSitBydes,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({destinationId: id})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.divingDatas = e.data.data;
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
            changeHandle: function (val) {
                var _this = this;
                this.cutarr = val;
                if (val.length == 3) {
                    this.getDivingData(val[2]);
                    API.request({
                        url: API.selectDestinationId,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify({destinationId: val[2]})
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.selectStatByDestinationName(e.data.data.destinationName);
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
            //潜点统计
            divingData: function () {
                var _this = this;
                API.request({
                    url: API.selectAllContinent,
                    method: 'post',
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.options1 = _this.getContinentData(e.data.data);
                            _this.getCountryData(e.data.data, 0);
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
            getContinentData: function (data) {
                for (var i = 0, arr = []; i < data.length; i++) {
                    arr.push({value: data[i].continentId, label: data[i].continentName, children: []});
                }
                return arr;
            },
            //获取国家
            getCountryData: function (data, i) {
                var _this = this;
                if (i < data.length - 1) {
                    API.request({
                        url: API.selectCountryByCon,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify({continetId: data[i].continentId})
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.options1[i].children = _this.setCountryData(e.data.data);
                                _this.getDestinationData(data, i, e.data.data, 0);
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

                }
            },
            //国家入数组
            setCountryData: function (data) {
                for (var i = 0, arr = []; i < data.length; i++) {
                    arr.push({value: data[i].countryId, label: data[i].countryName, children: []})
                }
                return arr;
            },
            //获取目的地
            getDestinationData: function (pdata, j, data, i) {
                var _this = this;
                if (i < data.length - 1) {
                    API.request({
                        url: API.selectByCountryId,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify({countryId: data[i].countryId})
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.options1[j].children[i].children = _this.setDestinationData(e.data.data);
                                i++;
                                _this.getDestinationData(pdata, j, data, i);
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
                    j++;
                    _this.getCountryData(pdata, j);
                }
            },
            //目的地放数组
            setDestinationData: function (data) {
                for (var i = 0, arr = []; i < data.length; i++) {
                    arr.push({value: data[i].destinationId, label: data[i].destinationName})
                }
                return arr;
            },
            userChartData: function () {
                var _this = this;
                API.request({
                    url: API.registerChart,
                    method: 'post',
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.userData = e.data.data;
                            _this.drawUserLine()
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
            userRegData: function () {
                var _this = this;
                API.request({
                    url: API.registerCount,
                    method: 'post',
                    headers: this.headerobj
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.form.todayVisit = e.data.data.todayCount,
                                _this.form.weekVisit = e.data.data.weekCount,
                                _this.form.monthVisit = e.data.data.monthCount,
                                _this.form.totalVisit = e.data.data.allCount;

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
            //访问量
            drawLine: function () {
                //基于准备好的dom，初始化echarts实例
                let myVisit = this.$echarts.init(document.getElementById("myVisit"));
                //绘制app访问量折线图
                myVisit.setOption({
                    title: {text: "app访问量"},
                    tooltip: {},
                    xAxis: {
                        data: [
                            "07-01周四",
                            "07-02周五",
                            "07-03周六",
                            "07-04周日",
                            "07-05周一",
                            "07-06周二",
                            "07-07周三"
                        ]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "访问数",
                            type: "line",
                            data: [5, 20, 36, 10, 10, 19, 34]
                        }
                    ]
                });
            },
            getUserDateData: function (v) {
                for (var i = 0, arr = []; i < v.length; i++) {
                    arr.push(v[i].dataTime);
                }
                return arr;
            },
            getUserCountData: function (v) {
                for (var i = 0, arr = []; i < v.length; i++) {
                    arr.push(v[i].dataValue);
                }
                return arr;

            },
            //注册量
            drawUserLine: function () {
                var _dateArr = this.getUserDateData(this.userData), _usercount = this.getUserCountData(this.userData);
                //基于准备好的dom，初始化echarts实例
                var userLine = this.$echarts.init(document.getElementById("userLine"));
                //绘制app访问量折线图
                userLine.setOption({
                    title: {text: "用户统计-添加用户"},
                    tooltip: {},
                    xAxis: {
                        data: _dateArr
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "注册数",
                            type: "line",
                            data: _usercount
                        }
                    ]
                });
            },
            activeUser: function () {
                //基于准备好的dom，初始化echarts实例
                let activeUser = this.$echarts.init(
                    document.getElementById("activeUser")
                );
                //绘制app访问量折线图
                activeUser.setOption({
                    title: {text: "用户统计-活跃用户"},
                    tooltip: {},
                    xAxis: {
                        data: [
                            "07-01周四",
                            "07-02周五",
                            "07-03周六",
                            "07-04周日",
                            "07-05周一",
                            "07-06周二",
                            "07-07周三"
                        ]
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "用户数",
                            type: "line",
                            data: [50, 122, 363, 347, 1000, 400, 233]
                        }
                    ]
                });
            }
        }
    };
</script>
<style lang="less" scoped>
    .visit {
        display: flex;
        width: 100%;
        min-width: 1000px;
        margin-top: 20px;
        height: 300px;

        padding: 10px;
        box-sizing: border-box;
        .rightbox {
            margin-top: 50px;
            width: 300px;
            height: 200px;
            display: flex;
            flex-wrap: wrap;
            //    border:1px solid red;
            flex-shrink: 0;
            .box {
                width: 120px;
                height: 80px;
                border: 1px solid #666666;
                text-align: center;
                padding: 10px;
                line-height: 30px;
                box-sizing: border-box;

                margin: 10px;
            }
        }
    }

    .user {
        margin-bottom: 20px;
        .title {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
            margin-left: 20px;
        }
        .listBox {
            width: 100%;
            border: 1px solid #ccc;
            margin-left: 20px;
            margin-top: 20px;
            padding: 20px;
            box-sizing: border-box;
        }
        .formBox {
            width: 100%;
            height: 200px;
            border: 1px solid #ccc;
            margin-left: 20px;
            margin-top: 20px;
            padding: 20px;
            box-sizing: border-box;
            .itemBox {
                display: flex;
                justify-content: space-between;
                text-align: center;
                line-height: 50px;
                div {
                    padding: 30px;
                    > p:nth-child(1) {
                        font-size: 24px;
                        color: red;
                    }
                }
            }
        }
    }
</style>
