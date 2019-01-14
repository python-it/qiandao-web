<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="广告位">{{ruleForm.adPositionDesc}}</el-form-item>
            <el-form-item label="是否可用">
                <el-select clearable disabled v-model="ruleForm.state" placeholder="是否可用">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片">
                <div class="lupload_wraper">
                    <ul class="lw_preview clearfix">
                        <li v-for="(item,index) in ruleForm.fileList" :key="index">
                            <div class="img_wraper">
                                <img class="upedImg" :src="item.url" @click="previewImg(item.url)">
                            </div>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="创建时间">{{ruleForm.createDate}}</el-form-item>
            <el-form-item label="修改时间">{{ruleForm.updateDate}}</el-form-item>

            <el-form-item>
                <el-button size="medium" @click="onCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { getAdManageDetail } from "@/assets/http/l_http";

export default {
    name: "adCheck",
    data() {
        /* 空字符串校验 */
        let requireValidator = (rule, value, callback) => {
            const _isNotNull = Boolean(value.replace(/ /g,''));
            if (!_isNotNull) {
                return callback(new Error('填写内容不能为空'));
            }else{
                callback();
            }
        };
        return {
            ruleForm: { //提交参数
                id: this.$route.query.id,
                adPosition: "",
                state: "",
                fileList: [],
            }
        };
    },
    created(){
        this.getAdDetail();
    },
    watch: {
        
    },
    methods: {
        getAdDetail(){
            getAdManageDetail.call(this,{id: this.$route.query.id});
        },
        onCancel() {
            this.$router.push("/admanage");
        },
        previewImg(url){
            /* 查看图片 */
            this.$alert(`<div class='showInitPic'><img style='max-width: 700px' src='${url}'/></div>`,'', {
                dangerouslyUseHTMLString: true,
                showCancelButton: false,
                showConfirmButton: false,
                center: true,
                closeOnClickModal: true
            }).then(() => {}).catch(() => {});
        },
    },
    mounted(){
        
    }
};
</script>

<style scoped>
@import "../assets/styles/upload.css";
.lw_preview img{
    cursor: pointer;
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
