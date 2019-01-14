<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="节日标题" prop="title">
                <div class="p-rel maxWidth800">
                    <el-input disabled clearable v-model="ruleForm.title" placeholder="50字以内" :maxlength="editorRules.titleMaxNum"></el-input>
                    <div class="textNum">{{editorRules.titleNum}}/{{editorRules.titleMaxNum}}</div>
                </div>
            </el-form-item>

            <!-- 日期上传时间戳还是就字符串 -->
            <el-form-item label="日期" prop="remindDate">
                <el-date-picker
                    disabled
                    v-model="ruleForm.remindDate"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder="请选择日期"
                    >
                </el-date-picker>
            </el-form-item>

            <el-form-item label="是否可用" prop="status">
                <el-select disabled clearable v-model="ruleForm.status" placeholder="是否可用">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="贺卡图片" prop="fileList">
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
            <el-form-item label="创建时间">
                {{ruleForm.createTime}}
            </el-form-item>
            <el-form-item label="修改时间">
                {{ruleForm.updateTime}}
            </el-form-item>
            <el-form-item>
                <el-button size="medium" @click="onCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { getFestivalManageDetail } from "@/assets/http/l_http";

export default {
    name: "festivalManageDetail",
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
            DISABLED: false,
            fileObey:{
                acceptType: ".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP",
                maxNum: 1,
                maxWidth: 4,
                maxHeight: 3
            },
            editorRules: {
                titleNum: 0,
                titleMaxNum: 50,
            },
            ruleForm: { //提交参数
                id: this.$route.query.id,
                title: '',
                remindDate: '',
                status: "",
                fileList: [],
            },
            rules: {
                title: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 50, message: '填写内容超限', trigger: 'blur' }
                ],
                remindDate: [
                    { required: true, message: "请选择日期", trigger: "change" },
                ],
                status: [
                    { required: true, message: "请选择是否可用", trigger: "change" },
                ],
                fileList: [
                    { required: true, message: "图片不能为空", trigger: "blur" },
                ]
            }
        };
    },
    created(){
        getFestivalManageDetail.call(this, {id: this.$route.query.id});
    },
    watch: {
        ['ruleForm.title'](val){
            this.editorsChange(val,1);
        },
    },
    methods: {
        editorsChange(val,type){
            let _curNum = String(val).length;
            if(type == 1){
                this.editorRules.titleNum = _curNum;
            }
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
        onCancel() {
            this.$router.push("/festmanage");
        }
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
