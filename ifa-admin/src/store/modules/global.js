/* 全局变量 */


const _global = {
    state: {
        // 登陆成功可以进入layout的view-reouter
        viewRouter: false,
        // 登录token,还未加密
        token: null,
        //sidebar激活(比如由一个tab直接跳到另外一个tab的详情页面)
        activeIndex: null,
        //文章预览页面如果屏幕高度不够会产生右侧滚动条，此会和模拟移动显示区域滚动冲突！
        hideTopHeader: false,
        // 个人信息
        personInfo: null,
        // 左侧tab路由
        sideRouter: ''
    },
    getters: {

    },
    mutations: {
        _inView(state){
            state.viewRouter = true;
            state.hideTopHeader = false;
        },
        _outView(state){
            state.viewRouter = false;
        },
        _setToken(state, val){
            state.token = val;
        },
        _setPersonInfo(state, val){
            state.personInfo = val;
        },
        _setSideRouter(state, val){
            state.sideRouter = val;
        },
        _clearToken(state){
            state.token = null;
            state.activeIndex = null;
            state.personInfo = null;
            state.hideTopHeader = false;
            state.sideRouter = '';
        },
        _setSidebar(state, val){
            state.activeIndex = val
        },
        _setTopNavHide(state,val){
            state.hideTopHeader = val;
        }
    },
    actions: {

    }
}

export default _global;