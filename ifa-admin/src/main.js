import App from './App'
import Vue from 'vue'
import axios from 'axios'
import router from './router'
import 'es6-promise/auto'

import "./assets/styles/font.css"
import VueQuillEditor, { Quill } from 'vue-quill-editor'
// import ImageResize from 'quill-image-resize-module'
// import { QuillWatch, ImageExtend } from 'quill-image-extend-module'
import store from './store/store.js'

// import '@/assets/styles/style.css'

// require styles
import 'element-ui/lib/theme-chalk/index.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// import "./assets/styles/font.css";


import ElementUI, { Notification } from 'element-ui'
import '@/assets/styles/style.css'
Vue.use(ElementUI);

//quill编辑器的字体
const fonts = ['Microsoft-YaHei','SimSun', 'SimHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];  
let Font = Quill.import('formats/font');  
Font.whitelist = fonts; //将字体加入到白名单 
Quill.register(Font, true);

// Quill.register('modules/ImageExtend', ImageExtend);
// Quill.register('modules/imageResize', ImageResize);
Vue.use(VueQuillEditor, {
    theme: 'snow',
    modules: {
        // ImageExtend: {
        //     loading: true,
        //     name: 'img',
        //     action: '/admin/1.0.0/file/manage/uploadSingle',
        //     response: (res) => {
        //         console.log(res);
        //       return res.info
        //     },
        // },
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'font': fonts}],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['clean'],
                ['link', 'image']
            ]
        },
        // handlers: {
        //     'image': function () {  // 劫持原来的图片点击按钮事件
        //         QuillWatch.emit(this.quill.id)
        //     }
        // },
        // imageResize: {
        //     displayStyles: {
        //       backgroundColor: 'black',
        //       border: 'none',
        //       color: 'white'
        //     },
        //     modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        // }
    },
    placeholder: '100000字以内'
});
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

router.beforeEach((to, from, next) => {
    /* 路由切换时，自动回滚位置 */
    // if(document.querySelector('#viewWraper')){
    //     document.querySelector('#viewWraper').style.opacity = 0;
    //     document.querySelector('#viewWraper').scrollTop = 0;
    //     document.querySelector('#viewWraper').style.opacity = 1;
    // };
    /* 定义变量 */
    const _view = store.state._global.viewRouter;
    const _token = store.state._global.token;
    const _vuex = window.localStorage.getItem('PERSIST');
    const _cache = store.state._global.sideRouter;
    // const _curactive = store.state._global.activeIndex;
    document.title = to.meta.title;
    /* 无效路由 */
    if(to.name == null){
        const _array = new Array();
        store.commit("_setSideRouter", JSON.stringify(_array));
        setTimeout(()=>{
            store.commit("_setSideRouter", _cache);
            next({path: "/"});
            return;
        },50);
    };
    /* 当持久化vuex被恶意清除或登录注销后前往登陆，token验证做到axios拦截器里面 */
    if(to.path != "/login"){
        if(!_vuex || !_view || _token == null) {
            if(!_view){
                store.commit("_outView");
            };
            store.commit("_clearToken");
            if(to.path == '/'){
                next({path: "/login"});
                return;
            }else{
                Notification({
                    title: '错误',
                    type: 'error',
                    message: '登录失效，即将前往登录',
                    duration: 2000,
                    onClose: () => {
                        next({path: "/login"});
                        /* return跳出是必须的 */
                        return;
                    }
                });
            }
        }else{
            if(to.path == '/'){
                store.commit("_setSidebar", null);
            }else{
                let activeIndex = to.path.split("/")[1];
                store.commit("_setSidebar", `/${activeIndex}`);
            };
            next();
            return;
        }
    }else{
        store.commit("_outView");
        next();
        return;
    };
});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});