/* 内容运营模块 */

const ArticleClassify = () => import('@/pages/articleClassify');
const ArticleManage = () => import('@/pages/articleManage');
const ArticlePaper = () => import('@/pages/articlePaper');

// 1.文章分类
const ArtClasAdd = () => import('@/pages/artClasAdd');
const ArtClasEdit = () => import('@/pages/artClasEdit');
// 2.文章管理
const ArtManAdd = () => import('@/pages/artManAdd');
const ArtManEdit = () => import('@/pages/artManEdit');
const ArtManDetail = () => import('@/pages/artManDetail');
const ArtManMoDetail = () => import('@/pages/artManMoDetail');
//3.早报管理
const ArticlePapAdd = () => import('@/pages/articlePapAdd');
const ArticlePapEdit = () => import('@/pages/articlePapEdit');
const ArticlePapDetail = () => import('@/pages/articlePapDetail');
const ArticlePapMoDetail = () => import('@/pages/articlePapMoDetail');
//4.广告管理
const AdManage = () => import('@/pages/adManage');
const AdAdd = () => import('@/pages/adAdd');
const AdEdit = () => import('@/pages/adEdit');
const AdDetail = () => import('@/pages/adCheck');
//5.祝福语管理
const BlessingManage = () => import('@/pages/blessingManage');
const BlessingManAdd = () => import('@/pages/blessingManAdd');
const BlessingManEdit = () => import('@/pages/blessingManEdit');
const BlessingManDetail = () => import('@/pages/blessingManDetail');
//6.生日管理
const BirthManage = () => import('@/pages/birthManage');
const BirthManageAdd = () => import('@/pages/birthManageAdd');
const BirthManageEdit = () => import('@/pages/birthManageEdit');
const BirthManageDetail = () => import('@/pages/birthManageDetail');
//7.节日管理
const FestivalManage = () => import('@/pages/festivalManage');
const FestivalManageAdd = () => import('@/pages/festivalManageAdd');
const FestivalManageEdit = () => import('@/pages/festivalManageEdit');
const FestivalManageDetail = () => import('@/pages/festivalManageDetail');

export const contOperaton = [
    {
        path: '/artclassify',
        name: 'articleClassify',
        component: ArticleClassify,
        meta: {
            title: '文章分类管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "文章分类管理"
                }
            ]
        }
    }
    ,{
        path: '/artmanage',
        name: 'articleManage',
        component: ArticleManage,
        meta: {
            title: '文章管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "文章管理"
                }
            ]
        }
    }
    ,{
        path: '/mornpaper',
        name: 'articlePaper',
        component: ArticlePaper,
        meta: {
            title: '早报管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "早报管理"
                }
            ]
        }
    }
    ,{
        path: '/artclassify/add',
        name: 'artClasAdd',
        component: ArtClasAdd,
        meta: {
            title: '新增分类',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/artclassify',
                    title: "文章分类管理"
                }
                ,{
                    url: null,
                    title: "新增分类"
                }
            ]
        }
    }
    ,{
        path: '/artclassify/edit',
        name: 'artClasEdit',
        component: ArtClasEdit,
        meta: {
            title: '修改分类',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/artclassify',
                    title: "文章分类管理"
                }
                ,{
                    url: null,
                    title: "修改分类"
                }
            ]
        }
    }
    ,{
        path: '/artmanage/add',
        name: 'artManAdd',
        component: ArtManAdd,
        meta: {
            title: '新增文章',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/artmanage',
                    title: "文章管理"
                }
                ,{
                    url: null,
                    title: "新增文章"
                }
            ],
            hideNav: true
        }
    }
    ,{
        path: '/artmanage/edit',
        name: 'artManEdit',
        component: ArtManEdit,
        meta: {
            title: '修改文章',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/artmanage',
                    title: "文章管理"
                }
                ,{
                    url: null,
                    title: "修改文章"
                }
            ],
            hideNav: true
        }
    }
    ,{
        path: '/artmanage/detail',
        name: 'artManDetail',
        component: ArtManDetail,
        meta: {
            title: '查看文章',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/artmanage',
                    title: "文章管理"
                }
                ,{
                    url: null,
                    title: "查看文章"
                }
            ]
        }
    }
    ,{
        path: '/artmanage/modetail',
        name: 'artManMoDetail',
        component: ArtManMoDetail,
        meta: {
            title: '文章预览',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/artmanage',
                    title: "文章管理"
                }
                ,{
                    url: null,
                    title: "文章预览"
                }
            ]
        }
    }
    ,{
        path: '/mornpaper/add',
        name: 'articlePapAdd',
        component: ArticlePapAdd,
        meta: {
            title: '新增早报',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/mornpaper',
                    title: "早报管理"
                },
                {
                    url: null,
                    title: "新增早报"
                }
            ],
            hideNav: true
        }
    }
    ,{
        path: '/mornpaper/edit',
        name: 'articlePapEdit',
        component: ArticlePapEdit,
        meta: {
            title: '修改早报',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/mornpaper',
                    title: "早报管理"
                },
                {
                    url: null,
                    title: "修改早报"
                }
            ],
            hideNav: true
        }
    }
    ,{
        path: '/mornpaper/detail',
        name: 'articlePapDetail',
        component: ArticlePapDetail,
        meta: {
            title: '查看早报',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/mornpaper',
                    title: "早报管理"
                },
                {
                    url: null,
                    title: "查看早报"
                }
            ]
        }
    }
    ,{
        path: '/mornpaper/modetail',
        name: 'articlePapMoDetail',
        component: ArticlePapMoDetail,
        meta: {
            title: '早报预览',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/mornpaper',
                    title: "早报管理"
                },
                {
                    url: null,
                    title: "早报预览"
                }
            ]
        }
    }
    ,{
        path: '/admanage',
        name: 'adManage',
        component: AdManage,
        meta: {
            title: '广告管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "广告管理"
                }
            ]
        }
    }
    ,{
        path: '/admanage/add',
        name: 'adAdd',
        component: AdAdd,
        meta: {
            title: '新增广告',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/admanage',
                    title: "广告管理"
                }
                ,{
                    url: null,
                    title: "新增广告"
                }
            ]
        }
    }
    ,{
        path: '/admanage/edit',
        name: 'adEdit',
        component: AdEdit,
        meta: {
            title: '修改广告',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/admanage',
                    title: "广告管理"
                }
                ,{
                    url: null,
                    title: "修改广告"
                }
            ]
        }
    }
    ,{
        path: '/admanage/detail',
        name: 'adCheck',
        component: AdDetail,
        meta: {
            title: '查看广告',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/admanage',
                    title: "广告管理"
                }
                ,{
                    url: null,
                    title: "查看广告"
                }
            ]
        }
    }
    ,{
        path: '/blesmanage',
        name: 'blessingManage',
        component: BlessingManage,
        meta: {
            title: '祝福语管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "祝福语管理"
                }
            ]
        }
    }
    ,{
        path: '/blesmanage/add',
        name: 'blessingManAdd',
        component: BlessingManAdd,
        meta: {
            title: '新增祝福语',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/blesmanage',
                    title: "祝福语管理"
                },
                {
                    url: null,
                    title: "新增祝福语"
                }
            ],
            hideNav: true
        }
    }
    ,{
        path: '/blesmanage/edit',
        name: 'blessingManEdit',
        component: BlessingManEdit,
        meta: {
            title: '修改祝福语',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/blesmanage',
                    title: "祝福语管理"
                },
                {
                    url: null,
                    title: "修改祝福语"
                }
            ],
            hideNav: true
        }
    }
    ,{
        path: '/blesmanage/detail',
        name: 'blessingManDetail',
        component: BlessingManDetail,
        meta: {
            title: '查看祝福语',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/blesmanage',
                    title: "祝福语管理"
                },
                {
                    url: null,
                    title: "查看祝福语"
                }
            ]
        }
    }
    ,{
        path: '/birthmanage',
        name: 'birthManage',
        component: BirthManage,
        meta: {
            title: '生日管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "生日管理"
                }
            ]
        }
    }
    ,{
        path: '/birthmanage/add',
        name: 'birthManageAdd',
        component: BirthManageAdd,
        meta: {
            title: '新增生日',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/blesmanage',
                    title: "生日管理"
                },
                {
                    url: null,
                    title: "新增生日"
                }
            ]
        }
    }
    ,{
        path: '/birthmanage/edit',
        name: 'birthManageEdit',
        component: BirthManageEdit,
        meta: {
            title: '修改生日',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/blesmanage',
                    title: "生日管理"
                },
                {
                    url: null,
                    title: "修改生日"
                }
            ]
        }
    }
    ,{
        path: '/birthmanage/detail',
        name: 'birthManageDetail',
        component: BirthManageDetail,
        meta: {
            title: '查看生日',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/blesmanage',
                    title: "生日管理"
                },
                {
                    url: null,
                    title: "查看生日"
                }
            ]
        }
    }
    ,{
        path: '/festmanage',
        name: 'festivalManage',
        component: FestivalManage,
        meta: {
            title: '节日管理',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: null,
                    title: "节日管理"
                }
            ]
        }
    }
    ,{
        path: '/festmanage/add',
        name: 'festivalManageAdd',
        component: FestivalManageAdd,
        meta: {
            title: '新增节日',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/festmanage',
                    title: "节日管理"
                },
                {
                    url: null,
                    title: "新增节日"
                }
            ]
        }
    }
    ,{
        path: '/festmanage/edit',
        name: 'festivalManageEdit',
        component: FestivalManageEdit,
        meta: {
            title: '修改节日',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/festmanage',
                    title: "节日管理"
                },
                {
                    url: null,
                    title: "修改节日"
                }
            ]
        }
    }
    ,{
        path: '/festmanage/detail',
        name: 'festivalManageDetail',
        component: FestivalManageDetail,
        meta: {
            title: '查看节日',
            crumbs: [
                {
                    url: null,
                    title: "内容运营"
                },
                {
                    url: '/festmanage',
                    title: "节日管理"
                },
                {
                    url: null,
                    title: "查看节日"
                }
            ]
        }
    }
]