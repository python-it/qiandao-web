"use strict"

export default {
    /* 字典表 */
    getArtitcleClassification: '/admin/1.0.0/articleType/selectTypeList',    //文章分类
    uploadImg: '/admin/1.0.0/file/manage/uploadSingle',   //图片上传
    tagsList: '/admin/1.0.3/tag/allTags',   //文章管理-标签
    justToken: '/admin/1.0.0/access/validateSession',   //验证token是否有效
    adPosition: '/admin/1.0.0/baseAdvert/adList', //广告位字典表
    blesClasList: '/admin/1.0.0/sentiment/senList', //祝福语分类
    /* 权限接口 */
    login: '/admin/1.0.0/login/accessToken',     //登录
    loginOut: '/admin/1.0.0/login/logout',     //注销
    /* 文章管理 */
    artMan_list: '/admin/1.0.0/article/query',  //文章列表
    artMan_del: '/admin/1.0.0/article/delete',  //文章列表-删除
    artMan_update: '/admin/1.0.0/article/addOrUpdate',   //文章列表-新增或编辑
    artMan_detail: '/admin/1.0.0/article/find',  //文章列表详情
    /* 早报管理 */
    artPaper_list: '/admin/1.0.0/morningpaper/query', //早报列表
    artPaper_update: '/admin/1.0.0/morningpaper/addOrUpdate',   //早报列表-新增或编辑
    artPaper_del: '/admin/1.0.0/morningpaper/delete',   //早报列表-删除
    artPaper_detail: '/admin/1.0.0/morningpaper/find',   //早报列表-详情
    /* 文章分类管理 */
    artCla_list: '/admin/1.0.0/articleType/selectTypePageList',  //文章分类-列表
    artCla_del: '/admin/1.0.0/articleType/delete',  //文章分类-删除
    artCla_add: '/admin/1.0.0/articleType/insert',  //文章分类-新增
    artCla_edit: '/admin/1.0.0/articleType/update',  //文章分类-修改
    artCla_detail: '/admin/1.0.0/articleType/info',  //文章分类-详情
    /* 用户管理 */
    ifaMan_list: '/admin/1.0.0/financialUser/getFinancialList',  //用户管理-理财师管理-列表
    ifaMan_detail: '/admin/1.0.0/financialUser/info',  //用户管理-理财师管理-详情
    /* 版本设置 */
    versS_detail: '/admin/1.0.0/version/getAppInfo',   //版本设置-获取
    versS_update: '/admin/1.0.0/version/saveVerion',   //版本设置-保存
    /* 手机号变更查询 */
    phoneA_list: '/admin/1.0.0/userChangeMobile/list',
    /* 数据下载 */
    card_download: '/admin/1.0.0/download/export/mySharecard',
    chapter_download: '/admin/1.0.0/download/export/internal',
    /* 意见反馈 */
    opinion_list: '/admin/1.0.0/feedback/list',
    opinion_detail: '/admin/1.0.0/feedback/info',
    /* 广告管理 */
    adMan_list: '/admin/1.0.0/baseAdvert/list',
    adMan_add: '/admin/1.0.0/baseAdvert/save',
    adMan_edit: '/admin/1.0.0/baseAdvert/update',
    adMan_del: '/admin/1.0.0/baseAdvert/delete',
    adMan_detail: '/admin/1.0.0/baseAdvert/find',
    /* 祝福语管理 */
    blesMan_list: '/admin/1.0.0/sentiment/list',
    blesMan_del: '/admin/1.0.0/sentiment/delete',
    blesMan_add: '/admin/1.0.0/sentiment/save',
    blesMan_edit: '/admin/1.0.0/sentiment/update',
    blesMan_detail: '/admin/1.0.0/sentiment/find',
    /* 生日管理 */
    birthMan_list: '/admin/1.0.0/birthdayManage/list',
    birthMan_del: '/admin/1.0.0/birthdayManage/delete',
    birthMan_add: '/admin/1.0.0/birthdayManage/save',
    birthMan_edit: '/admin/1.0.0/birthdayManage/update',
    birthMan_detail: '/admin/1.0.0/birthdayManage/find',
    /* 节日管理 */
    festivalMan_list: '/admin/1.0.0/holidayManage/list',
    festivalMan_del: '/admin/1.0.0/holidayManage/delete',
    festivalMan_add: '/admin/1.0.0/holidayManage/save',
    festivalMan_edit: '/admin/1.0.0/holidayManage/update',
    festivalMan_detail: '/admin/1.0.0/holidayManage/find',
}