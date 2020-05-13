import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/User'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {
                title: '自述文件'
            },
            children: [{
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: {
                        title: '系统首页'
                    }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: {
                        title: '自定义图标'
                    }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: {
                        title: '基础表格'
                    }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: {
                        title: 'tab选项卡'
                    }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: {
                        title: '基本表单'
                    }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: {
                        title: '富文本编辑器'
                    }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: {
                        title: 'markdown编辑器'
                    }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: {
                        title: '文件上传'
                    }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: {
                        title: 'schart图表'
                    }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: {
                        title: '拖拽列表'
                    }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: {
                        title: '权限测试',
                        permission: true
                    }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: {
                        title: '404'
                    }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: {
                        title: '403'
                    }
                },

                //gw
                {
                    path: '/User',
                    component: resolve => require(['../components/page/gw/User.vue'], resolve),
                    meta: {
                        title: '用户管理'
                    }
                },
                {
                    path: '/Noticelist',
                    component: resolve => require(['../components/page/gw/Noticelist.vue'], resolve),
                    meta: {
                        title: '通知列表'
                    }
                },
                {
                    path: '/Notice',
                    component: resolve => require(['../components/page/gw/Notice.vue'], resolve),
                    meta: {
                        title: '用户通知'
                    }
                },
                {
                    path: '/Merchant',
                    component: resolve => require(['../components/page/gw/Merchant.vue'], resolve),
                    meta: {
                        title: '商家管理'
                    }
                },
                {
                    path: '/MerchantDetails',
                    component: resolve => require(['../components/page/gw/MerchantDetails.vue'], resolve),
                    meta: {
                        title: '商家详细'
                    }
                },
                {
                    path: '/Destination_0',
                    component: resolve => require(['../components/page/gw/Destination.vue'], resolve),
                    meta: {
                        title: '目的地管理'
                    }
                },
                {
                    path: '/Label',
                    component: resolve => require(['../components/page/gw/Label.vue'], resolve),
                    meta: {
                        title: '标签管理'
                    }
                },
                {
                    path: '/Content',
                    component: resolve => require(['../components/page/gw/Content.vue'], resolve),
                    meta: {
                        title: '内容管理'
                    }
                },
                {
                    path: '/AddContent',
                    component: resolve => require(['../components/page/gw/AddContent.vue'], resolve),
                    meta: {
                        title: '内容添加'
                    }
                },
                {
                    path: '/Advert',
                    component: resolve => require(['../components/page/gw/Advert.vue'], resolve),
                    meta: {
                        title: '广告管理'
                    }
                }, {
                    path: '/AddAdvert',
                    component: resolve => require(['../components/page/gw/AddAdvert.vue'], resolve),
                    meta: {
                        title: '添加/编辑广告'
                    }
                },
                //zxw
                {
                    path: '/system',
                    component: resolve => require(['../components/page/zxw/system.vue'], resolve),
                    meta: { title: '管理员设置' }
                },
                {
                    path: '/power',
                    component: resolve => require(['../components/page/zxw/power.vue'], resolve),
                    meta: { title: '权限设置' }
                },
                {
                    path: '/hotSearch',
                    component: resolve => require(['../components/page/zxw/hotSearch.vue'], resolve),
                    meta: { title: '热搜设置' }
                },
                {
                    path: '/country',
                    component: resolve => require(['../components/page/zxw/country.vue'], resolve),
                    meta: { title: '国家选择项' }
                },
                {
                    path: '/dringManagement',
                    component: resolve => require(['../components/page/zxw/dringManagement.vue'], resolve),
                    meta: { title: '潜点管理' }
                },
                {
                    path: '/iconSelect',
                    component: resolve => require(['../components/page/zxw/iconSelect.vue'], resolve),
                    meta: { title: '标签类目选择项' }
                },
                {
                    path: '/shopManagement',
                    component: resolve => require(['../components/page/zxw/shopManagement.vue'], resolve),
                    meta: { title: '商家管理细分编辑' }
                },
                {
                    path: '/userInfo',
                    component: resolve => require(['../components/page/zxw/userInfo.vue'], resolve),
                    meta: { title: '用户信息分类' }
                },
                {
                    path: '/Destination',
                    component: resolve => require(['../components/page/zxw/Destination.vue'], resolve),
                    meta: { title: '目的地管理细分编辑' }
                },
                {
                    path: '/containManage',
                    component: resolve => require(['../components/page/zxw/containManage.vue'], resolve),
                    meta: { title: '内容管理定义编辑' }
                },
                {
                    path: '/dataStatistics',
                    component: resolve => require(['../components/page/zxw/dataStatistics.vue'], resolve),
                    meta: { title: '数据统计' }
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/zxw/feedback.vue'], resolve),
                    meta: { title: '反馈管理' }
                },






            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
