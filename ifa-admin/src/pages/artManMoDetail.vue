<template>
    <div class="wrapper form_wraper p-rel">
        <div class="mobileBtn">
            <!-- <el-button size="medium" type="primary" v-show="!changeTopNav" @click="toggleNav(0)">隐藏头部</el-button> -->
            <!-- <el-button size="medium" type="primary" v-show="changeTopNav" @click="toggleNav(1)">显示头部</el-button> -->
            <el-button size="medium" @click="onCancel">返回</el-button>
        </div>
        <div class="hiddenScroll">
            <div class="mobileWraper">
                <div class="mw_padding">
                    <div class="chapter-header">
                        <h2>{{ruleForm.title}}</h2>
                        <ul class="ch-tag clearfix">
                            <li>{{ruleForm.isOriginal == 1 ? '原创' : ruleForm.siteName}}</li>
                            <li>{{ruleForm.publishTime == null ? '' : ruleForm.publishTime}}</li>
                        </ul>
                    </div>
                    <!-- 外容器必须有，否者样式无效！起ql-editor外层容器必须和后面代码压缩为同一行 -->
                    <div class="ql-snow">
                        <div class="ql-editor" v-html="ruleForm.content"></div>
                    </div>
                    <div class="chapter-footer">
                        <ul class="ch-tag clearfix">
                            <li>浏览 0</li>
                            <li>转发 0</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getArtDetail } from "@/assets/http/l_http";

export default {
    name: "artManMoDetail",
    data() {
        return {
            ruleForm: {
                content: "",
                isOriginal: "",
                createTime: "",
            },
            // chapter: '<p class="ql-align-center"><br></p><ol><li>这是什么阿斯顿撒大所大多啊实打实大大奥多大大多撒大所多撒多撒大大大大大大多奥术大师多撒大撒多撒多撒多撒多撒大所多撒多撒多撒多撒大大多大大大撒</li><li>我去撒大大大所多撒多撒大所多撒大多撒多撒大阿斯顿撒大所多撒多</li></ol><p><br></p><h3 class="ql-align-center">图片一览</h3><p class="ql-align-center"><br></p>',
        }
    },
    created(){
        this.getDetail();
    },
    computed: {
        ...mapState({
            changeTopNav: ({ _global }) => _global.hideTopHeader,
        }),
    },
    methods: {
        ...mapMutations(["_setTopNavHide"]),
        toggleNav(type){
            if(type == 0){
                this._setTopNavHide(true);
            }else{
                this._setTopNavHide(false);
            }
        },
        onCancel() {
            this.$router.push("/artmanage");
        },
        getDetail(){
            getArtDetail.call(this,{id: this.$route.query.id});
        },
    },
    mounted(){
       
    }
};
</script>

<style scoped>
    .form_wraper {
        padding: 30px 20px!important;
    }
</style>
<style>
@import "../assets/styles/mobile.css";
</style>
