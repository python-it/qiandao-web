<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="是否发布" prop="status">
                <el-select clearable v-model="ruleForm.status" placeholder="是否发布">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="列表图片" prop="fileList">
                <div class="lupload_wraper">
                    <div class="lw_btn">
                        <el-button size="mini" type="primary">添加图片</el-button>
                        <input type="file" accept="image/*" id="files">
                        <span class="el-upload__tip">请上传4:3的图片！</span>
                    </div>
                    <ul class="lw_preview clearfix">
                        <li v-for="(item,index) in ruleForm.fileList" :key="index">
                            <img class="delImg" src="../assets/images/del01.png" @click="delImg(index)">
                            <div class="img_wraper">
                                <img class="upedImg" :src="item.url">
                            </div>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="文章标题" prop="title">
                <div class="p-rel maxWidth800">
                    <el-input clearable v-model="ruleForm.title" placeholder="50字以内" :maxlength="editorRules.titleMaxNum"></el-input>
                    <div class="textNum">{{editorRules.titleNum}}/{{editorRules.titleMaxNum}}</div>
                </div>
            </el-form-item>
            <el-form-item label="文章摘要" prop="summary">
                <div class="p-rel maxWidth800">
                    <el-input clearable type="textarea" v-model="ruleForm.summary" placeholder="150字以内" :maxlength="editorRules.summaryMaxNum"></el-input>
                    <div class="textNum">{{editorRules.summaryNum}}/{{editorRules.summaryMaxNum}}</div>
                </div>
            </el-form-item>
            <el-form-item label="文章分类" prop="category">
                <el-select clearable v-model="ruleForm.category" placeholder="文章分类">
                    <el-option v-for="(item,index) in dictionaryTable.chapterList" :key="index" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否原创" prop="isOriginal">
                <el-select clearable v-model="ruleForm.isOriginal" placeholder="是否原创">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="原标题" prop="oldTitle" v-if="showElItem">
                <div class="p-rel maxWidth800">
                    <el-input clearable v-model="ruleForm.oldTitle" placeholder="50字以内" :maxlength="editorRules.oldTitleMaxNum"></el-input>
                    <div class="textNum">{{editorRules.oldTitleNum}}/{{editorRules.oldTitleMaxNum}}</div>
                </div>
            </el-form-item>
            <el-form-item label="文章作者" prop="author" v-if="showElItem">
                <div class="p-rel maxWidth800">
                    <el-input clearable v-model="ruleForm.author" placeholder="30字以内" :maxlength="editorRules.authorMaxNum"></el-input>
                    <div class="textNum">{{editorRules.authorNum}}/{{editorRules.authorMaxNum}}</div>
                </div>
            </el-form-item>
            <el-form-item label="文章网址" prop="oldUrl" v-if="showElItem">
                <el-input clearable v-model="ruleForm.oldUrl" placeholder="请输入网址"></el-input>
            </el-form-item>
            <el-form-item label="网站名称" prop="siteName" v-if="showElItem">
                <div class="p-rel maxWidth800">
                    <el-input clearable v-model="ruleForm.siteName" placeholder="30字以内" :maxlength="editorRules.siteNameMaxNum"></el-input>
                    <div class="textNum">{{editorRules.siteNameNum}}/{{editorRules.siteNameMaxNum}}</div>
                </div>
            </el-form-item>

            <el-form-item label="文章正文" prop="content" class="lineHeightInit">
                <div class="p-rel maxWidth800">
                    <quill-editor
                        v-model="ruleForm.content"
                        ref="myQuillEditor"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        @change="onEditorChange($event)"
                    >
                    </quill-editor>
                    <div class="textNum">{{editorRules.currentNum}}/{{editorRules.maxLength}}</div>
                </div>
            </el-form-item>

            <el-form-item label="标签" prop="tagIds">
                <el-checkbox-group :min="0" :max="2" v-model="ruleForm.tagIds" class="checkGroup-define maxWidth800">
                    <el-checkbox v-for="(item,index) in dictionaryTable.tagsList" :key="index" :label="item.tagId">{{item.tagName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button :disabled="DISABLED" size="medium" type="primary" @click="onSubmit">保存</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { fileImg } from "../assets/util/fileUpload";
import { getArtitcleClassification, updateArticle, getTagsList } from "@/assets/http/l_http";
import { mapState } from "vuex";
import { quillEditorImgToForm } from '@/assets/util/quillImgEditor';

export default {
    name: "artManAdd",
    data() {
        /* 文本编辑器校验 */
        let contentValidator = (rule, value, callback) => {
            if (!this.editorRules.currentNum || this.ruleForm.content == "") {
                return callback(new Error('填写内容不能为空'));
            }else{
                if(this.editorRules.currentNum > this.editorRules.maxLength){
                    return callback(new Error('填写内容超限'));
                }else{
                    callback();
                }
            }
        };
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
            uploadImg: '/admin/1.0.0/file/manage/uploadSingle',
            editorRules: {
                currentNum: 0,  //当前总字数
                maxLength: 100000,  //最大字数
                titleNum: 0,
                titleMaxNum: 50,
                summaryNum: 0,
                summaryMaxNum: 150,
                oldTitleNum: 0,
                oldTitleMaxNum: 50,
                authorNum: 0,
                authorMaxNum: 30,
                siteNameNum: 0,
                siteNameMaxNum: 30
            },
            dictionaryTable:{
                chapterList: [],
                tagsList: []
            }, 
            fileObey:{
                acceptType: ".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP",
                maxNum: 1,
                maxWidth: 4,
                maxHeight: 3
            },
            showElItem: false,
            ruleForm: {
                publish: "",
                status: "",
                fileList: [],
                title: "",
                summary: "",
                category: "",
                isOriginal: "",
                content: "",
                oldTitle: "",
                author: "",
                oldUrl: "",
                siteName: "",
                tagIds: []
            },
            rules: {
                status: [
                    { required: true, message: "请选择是否发布", trigger: "change" },
                ],
                fileList: [
                    { required: true, message: "图片不能为空", trigger: "blur" },
                ],
                title: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 50, message: '填写内容超限', trigger: 'blur' }
                ],
                summary: [
                    { required: false},
                    { min: 0, max: 150, message: '填写内容超限', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: "请选择文章分类", trigger: "change" }
                ],
                isOriginal: [
                    { required: true, message: "请选择是否原创", trigger: "change" }
                ],
                oldTitle: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 50, message: '填写内容超限', trigger: 'blur' }
                ],
                author: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 30, message: '填写内容超限', trigger: 'blur' }
                ],
                oldUrl: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                ],
                siteName: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 30, message: '填写内容超限', trigger: 'blur' }
                ],
                content: [
                    { required: true,  validator: contentValidator}
                ],
            }
        };
    },
    created(){
        this.getChapterDic();
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill
        },
        ...mapState({
            token: ({ _global }) => {
                return _global.token;
            }
        }),
    },
    watch: {
        ['ruleForm.isOriginal'](val){
            if(val == 0){
                this.showElItem = !this.showElItem;
            }else{
                this.showElItem = false;
            }
        },
        ['ruleForm.title'](val){
            this.editorsChange(val,1);
        },
        ['ruleForm.summary'](val){
            this.editorsChange(val,2);
        },
        ['ruleForm.oldTitle'](val){
            this.editorsChange(val,3);
        },
        ['ruleForm.author'](val){
            this.editorsChange(val,4);
        },
        ['ruleForm.siteName'](val){
            this.editorsChange(val,5);
        }
    },
    methods: {
        editorsChange(val,type){
            /* 当前字数监听 */
            let _curNum = String(val).length;
            if(type == 1){
                this.editorRules.titleNum = _curNum;
            }else if(type == 2){
                this.editorRules.summaryNum = _curNum;
            }else if(type == 3){
                this.editorRules.oldTitleNum = _curNum;
            }else if(type == 4){
                this.editorRules.authorNum = _curNum;
            }else if(type == 5){
                this.editorRules.siteNameNum = _curNum;
            }
        },
        onEditorBlur(quill) {
            // this.editorRules.currentNum = quill.getLength()-1;
            // quill.deleteText(this.editorRules.maxLength, this.editorRules.currentNum - this.editorRules.maxLength);
        },
        onEditorFocus(quill) {
            
        },
        onEditorReady(quill) {
            // console.log(quill);
            quillEditorImgToForm.call(this,quill);
        },
        onEditorChange({ quill, html, text }) {
            this.editorRules.currentNum = quill.getLength()-1;
            this.ruleForm.content = html;
            if(this.editorRules.currentNum > this.editorRules.maxLength){
                quill.deleteText(this.editorRules.maxLength, this.editorRules.currentNum - this.editorRules.maxLength);
            };
        },
        
        getChapterDic(){
            getTagsList.call(this);
            getArtitcleClassification.call(this);
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
                size: this.fileObey.maxNum
            })
        },
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                /* 单独针对content校验 */
                this.$refs.ruleForm.validateField('content');
                if (valid) {
                    this.DISABLED = true;
                    updateArticle.call(this,this.ruleForm);
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
            this.$router.push("/artmanage");
        }
    },
    mounted(){
        this.uploadInit();
    }
};
</script>


<style>
    .checkGroup-define .el-checkbox{
        margin-left: 0px;
        margin-right: 30px;
    }
</style>
<style scoped>
@import "../assets/styles/upload.css";
</style>
