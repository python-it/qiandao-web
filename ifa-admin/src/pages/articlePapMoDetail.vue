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
                <!-- <div class="mWraper20"> -->
                    <div class="chapter-header">
                        <h2>{{ruleForm.title}}</h2>
                        <ul class="ch-tag clearfix">
                            <li>原创</li>
                            <li>{{ruleForm.date}}</li>
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
                <!-- </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getArtPaperDetail } from "@/assets/http/l_http";

export default {
    name: "articlePapMoDetail",
    data() {
        return {
            ruleForm: {
                content: "",
                createTime: "",
            },
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
            this.$router.push("/mornpaper");
        },
        getDetail(){
            getArtPaperDetail.call(this,{id: this.$route.query.id});
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
