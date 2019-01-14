import api from '@/assets/http/api/l_api.js'
import $ajax from '@/assets/util/axios.js'


// 延迟时间
const _TO = 2000;
const _HM = '操作成功!';
// 初始路由
// const _FR = store.state._global.firstRouter;
/* 双击事件 */
const _ListeningClick = (vm)=>{
    let timeout = setTimeout(()=>{
        vm.DISABLED = false;
        clearTimeout(timeout);
    },1000);
}

/**
 *
 *
 * @文章分类-字典表
 * @param {*} params
 * @returns
 */
export function getArtitcleClassification(params){
    let _this = this;
    $ajax('get', api.getArtitcleClassification, params).then(res=>{
        let _data = res.data;
        _this.dictionaryTable.chapterList = _data.list;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @广告位-字典表
 * @param {*} params
 * @returns
 */
export function getAdPositionList(params){
    let _this = this;
    $ajax('get', api.adPosition, params).then(res=>{
        let _data = res.data;
        _this.dictionaryTable.adList = _data.list;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @祝福语分类-字典表
 * @param {*} params
 * @returns
 */
export function getblessingClasList(params){
    let _this = this;
    $ajax('get', api.blesClasList, params).then(res=>{
        let _data = res.data;
        _this.dictionaryTable.clasList = _data.list;
    }).catch(err=>{
        // console.log(err);
    });
};


/**
 *
 * 标签列表
 * @export 
 * @param {*} params
 */
export function getTagsList(params){
    let _this = this;
    $ajax('get', api.tagsList, params).then(res=>{
        let _data = res.data;
        this.dictionaryTable.tagsList = _data.list;
    }).catch(err=>{
        // console.log(err);
    });
};


/**
 *登录login
 *@param {Object} params [请求时携带的参数]
 */
export function login(params){
    let _this = this;
    if(params.account == "" || params.password == ""){
        _this.$notify({
            title: '警告',
            duration: _TO,
            message: '用户名或密码不正确！',
            type: 'warning'
        });
        return;
    };
    $ajax('post', api.login, params).then(res=>{
        // console.log(res);
        _this.$notify({
            title: '提示',
            duration: _TO,
            message: '登录成功！',
            type: 'success',
            onClose: ()=> {
                _ListeningClick(_this);
                _this._setToken(res.token);
                _this._setPersonInfo(JSON.stringify({
                    'name': res.data.name,
                    'account': res.data.account,
                    'avatar': res.data.avatar
                }));
                _this._setSideRouter(JSON.stringify(res.data.modules));
                _this._inView();
                _this.$router.replace({
                    path: "/"
                });
            }
        });
    }).catch(err=>{
        _ListeningClick(_this);
    });
};


/**
 *
 *
 * @注销
 * @param {*} params
 * @returns
 */
export function loginOut(params){
    let _this = this;
    $ajax('post', api.loginOut, params).then(res=>{
        _this.$notify({
            title: '提示',
            duration: _TO,
            message: '注销成功！',
            type: 'success',
            onClose: ()=>{
                _this._clearToken();
                _this._outView();
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace({
                    path: "/login"
                });
            }
        });
    }).catch(err=>{
        _ListeningClick(_this);
    });
};


/**
 *
 *
 * @文章管理-列表
 * @param {*} params
 * @returns
 */
export function articleList(params){
    let _this = this;
    $ajax('get', api.artMan_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @文章管理-删除
 * @param {*} params
 */
export function delArticle(params){
    let _this = this;
    $ajax('post', api.artMan_del, params).then(res=>{
        this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                this.getArticleList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @文章管理-新增
 * @param {*} params
 */
export function updateArticle(params){
    let [_this,  _params] = [this, Object.assign({},params)];
    delete _params.fileList;
    _params.img = params.fileList[0].url;
    if(_params.isOriginal && _params.status){
        $ajax('post', api.artMan_update, _params).then(res=>{
            _this.$message({
                type: 'success',
                message: _HM,
                duration: _TO,
                onClose: ()=>{
                    //按钮双击事件
                    _ListeningClick(_this);
                    _this.$router.replace("/artmanage");
                }
            });
        }).catch(err=>{
            //按钮双击事件
            _ListeningClick(_this);
        });
    }    
};

/**
 *
 *
 * @文章管理-详情
 * @param {*} params
 */
export function getArtDetail(params){
    let _this = this;
    $ajax('get', api.artMan_detail, params).then(res=>{
        let _data = res.data;
        // let _imgPath =  (_data.img.split('/')[_data.img.split('/').length-1]).split('\\')[1];
        let _imgPath =  _data.img.split('/')[_data.img.split('/').length-1];
        _data.fileList = [{
            url: _data.img,
            name: _imgPath ? _imgPath : '未知'
        }];
        _data.category = parseInt(_data.category);
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};


/**
 *
 *
 * @artPaperList--早报列表
 * @param {*} params
 */
export function artPaperList(params){
    let _this = this;
    $ajax('get', api.artPaper_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @早报管理-新增
 * @param {*} params
 */
export function updateArtPaper(params){
    let [_this,  _params] = [this, Object.assign({},params)];
    delete _params.fileList;
    // _params.img = params.fileList[0].url;
    $ajax('post', api.artPaper_update, _params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace("/mornpaper");
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
        // console.log(err);
    });
};

/**
 *
 *
 * @早报管理-删除
 * @param {*} params
 */
export function delArtPaper(params){
    let _this = this;
    $ajax('post', api.artPaper_del, params).then(res=>{
        this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                this.getArtPaperList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @早报管理-详情
 * @param {*} params
 */
export function getArtPaperDetail(params){
    let _this = this;
    $ajax('get', api.artPaper_detail, params).then(res=>{
        let _data = res.data;
        // let _imgPath =  (_data.img.split('/')[_data.img.split('/').length-1]).split('\\')[1];
        // _data.fileList = [{
        //     url: _data.img,
        //     name: _imgPath ? _imgPath : '未知'
        // }];
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};


/**
 *
 *
 * @文章分类-列表
 * @param {*} params
 */
export function artClasList(params){
    let _this = this;
    $ajax('get', api.artCla_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @文章分类-删除
 * @param {*} params
 */
export function artClasDel(params){
    let _this = this;
    $ajax('get', api.artCla_del, params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                _this.getArtClasList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};


/**
 *
 *
 * @文章分类-新增/编辑
 * @param {*} params
 */
export function artClasUpdate(params){
    let _this = this;
    let _apiUrl = api.artCla_add;
    if(_this.$route.query.id){
        _apiUrl = api.artCla_edit;
    }
    $ajax('post', _apiUrl, params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace("/artclassify");
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
        // console.log(err);
    });
};


/**
 *
 *
 * @文章管理-详情
 * @param {*} params
 */
export function artClasDetail(params){
    let _this = this;
    $ajax('get', api.artCla_detail, params).then(res=>{
        let _data = res.data;
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};


/**
 *
 *
 * @理财师管理-列表
 * @param {*} params
 */
export function ifaManList(params){
    let _this = this;
    $ajax('get', api.ifaMan_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @理财师管理-详情
 * @param {*} params
 */
export function ifaManDetail(params){
    let _this = this;
    $ajax('get', api.ifaMan_detail, params).then(res=>{
        let _data = res.data;
        if(_data.avatar == '' || _data.avatar == null || !_data.avatar){
            _data.avatar = _this.defaultPic;
        };
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @版本设置-获取
 * @param {*} params
 */
export function versionSetGet(params){
    let _this = this;
    $ajax('get', api.versS_detail, params).then(res=>{
       let _data = res.data;
       if(!params.appType){
        _this.activeTab = _data.appType;
       };
       _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @版本设置-保存
 * @param {*} params
 */
export function versionSetUpdate(params){
    let _this = this;
    let _params = Object.assign({},params,{'appType': _this.type});
    $ajax('post', api.versS_update, _params).then(res=>{
        _this.$message({
            type: 'success',
            message: '保存成功！',
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
        // console.log(err);
    });
};

/**
 *
 *
 * @手机号变更查询-列表
 * @param {*} params
 */
export function getPhoneAlterList(params){
    let _this = this;
    $ajax('get', api.phoneA_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @数据下载-列表
 * @param {*} params
 */
export function staticDownload(params){
    /* 验证token是否有效 */
    let [_this, _url] = [this, api.chapter_download];
    if(params.type == 'card'){
        _url = api.card_download;
    };
    $ajax('post', _url, params, {responseType: 'arraybuffer'}).then(res =>{
        let disposition = res.headers['content-disposition'];
        let filename = decodeURI(disposition.match(/filename=(\S*).xlsx/)[1]);
        // let filename = decodeURI((disposition.match(/filename=.*?\./)[0]).replace('filename=','').replace('.',''));
        _this.fileDownload(res.data, filename);
        let timeout = setTimeout(()=>{
            _this[`DISABLED_${params.type}`] = false;
            clearTimeout(timeout);
        },1000);
    }).catch(err=>{
        let timeout = setTimeout(()=>{
            _this[`DISABLED_${params.type}`] = false;
            clearTimeout(timeout);
        },1000);
    });
};


/**
 *
 *
 * @意见反馈-列表
 * @param {*} params
 */
export function getOpinionList(params){
    let _this = this;
    $ajax('get', api.opinion_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @意见反馈-详情
 * @param {*} params
 */
export function opinionDetail(params){
    let _this = this;
    $ajax('get', api.opinion_detail, params).then(res=>{
        let _data = res.data;
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @广告管理-列表
 * @param {*} params
 */
export function getAdManageList(params){
    let _this = this;
    $ajax('get', api.adMan_list, params).then(res=>{
        let _data = res.data;
        params.totalCount = _data.totalCount;
        params.maxAvailableNum = _data.maxAvailableNum;
        _this.tableData = _data.list;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @广告管理-新增/修改
 * @param {*} params
 */
export function adUpdate(params){
    let [_this,  _url, _params] = [this, api.adMan_add, Object.assign({},params)];
    if(_this.$route.query.id){
        _url = api.adMan_edit;
    };
    _params.adImg = _params.fileList[0].url;
    delete _params.fileList;
    $ajax('post', _url, _params).then(res=>{
        _this.$message({
            type: 'success',
            message: '保存成功！',
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace("/admanage");
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
        // console.log(err);
    });
};

/**
 *
 *
 * @广告管理-详情
 * @param {*} params
 */
export function getAdManageDetail(params){
    let _this = this;
    $ajax('get', api.adMan_detail, params).then(res=>{
        let _data = res.data;
        let _imgPath =  (_data.adImg).split('/')[_data.adImg.split('/').length-1];
        _data.fileList = [{
            url: _data.adImg,
            name: _imgPath ? _imgPath : '未知'
        }];
        // delete _data.adPosition;
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @广告管理-删除
 * @param {*} params
 */
export function adManageDel(params){
    let _this = this;
    $ajax('get', api.adMan_del, params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                _this.getAdList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @祝福语管理-列表
 * @param {*} params
 */
export function getBlessingManaList(params){
    let _this = this;
    $ajax('get', api.blesMan_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @祝福语管理-删除
 * @param {*} params
 */
export function getBlessingManaDel(params){
    let _this = this;
    $ajax('get', api.blesMan_del, params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                _this.getBlesList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @祝福语管理-新增/修改
 * @param {*} params
 */
export function blessingUpdate(params){
    let [_this,  _url] = [this, api.blesMan_add];
    if(_this.$route.query.id){
        _url = api.blesMan_edit;
    };
    $ajax('post', _url, params).then(res=>{
        _this.$message({
            type: 'success',
            message: '保存成功！',
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace("/blesmanage");
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
    });
};

/**
 *
 *
 * @祝福语管理-详情
 * @param {*} params
 */
export function getBlessingDetail(params){
    let _this = this;
    $ajax('get', api.blesMan_detail, params).then(res=>{
        let _data = res.data;
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @生日管理-列表
 * @param {*} params
 */
export function getBirthManList(params){
    let _this = this;
    $ajax('get', api.birthMan_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        _this.hasDefault = _data.isDefault;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 * @生日管理-新增/修改
 * @param {*} params
 */
export function birthUpdate(params){
    let [_this,  _url, _params] = [this, api.birthMan_add, Object.assign({},params)];
    if(_this.$route.query.id){
        _url = api.birthMan_edit;
    };
    _params.img = _params.fileList[0].url;
    delete _params.fileList;
    $ajax('post', _url, _params).then(res=>{
        _this.$message({
            type: 'success',
            message: '保存成功！',
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace("/birthmanage");
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
        // console.log(err);
    });
};

/**
 *
 * @生日管理-详情
 * @param {*} params
 */
export function getBirthManageDetail(params){
    let _this = this;
    $ajax('get', api.birthMan_detail, params).then(res=>{
        let _data = res.data;
        let _imgPath =  (_data.img).split('/')[_data.img.split('/').length-1];
        _data.fileList = [{
            url: _data.img,
            name: _imgPath ? _imgPath : '未知'
        }];
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @生日管理-删除
 * @param {*} params
 */
export function birthManageDel(params){
    let _this = this;
    $ajax('get', api.birthMan_del, params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                _this.getBirthList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @节日管理-列表
 * @param {*} params
 */
export function getFestivalManList(params){
    let _this = this;
    $ajax('get', api.festivalMan_list, params).then(res=>{
        let _data = res.data;
        _this.tableData = _data.list;
        params.totalCount = _data.totalCount;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 * @节日管理-新增/修改
 * @param {*} params
 */
export function festivalUpdate(params){
    let [_this,  _url, _params] = [this, api.festivalMan_add, Object.assign({},params)];
    if(_this.$route.query.id){
        _url = api.festivalMan_edit;
    };
    _params.greetingCard = _params.fileList[0].url;
    delete _params.fileList;
    $ajax('post', _url, _params).then(res=>{
        _this.$message({
            type: 'success',
            message: '保存成功！',
            duration: _TO,
            onClose: ()=>{
                //按钮双击事件
                _ListeningClick(_this);
                _this.$router.replace("/festmanage");
            }
        });
    }).catch(err=>{
        //按钮双击事件
        _ListeningClick(_this);
        // console.log(err);
    });
};

/**
 *
 * @节日管理-详情
 * @param {*} params
 */
export function getFestivalManageDetail(params){
    let _this = this;
    $ajax('get', api.festivalMan_detail, params).then(res=>{
        let _data = res.data;
        let _imgPath =  (_data.greetingCard).split('/')[_data.greetingCard.split('/').length-1];
        _data.fileList = [{
            url: _data.greetingCard,
            name: _imgPath ? _imgPath : '未知'
        }];
        _this.ruleForm = _data;
    }).catch(err=>{
        // console.log(err);
    });
};

/**
 *
 *
 * @节日管理-删除
 * @param {*} params
 */
export function festivalManageDel(params){
    let _this = this;
    $ajax('get', api.festivalMan_del, params).then(res=>{
        _this.$message({
            type: 'success',
            message: _HM,
            duration: _TO,
            onClose: ()=>{
                _this.getFestList();
            }
        });
    }).catch(err=>{
        // console.log(err);
    });
};