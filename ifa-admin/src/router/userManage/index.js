/* 用户管理模块 */

const IfaManage = () => import('@/pages/ifaManage');
const IfaManageCheck = () => import('@/pages/ifaManageCheck');
const PhoneAlter = () => import('@/pages/phoneAlter');

export const userManage = [
    {
        path: '/usermanage',
        name: 'ifaManage',
        component: IfaManage,
        meta: {
            title: '理财师管理',
            crumbs: [
                {
                    title: '用户管理',
                    url: null
                }
                ,{
                  title: '理财师管理',
                  url: null
                }
            ]
        }
    }
    ,{
        path: '/usermanage/detail',
        name: 'ifaManageCheck',
        component: IfaManageCheck,
        meta: {
            title: '理财师详情',
            crumbs: [
                {
                    title: '用户管理',
                    url: null
                }
                ,{
                    title: '理财师管理',
                    url: '/usermanage'
                }
                ,{
                  title: '理财师详情',
                  url: null
                }
            ]
        }
    }
    ,{
        path: '/phonealter',
        name: 'phoneAlter',
        component: PhoneAlter,
        meta: {
            title: '手机号变更',
            crumbs: [
                {
                    title: '用户管理',
                    url: null
                }
                ,{
                  title: '手机号变更',
                  url: null
                }
            ]
        }
    }
]