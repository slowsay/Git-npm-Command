<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>内容管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>编辑内容</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">文章标题&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="subject" placeholder="请输入内容" maxlength="30"></el-input>
                </el-col>
                <el-col :span="3">
                    (最多30个字)
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">图片&nbsp;:</el-col>
                <el-col :span="8">
                    <el-upload
                        class="upload-demo"
                        list-type="picture-card"
                        :action="aliupload"
                        :on-preview="handlePreview"
                        :before-remove="beforeRemove"
                        :on-success="onsuccessHandle"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button style="width:50%" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">所属地&nbsp;:</el-col>
                <el-col :span="8">
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
                            v-for="item1 in countryData"
                            :key="item1.countryId"
                            :label="item1.countryName"
                            :value="item1.countryId"
                        ></el-option>
                    </el-select>

                    <el-select v-model="form.destinatName" placeholder="目的地" @change="destinatHandle">
                        <el-option
                            v-for="item2 in destinatData"
                            :key="item2.destinationId"
                            :label="item2.destinationName"
                            :value="item2.destinationId"
                        ></el-option>
                    </el-select>

                    <el-select v-model="form.divingName" placeholder="潜点" @change="divingHandle">
                        <el-option
                            v-for="(item3,index) in divingData"
                            :key="item3.diveId"
                            :label="item3.diveName"
                            :value="item3.diveId"
                        ></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">
                    <el-input v-model="fieldName" placeholder="请输入字段" maxlength="16"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="fieldValue" placeholder="请输入值" maxlength="16"></el-input>
                    <!--<el-date-picker v-model="travelTime" @change="getTravelTime" type="datetime"-->
                    <!--placeholder="选择日期"></el-date-picker>-->
                </el-col>
                <el-col :span="8">
                    <el-button @click="addFieldHandle">添加</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;" v-for="(item6,index) in fieldData" :key="index">
                <el-col :span="2" :offset="1" style="line-height:32px">
                    {{item6.keyss}}
                </el-col>
                <el-col :span="8">
                    {{item6.valuess}}
                    <!--<el-date-picker v-model="travelTime" @change="getTravelTime" type="datetime"-->
                    <!--placeholder="选择日期"></el-date-picker>-->
                </el-col>
                <el-col :span="8">
                    <el-button @click="uploadFieldHandle(item6)">更新</el-button>
                    <el-button @click="delsFieldHandle(item6)">删除</el-button>
                </el-col>
            </el-row>
            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">-->
            <!--<el-input v-model="travelDayTitle" placeholder="出行天数" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="travelDay" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-button>添加</el-button>-->
            <!--<el-button>删除</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-row style="margin-bottom:20px;">-->
            <!--<el-col :span="2" :offset="1" style="line-height:32px">-->
            <!--<el-input v-model="cushTitle" placeholder="平均费用" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-input v-model="cost" placeholder="请输入内容" maxlength="16"></el-input>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-button>添加</el-button>-->
            <!--<el-button>删除</el-button>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">亮点&nbsp;:</el-col>
                <el-col :span="21">
                    <p v-for="(item7,index) in brightSpotName" :key="index" class="card">
                        <span>{{item7}}</span>
                        <i @click="brightSpot.splice(index,1),brightSpotName.splice(index,1)"
                           class="el-icon-circle-close"></i>
                    </p>
                    <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                    ></el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加</el-button>
                    <!--<el-button style="width:100px" @click="Visible=true">添加标签</el-button>-->
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;" v-if="catelistflag">
                <el-col :span="2" :offset="1" style="line-height:32px">类目名称&nbsp;:</el-col>
                <el-col :span="8">
                    <el-input v-model="marineOrganismName" placeholder="请输入内容" disabled></el-input>
                </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
                <el-col :span="2" :offset="1" style="line-height:32px">介绍&nbsp;:</el-col>
                <el-col :span="16">
                    <!--视频上传-->
                    <el-upload
                        class="ivuVideo-upload"
                        list-type="picture-card"
                        :action="aliupload"
                        :on-success="handleVideoSuccess"
                    >
                        <el-button style="width:50%" class="upfile" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <!--图片上传-->
                    <el-upload
                        class="ivu-upload"
                        list-type="picture-card"
                        :action="aliupload"
                        :on-success="handleSuccess"
                    >
                        <el-button style="width:50%" class="upfile" size="small" type="primary">点击上传</el-button>
                    </el-upload>
                    <!--编辑器-->
                    <quill-editor ref="QuillEditor" v-model="content" :options="editorOption"></quill-editor>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" :offset="3">
                    <el-button style="width:100%" type="primary" @click="confirmHandle">确认</el-button>
                </el-col>
                <el-col :span="3" :offset="1">
                    <el-button style="width:100%" @click="cancelHandle">取消</el-button>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="动态属性更新" :visible.sync="updateVisible" center>
            <el-col :span="7" :offset="1" style="line-height:32px">
                <el-input v-model="fieldNames" placeholder="请输入字段" maxlength="16"></el-input>
            </el-col>
            <el-col :span="8">
                <el-input v-model="fieldValues" placeholder="请输入值" maxlength="16"></el-input>
                <!--<el-date-picker v-model="travelTime" @change="getTravelTime" type="datetime"-->
                <!--placeholder="选择日期"></el-date-picker>-->
            </el-col>
            <el-button @click="updateVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateOnHandle">确 定</el-button>
        </el-dialog>

        <el-dialog title="选择标签" :visible.sync="tabVisible" width="400px" center>
            <el-col :span="5" :offset="2">
                <p style="line-height:32px">选择分类:</p>
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
            <el-col>
                <el-table
                    :data="checkListData"
                    border
                    class="table"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55" align="center"></el-table-column>
                    <el-table-column prop="tagName" label="标签名"></el-table-column>
                </el-table>
            </el-col>
            <el-row style="margin-top:20px">
                <el-col :span="9" :offset="14">
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="pagecount"
                    ></el-pagination>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
            <el-button @click="tabVisible = false">取 消</el-button>
            <el-button type="primary" @click="tabOnHandle">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    import { quillEditor,Quill } from "vue-quill-editor";
    import ImageResize from 'quill-image-resize-module'
    import {ImageDrop} from 'quill-image-drop-module';
    import API from '../../../api/index';
    import {publicFn} from '../../../utils/util';
    Quill.register('modules/imageResize', ImageResize);
    Quill.register('modules/imageDrop', ImageDrop);
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
        ["blockquote", "code-block"], // 引用  代码块
        [{header: 1}, {header: 2}], // 1、2 级标题
        [{list: "ordered"}, {list: "bullet"}], // 有序、无序列表
        [{script: "sub"}, {script: "super"}], // 上标/下标
        [{indent: "-1"}, {indent: "+1"}], // 缩进
        [{'direction': 'rtl'}],                         // 文本方向
        [{size: ["small", false, "large", "huge"]}], // 字体大小
        [{header: [1, 2, 3, 4, 5, 6, false]}], // 标题
        [{color: []}, {background: []}], // 字体颜色、字体背景颜色
        [{font: []}], // 字体种类
        [{align: []}], // 对齐方式
        ["clean"], // 清除文本格式
        ["image", "video"] // 链接、图片、视频
    ];
    export default {
        data: function () {
            return {
                //类目名称-是否显示
                catelistflag: false,
                //缩略图
                dialogVisible: false,
                dialogImageUrl: '',
                tabVisible: false,
                quillUpdateImg: false,
                categoryData: [],
                categoryName: '',
                checkListData: [],
                updateVisible: !1,
                multipleSelection: [],
                pagecount: 1,
                pagesize: 10,
                pageindex: 1,
                headerobj: '',
                aliupload: "",
                title: "新建内容",
                status: 0,
                data: [],
                subject: "",
                travelTime: "",
                fieldData: [],
                fileList: [],
                travelDay: "",
                fieldName: '',
                fieldValue: '',
                fieldNames: '',
                fieldValues: '',
                updatefieldData: [],
                cost: "",
                //亮点id
                brightSpot: [],
                brightSpotName: [],
                //添加亮点
                inputVisible: false,
                inputValue: '',
                //所属地
                form: {
                    continetName: "",
                    countryName: "",
                    destinatName: "",
                    divingName: ""
                },
                regionData: [],
                countryData: [],
                destinatData: [],
                divingData: [],
                //弹窗
                Visible: false,
                //类目id
                marineOrganism: "",
                marineOrganismName: '',
                data_0: [1, 2, 3],
                data_1: [4, 5, 6],
                data_2: [],
                //富文本
                content: "",
                editorOption: {}
            };
        },
        components: {
            quillEditor: quillEditor,
        },
        created: function () {
            if (localStorage.getItem("userInfo")) {
                this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
                this.status = this.$route.query.status;
                this.init();
            }
            else {
                this.$route.push('/login');
            }
        },
        methods: {
            init: function () {
                this.headerobj = {token: this.userinfo.token, userId: this.userinfo.userId};
                this.aliupload = API.aliUpload;
                this.editorOption = {
                    placeholder: "您想写点什么",
                    modules: {
                        imageResize: {
                            displaySize: true
                        },
                        imageDrop:true,
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                image: function (value) {
                                    if (value) {
                                        //调用图片上传
                                        document.querySelector('.ivu-upload .upfile').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                },
                                video: function (value) {
                                    if (value) {
                                        //调用图片上传
                                        document.querySelector('.ivuVideo-upload .upfile').click()
                                    } else {
                                        this.quill.format('video', false);
                                    }
                                }
                            }
                        }
                    }
                }
                //0是编辑，1是新建
                this.title = this.status == 1 ? "新建内容" : "编辑内容";
                //编辑
                if (this.$route.query.status == 0) {
                    this.getContentData();
                }
                //获取洲列表
                this.getContinent();
                //潜点详情扩展数据
                this.getFieldlist();
                //获取目录
                this.getCategoryList();
            },
            getCategoryData: function (id) {
                for (var i = 0, arr = this.categoryData; i < arr.length; i++) {
                    if (arr[i].categoryId == id) {
                        return arr[i].categoryName;
                        break;
                    }
                }
            },
            categoryHandle: function (val) {
                this.marineOrganism = val;
                this.marineOrganismName = this.getCategoryData(val);
                this.getTagList(val);
            },
            //标签提交
            tabOnHandle: function () {
                //添加热搜接口
                for (var i = 0, arr = this.multipleSelection; i < arr.length; i++) {
                    this.brightSpot.push(arr[i].tagId);
                    this.brightSpotName.push(arr[i].tagName);
                }
                this.tabVisible = false;
            },
            //选中
            handleSelectionChange: function (val) {
                this.multipleSelection = val;
            },
            // 分页导航
            handleCurrentChange: function (val) {
                this.pageindex = val;
                this.getTagList();
            },
            //获取标签列表
            getTagList: function (categoryid) {
                var _this = this;
                API.request({
                    url: API.tagListByConditions,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({page: this.pageindex, num: this.pagesize, categoryId: categoryid})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.pagecount = e.data.total;
                            _this.checkListData = e.data.data.list;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
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
            handleVideoSuccess: function (res) {
                // 获取富文本组件实例
                let quill = this.$refs.QuillEditor.quill;
                if (res) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'video', res);
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    // 提示信息，需引入Message
                    Message.error('视频插入失败')
                }
            },
            handleSuccess: function (res) {
                // 获取富文本组件实例
                let quill = this.$refs.QuillEditor.quill;
                if (res) {
                    // 获取光标所在位置
                    let length = quill.getSelection().index;
                    // 插入图片，res为服务器返回的图片链接地址
                    quill.insertEmbed(length, 'image', res)
                    // 调整光标到最后
                    quill.setSelection(length + 1)
                } else {
                    // 提示信息，需引入Message
                    Message.error('图片插入失败')
                }
            },
            //获取内容详情
            getContentData: function () {
                var _this = this;
                API.request({
                    url: API.selectDiveContentById,
                    method: 'post',
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.userId
                    },
                    data: API.qs.stringify({contentId: this.$route.query.id})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.data = e.data.data;
                            _this.subject = _this.data.title;
                            if (_this.data.image)
                                _this.fileList = [{n: '', url: _this.data.image}];
                            _this.form.destinatName = _this.data.destination;
                            _this.form.divingName = _this.data.diveName;
                            if (_this.data.brightSpot) {
                                _this.brightSpot = _this.data.brightSpot == "" ? [] : (_this.data.brightSpot).split(',');
                            }
                            if (_this.data.brightSpotName) {
                                _this.brightSpotName = _this.data.brightSpotName == "" ? [] : (_this.data.brightSpotName).split(',');
                            }
                            _this.form.continetName = _this.data.continent;
                            _this.form.countryName = _this.data.country;
                            _this.marineOrganism = _this.data.marineOrganism;
                            _this.marineOrganismName = _this.data.marineOrganismName;
                            _this.content = _this.data.diveContent;
                        }
                    }
                }).catch(function (e) {
                    _this.$message.error(JSON.stringify(e));
                })
            },
            showInput: function () {
                //输入框
//                var _this = this;
//                this.inputVisible = true;
//                this.$nextTick(function (_) {
//                    _this.$refs.saveTagInput.$refs.input.focus();
//                });
                this.categoryName = "";
                this.tabVisible = true;
                this.checkListData = [];
            },
            handleInputConfirm: function () {
                var inputValue = this.inputValue;
                if (inputValue) {
                    //添加热搜接口
                    this.brightSpot.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            //获取字段列表
            getFieldlist: function () {
                var _this = this;
                API.request({
                    url: API.selectMsg,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify({contentId: this.$route.query.id})
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.fieldData = e.data.data.data;
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
            //添加字段
            addFieldHandle: function () {
                var _this = this, _fieldName = this.fieldName, _fieldValue = this.fieldValue;
                if (_fieldName.length < 1) {
                    _this.$message.error("请输入字段");
                }
                else if (_fieldValue.length < 1) {
                    _this.$message.error("请输入字段值");
                }
                else {
                    var params = {contentId: this.$route.query.id, key: _fieldName, value: _fieldValue};
                    API.request({
                        url: API.addMsg,
                        method: 'post',
                        headers: this.headerobj,
                        data: API.qs.stringify(params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$message.success("添加成功");
                                _this.fieldName = '', _this.fieldValue = '';
                                _this.getFieldlist();
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
            //调用更新接口
            updateOnHandle: function () {
                var _this = this, _id = this.updatefieldData.id, _fieldNames = this.fieldNames, _fieldValues = this.fieldValues;
                var params = {id: _id, key: _fieldNames, value: _fieldValues};
                API.request({
                    url: API.updateMsg,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.updateVisible = false;
                            _this.$message.success("更新成功");
                            _this.getFieldlist();
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
            //更新字段
            uploadFieldHandle: function (row) {
                this.updateVisible = !0;
                this.updatefieldData = row;
                this.fieldNames = row.keyss, this.fieldValues = row.valuess;
            },
            //删除字段
            delsFieldHandle: function (row) {
                var _this = this;
                var params = {id: row.id};
                API.request({
                    url: API.deleteMsg,
                    method: 'post',
                    headers: this.headerobj,
                    data: API.qs.stringify(params)
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.$message.success("删除成功");
                            _this.getFieldlist();
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
            search: function () {
            },
            handleEdit: function (index, row) {
                this.$router.push("");
            },
            handleDelete: function (index, row) {
                this.delVisible = true;
            },
            // 确定删除
            deleteRow: function () {
                this.$message.success("删除成功");
                this.delVisible = false;
            },
            handleRemove: function (file, fileList) {
//                console.log(file, fileList);
            },
            handlePreview: function (file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleExceed: function (files, fileList) {
                this.$message.warning('请先删除图片，再上传文件');
            },
            beforeRemove: function (file, fileList) {
                return this.$confirm('确定移除' + file.name + '吗？');
            },
            //上传成功
            onsuccessHandle: function (res, files) {
                this.fileList = [{n: '', url: res}];
            },
            //富文本
            onEditorChange: function ({ editor, html, text }) {
                this.content = html;
            },
            //获取洲列表
            getContinent: function () {
                var _this = this;
                API.request({
                    url: API.selectAllContinent,
                    method: 'post',
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.userId
                    }
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.regionData = e.data.data || [];
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
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.userId
                    },
                    data: API.qs.stringify({
                        continetId: id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.countryData = e.data.data;
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
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.userId
                    },
                    data: API.qs.stringify({
                        countryName: this.exchangeCountry(id)
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.destinatData = e.data.data;
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
                    headers: {
                        token: this.userinfo.token,
                        userId: this.userinfo.userId
                    },
                    data: API.qs.stringify({
                        destinationId: id
                    })
                }).then(function (e) {
                    if (e.data.code == 200) {
                        if (e.data.success) {
                            _this.divingData = e.data.data;
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
            //确定
//            brightSpotHandle: function () {
//                this.Visible = false;
//                this.brightSpot = this.brightSpot.concat(this.data_2);
//            },
            getTravelTime: function (date) {
                this.travelTime = publicFn.dateFormat(date.getTime());
            },
            //id转目的地
            exchangeDestinat: function (id) {
                for (var i = 0, arr = this.destinatData; i < arr.length; i++) {
                    if (arr[i].destinationId == id) {
                        return arr[i].destinationName;
                        break;
                    }
                }
            },
            cancelHandle: function () {
                this.$router.push("/Content")
            },
            //保存
            confirmHandle: function () {
                var _this = this, _subject = this.subject, _fileList = this.fileList, _marineOrganism = this.marineOrganism,
                    _destination = this.form.destinatName,
                    _content = this.content, _brightSpot = this.brightSpot, _divingName = this.form.divingName;
                var _params = {};
                //转换name值
                _destination = this.exchangeDestinat(_destination) || _destination;
                _divingName = this.exchangeDiving(_divingName) || _divingName;
                if (!_subject || _subject.length < 1) {
                    _this.$message.error(API.msg.ERROR_SUBJECT);
                }
                else if (_fileList.length < 1) {
                    _this.$message.error("请上传图片");
                }
                else if (!_divingName) {
                    _this.$message.error("选择潜点");
                }
                else if (!_brightSpot || _brightSpot.length < 1) {
                    _this.$message.error("请输入亮点");
                }
                else if (!_content || _content.length < 1) {
                    _this.$message.error("请输入内容");
                }
                else {
                    //编辑-0
                    _params = {
                        title: _subject,//潜点标题
                        contentId: this.$route.query.id, //索引id
                        diveName: _divingName,//潜点名
                        diveContent: _content,//内容
                        destination: _destination,//目的地
                        brightSpot: _brightSpot.join(','),//亮点
                        marineOrganism: _marineOrganism,//类目
                        image: _fileList[0].url,//图片
                    };
                    //admin端修改潜点详情
                    API.request({
                        url: API.updateDiveContent,
                        method: 'post',
                        headers: {
                            token: this.userinfo.token,
                            userId: this.userinfo.userId
                        },
                        data: API.qs.stringify(_params)
                    }).then(function (e) {
                        if (e.data.code == 200) {
                            if (e.data.success) {
                                _this.$router.push("/Content")
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
    };
</script>

<style scoped>
    .upload-demo > > > .el-upload--text {
        text-align: left;
        border: none;
        width: 100%;
        height: 100%;
    }

    .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 32px;
        padding-top: 0;
        padding-bottom: 0;
    }

    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .card {
        display: inline-block;
        position: relative;
        width: 80px;
        line-height: 1;
        font-size: 12px;
        border-radius: 3px;
        padding: 9px 15px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        margin-right: 10px;
    }

    .card i {
        position: absolute;
        top: -5px;
        right: -5px;
    }

    .el-input {
        /*width: 100%;*/
    }

    .ivu-upload, .ivuVideo-upload {
        display: none;
    }

</style>
