/* 用户管理模块 */

const OpinionBack = () => import('@/pages/opinionBack');
const OpinionBackCheck = () => import('@/pages/opinionBackCheck');
const StaticDownload = () => import('@/pages/staticDownload');

export const statCensus = [
    {
        path: '/opinionback',
        name: 'opinionBack',
        component: OpinionBack,
        meta: {
            title: '意见反馈',
            crumbs: [
                {
                    title: '数据统计',
                    url: null
                }
                ,{
                  title: '意见反馈',
                  url: null
                }
            ]
        }
    }
    ,{
        path: '/opinionback/detail',
        name: 'opinionBackCheck',
        component: OpinionBackCheck,
        meta: {
            title: '意见反馈详情',
            crumbs: [
                {
                    title: '数据统计',
                    url: null
                }
                ,{
                    title: '意见反馈',
                    url: '/opinionback'
                }
                ,{
                  title: '意见反馈详情',
                  url: null
                }
            ]
        }
    }
    ,{
        path: '/staticdown',
        name: 'staticDownload',
        component: StaticDownload,
        meta: {
            title: '数据下载',
            crumbs: [
                {
                    title: '数据统计',
                    url: null
                }
                ,{
                  title: '数据下载',
                  url: null
                }
            ]
        }
    }
]