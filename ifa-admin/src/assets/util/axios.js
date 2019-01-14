import axios from 'axios'
import QS from 'qs'
import store from '@/store/store.js'
import router from '@/router'
import { Notification } from 'element-ui';

/* axios默认配置 */
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'https://testtechapp.unifgroup.com';  
    // axios.defaults.baseURL = 'http://192.168.0.183:5580';  
} else if (process.env.NODE_ENV == 'debug') {
    // axios.defaults.baseURL = 'http://192.168.0.29:5580';  
} else if (process.env.NODE_ENV == 'production') {
    // axios.defaults.baseURL = 'https://testtechapp.unifgroup.com';  
    axios.defaults.baseURL = 'https://ifapre.unifgroup.com';  
    // axios.defaults.baseURL = 'https://ifa.unifgroup.com';  
}

// axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
// axios.defaults.headers.common['token'] = store.state._global.token;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* 本列ajax公用封装 */
const toLogin = ()=>{ // 登录
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
};
const _timeout = 2000;  //提示消失时间
const _version = { //接口版本号
    // v: Date.parse(new Date())
};


// 1.请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const _token = store.state._global.token;
        _token && (config.headers.token = _token);
        // config.headers['access-control-allow-origin'] = '*';
        // console.log(config)
        return config;
    },
    error => {
        return Promise.error(error);
    }
);
// 2.响应拦截器
axios.interceptors.response.use(
    response => {
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
        // 否则的话抛出错误

        if (response.status === 200) {
            /* 下载流单独处理 */
            if(router.currentRoute.fullPath == '/staticdown'){
                if(response.headers.code  == 0){
                    return Promise.resolve(response);
                }else{
                    Notification({
                        title: '提示',
                        type: 'error',
                        message: '未登录！',
                        duration: _timeout,
                        onClose: () => {
                            toLogin();
                        }
                    });
                    return Promise.reject(response);
                }
            };

            switch (response.data.code) {
                /* 401: 未登录 */
                case 0:
                    return Promise.resolve(response);
                    break;
                case 1:
                    Notification({
                        title: '提示',
                        type: 'error',
                        message: response.data.desc,
                        duration: _timeout,
                        onClose: () => {
                            toLogin();
                        }
                    });
                    return Promise.reject(response);
                default:
                    Notification({
                        title: '提示',
                        type: 'error',
                        message: response.data.desc,
                        duration: _timeout,
                        onClose: () => {}
                    });
                    return Promise.reject(response);
                    break;
            }
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的的情况, 约定统一的错误状态码
    error => {
        if (error.response.status) { //这个层级不用改变
            switch (error.response.status) {
                case 404:
                    Notification({
                        title: '提示',
                        type: 'error',
                        message: '网络请求错误',
                        duration: _timeout,
                        onClose: () => {}
                    });
                    break;
                /* 其他错误，直接抛出错误提示 */
                default:
                    Notification({
                        title: '提示',
                        type: 'error',
                        message: error.response.data.message,
                        duration: _timeout,
                        onClose: () => {}
                    });
                    break;
            };
            return Promise.reject(error.response);
        }
    }
);

/** 
 * $ajax封装 
 * @param {String} type [请求类型] 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */

const $ajax = (type="get", url, params={}, setting)=>{
    return new Promise((resolve, reject) => {
        switch (type.toLowerCase()) {
            case 'post':
                // axios.post(url, QS.stringify(Object.assign(params,_version))).then(res => {
                //     resolve(res.data);
                // }).catch(err =>{
                //     reject(err.data);
                // });
                axios.post(url, JSON.stringify(Object.assign(params, _version)), setting).then(res => {
                    if(router.currentRoute.fullPath == '/staticdown'){
                        resolve(res);
                    }else{
                        resolve(res.data);
                    };
                }).catch(err =>{
                    reject(err.data);
                });
                break;
            default:
                /* 禁止IE缓存 */
                axios.get(url, {params: Object.assign(params,_version,{v: Date.parse(new Date())})}).then(res => {
                    resolve(res.data);
                }).catch(err =>{
                    reject(err.data);
                });
                break;
        }
        
   });
};
export default $ajax;


