<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="是否发布">
                <el-select  disabled clearable v-model="ruleForm.status">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="列表图片">
                <div class="lupload_wraper">
                    <ul class="lw_preview clearfix">
                        <li v-for="(item,index) in ruleForm.fileList" :key="index">
                            <div class="img_wraper">
                                <img class="upedImg" :src="item.url">
                            </div>
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="文章标题">
                <el-input disabled clearable v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要">
                <el-input disabled clearable type="textarea" v-model="ruleForm.summary"></el-input>
            </el-form-item>
            <el-form-item label="文章分类">
                <el-select disabled clearable v-model="ruleForm.category">
                    <el-option v-for="(item,index) in dictionaryTable.chapterList" :key="index" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否原创">
                <el-select disabled v-model="ruleForm.isOriginal">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="原标题" prop="oldTitle" v-if="showElItem">
                <el-input disabled clearable v-model="ruleForm.oldTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章作者" prop="author" v-if="showElItem">
                <el-input disabled clearable v-model="ruleForm.author"></el-input>
            </el-form-item>
            <el-form-item label="文章网址" prop="oldUrl" v-if="showElItem">
                <el-input disabled clearable v-model="ruleForm.oldUrl"></el-input>
            </el-form-item>
            <el-form-item label="网站名称" prop="siteName" v-if="showElItem">
                <el-input disabled clearable v-model="ruleForm.siteName"></el-input>
            </el-form-item>

            <el-form-item label="文章正文" class="lineHeightInit">
                <quill-editor
                    v-model="ruleForm.content"
                    ref="myQuillEditorDetail"
                    @ready="onEditorReady($event)"
                    class="maxWidth800"
                >
                </quill-editor>
            </el-form-item>

            <el-form-item label="标签" prop="tagIds">
                <el-checkbox-group :min="0" :max="2" v-model="ruleForm.tagIds" class="checkGroup-define maxWidth800">
                    <el-checkbox disabled v-for="(item,index) in dictionaryTable.tagsList" :key="index" :label="item.tagId">{{item.tagName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="创建时间">
               {{ruleForm.createTime}}
            </el-form-item>
             <el-form-item label="发布时间">
               {{(ruleForm.publishTime == null || ruleForm.publishTime == '') ? '未发布' : ruleForm.publishTime}}
            </el-form-item>
             <el-form-item label="修改时间">
               {{ruleForm.updateTime}}
            </el-form-item>
            <el-form-item>
                <el-button size="medium" type="primary" @click="onMoDetail">文章预览</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getArtitcleClassification, getArtDetail, getTagsList } from "@/assets/http/l_http";

export default {
    name: "artManDetial",
    data() {
        return {
            dictionaryTable: {
                chapterList: [],
                tagsList: []
            }, 
            showElItem: false,
            ruleForm: {
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
        };
    },
    created(){
        Promise.all([this.getChapterDic(), this.getDetail()]);
    },
    computed: {
     
    },
    watch: {
        ['ruleForm.isOriginal'](val){
            if(val == 0){
                this.showElItem = !this.showElItem;
            }else{
                this.showElItem = false;
            }
        }
    },
    methods: {
        onEditorReady(quill) {
            quill.enable(false);
        },    
        getChapterDic(){
            getTagsList.call(this);
            getArtitcleClassification.call(this);
        },
        getDetail(){
            getArtDetail.call(this,{id: this.$route.query.id});
        },
        onMoDetail(){
            this.$router.push({
                path:"/artmanage/modetail",
                query: {
                    id: this.$route.query.id
                }
            })
        },
        onCancel() {
            this.$router.push("/artmanage");
        }
    },
    mounted(){
       
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
