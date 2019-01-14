<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="广告位">{{ruleForm.adPositionDesc}}</el-form-item>
            <el-form-item label="是否可用" prop="state">
                <el-select clearable v-model="ruleForm.state" placeholder="是否可用">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="图片" prop="fileList">
                <div class="lupload_wraper">
                    <div class="lw_btn">
                        <el-button size="mini" type="primary">添加图片</el-button>
                        <input type="file" accept="image/*" id="files">
                        <span class="el-upload__tip">请上传1032*630的图片！</span>
                    </div>
                    <ul class="lw_preview clearfix">
                        <li v-for="(item,index) in ruleForm.fileList" :key="index">
                            <img class="delImg" src="../assets/images/del01.png" @click="delImg(index)">
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
                <el-button :disabled="DISABLED" size="medium" type="primary" @click="onSubmit">保存</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { getAdManageDetail, adUpdate } from "@/assets/http/l_http";

import api from "@/assets/http/api/l_api";
import { fileImg } from "@/assets/util/fileUpload";
import { mapState } from "vuex";

export default {
    name: "adEdit",
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
            uploadImg: process.env.NODE_ENV == 'development'?`https://testtechapp.unifgroup.com${api.uploadImg}` : api.uploadImg,  //图片上传地址
            dictionaryTable:{
                adList: []  //字典表
            }, 
            fileObey:{
                acceptType: ".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP",
                maxNum: 1,
                maxWidth: 1032,
                maxHeight: 630
            },
            ruleForm: { //提交参数
                id: this.$route.query.id,
                adPosition: "",
                state: "",
                fileList: [],
            },
            rules: {
                state: [
                    { required: true, message: "请选择是否可用", trigger: "change" },
                ],
                fileList: [
                    { required: true, message: "图片不能为空", trigger: "blur" },
                ]
            }
        };
    },
    created(){
        this.getAdDetail();
    },
    computed: {
        ...mapState({
            token: ({ _global }) => {
                return _global.token;
            }
        }),
    },
    watch: {
        
    },
    methods: {
        getAdDetail(){
            getAdManageDetail.call(this,{id: this.$route.query.id});
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
        delImg(index){
            this.$confirm('确定要删除此图片吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.ruleForm.fileList.splice(index,1); 
            }).catch(() => {
                  
            });
        },
        uploadInit(){
            fileImg.call(this,{
                fileId: 'files',
                width: this.fileObey.maxWidth,
                height: this.fileObey.maxHeight,
                size: this.fileObey.maxNum,
                distinguish: this.$route.path
            })
        },
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.DISABLED = true;
                    adUpdate.call(this,this.ruleForm);
                } else {
                    this.$message({
                        message: '信息填写不完善！!',
                        type: 'warning',
                        duration: 2000
                    });
                    return false;
                }
            });
        },
        onCancel() {
            this.$router.push("/admanage");
        }
    },
    mounted(){
        this.uploadInit();
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
    max-width: 700px;
}
</style>
