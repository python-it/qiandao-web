<template>
    <div class="wrapper form_wraper">
        <el-form ref="ruleForm" label-width="120px" class="userManage_detail form_wraper_inner padding057">
            <el-form-item label="账号">
                {{ruleForm.account}}
            </el-form-item>
            <el-form-item label="姓名">
                {{ruleForm.name}}
            </el-form-item>
            <el-form-item label="昵称">
                {{ruleForm.nickName}}
            </el-form-item>
            <el-form-item label="手机号">
                {{ruleForm.mobile}}
            </el-form-item>
            <el-form-item label="反馈时间">
                {{ruleForm.createTime}}
            </el-form-item>
            <el-form-item label="手机型号">
                {{ruleForm.phoneModel}}
            </el-form-item>
            <el-form-item label="系统型号">
                {{ruleForm.systemModel}}
            </el-form-item>
            <el-form-item label="APP版本号">
                {{ruleForm.appVersion}}
            </el-form-item>
            <el-form-item label="上传图片">
                <ul class="ob_upedImg clearfix"> 
                    <li v-for="(item,index) in ruleForm.imagePath" :key="index" @click="showPic(item)"><img :src="item"></li>
                </ul>
            </el-form-item>
            <el-form-item label="反馈内容">
                <div class="define_content">
                    {{ruleForm.content}}
                </div>
            </el-form-item>
            
            <el-form-item>
                <el-button size="medium" @click="onCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { opinionDetail } from "@/assets/http/l_http";

export default {
    name: "opinionBackCheck",
    data() {
        return {
            ruleForm: {
                imagePath: []
            }
        };
    },
    created(){
        this.getOpinionDetail();
    },
    methods: {
        getOpinionDetail(){
            opinionDetail.call(this,{id: this.$route.query.id});
        },
        onCancel() {
            this.$router.push("/opinionback");
        },
        showPic(url){
            this.$alert(`<div class='showInitPic'><img src='${url}'/></div>`,'', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                showConfirmButton: false,
                center: true,
                closeOnClickModal: true
            }).then(() => {}).catch(() => {});
        }
    },
    mounted(){

    }
};
</script>

<style>
    .ob_upedImg li{
        float: left;
        width: 150px;
        height: 200px;
        border: 1px solid #dbdbdb;
        cursor: pointer;
        overflow: hidden;
        text-align: center;
        display: -webkit-box;  
        display: -moz-box; 
        display: -webkit-flex; 
        display: -moz-flex; 
        display: -ms-flexbox; 
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 15px;
        margin-top: 14px;
    }
    .ob_upedImg li img{
        display: inline-block;
        max-width: 100%;
        height: auto; 
    }
    .showInitPic{
        font-size: 0;
        line-height: initial;
        text-align: center;
    }
    .showInitPic img{
        display: inline-block;
        width: auto;
        height: auto;
        max-width: 414px;
    }
</style>

