export const asyncRouter = [
    {
        path: '/organization',
        name: 'organization',
        component: () => import('@src/views/organization-system/organization/organizationChart'),
        meta: {
            title: '组织架构'
        }
    },
    {
        path: '/organizemanage',
        name: 'organizemanage',
        component: () => import('@src/views/organization-system/organization/organizationManage'),
        meta: {
            title: '组织管理'
        }
    },
    {
        path: '/orhistory',
        name: 'orhistory',
        component: () => import('@src/views/organization-system/organization/orHistory'),
        meta: {
            title: '历史架构'
        }
    },
    {
        path: '/jobcategory',
        name: 'jobcategory',
        component: () => import('@src/views/organization-system/jobCategory/jobCategories'),
        meta: {
            title: '职位类别'
        }
    },
    {
        path: '/postmanage',
        name: 'postmanage',
        component: () => import('@src/views/organization-system/postManage/postManage'),
        meta: {
            title: '岗位管理'
        }
    },
    {
        path: '/developmanage',
        name: 'developmanage',
        component: () => import('@src/views/organization-system/developmentManage/developManage'),
        meta: {
            title: '发展管理'
        }
    },
    {
        path: '/roster',
        name: 'roster',
        component: () => import('@src/views/staffmanage/roster'),
        meta: {
            title: '员工花名册'
        }
    },
    {
        path: '/personinfo/:workCode',
        name: 'personinfo',
        component: () => import('@src/views/staffmanage/personinfo'),
        meta: {
            title: '个人详情'
        }
    },
    {
        path: '/employeerela',
        name: 'employeerela',
        redirect: 'entrymanage',
        component: () => import('@src/views/staffmanage/employeerela'),
        children: [
            {
                path: '/entrymanage',
                name: 'entrymanage',
                component: () => import('@src/views/staffmanage/relation/entrymanage'),
                meta: {
                    title: '入职管理'
                }
            },
            {
                path: '/fullmanage',
                name: 'fullmanage',
                component: () => import('@src/views/staffmanage/relation/fullmanage'),
                meta: {
                    title: '转正管理'
                }
            },
            {
                path: '/exitmanage',
                name: 'exitmanage',
                component: () => import('@src/views/staffmanage/relation/exitmanage'),
                meta: {
                    title: '离职管理'
                }
            },
            {
                path: '/translatemanage',
                name: 'translatemanage',
                component: () => import('@src/views/staffmanage/relation/translatemanage'),
                meta: {
                    title: '异动管理'
                }
            }
        ]
    },
    {
        path: '/basicsetting',
        component: () => import('@src/views/basic-setting'),
        children: [
            {
                path: '',
                name: 'config',
                component: () => import('@src/views/basic-setting/config'),
                meta: {
                    title: '基础配置'
                }
            },
            {
                path: 'workcity',
                name: 'workcity',
                component: () => import('@src/views/basic-setting/work-city'),
                meta: {
                    title: '工作城市'
                }
            },
            {
                path: 'employ',
                name: 'employ',
                component: () => import('@src/views/basic-setting/employ'),
                meta: {
                    title: '雇佣类型'
                }
            },
            {
                path: 'contract',
                name: 'contract',
                component: () => import('@src/views/basic-setting/contract'),
                meta: {
                    title: '合同签署公司'
                }
            },
            {
                path: 'workcode',
                name: 'workcode',
                component: () => import('@src/views/basic-setting/work-code'),
                meta: {
                    title: '工号规则'
                }
            },
            {
                path: 'data',
                name: 'data',
                component: () => import('@src/views/basic-setting/data'),
                meta: {
                    title: '数据同步规则'
                }
            }
        ]
    },
    {
        path: '/api',
        name: 'api',
        component: () => import('@src/views/synchrodata/api'),
        meta: {
            title: '同步接口'
        }
    },
    {
        path: '/log',
        name: 'log',
        component: () => import('@src/views/synchrodata/log'),
        meta: {
            title: '同步日志'
        }
    }
];
export const routes = [{
    path: '/',
    name: 'Layout',
    redirect: '/roster',
    component: () => import('@src/layout/index')
}]

