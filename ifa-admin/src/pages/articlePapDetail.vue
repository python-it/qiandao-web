<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="是否发布">
                <el-select  disabled clearable v-model="ruleForm.status" placeholder="是否发布">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="列表图片">
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
            </el-form-item> -->
            <el-form-item label="早报标题">
                <el-input disabled clearable v-model="ruleForm.title" placeholder="30字以内"></el-input>
            </el-form-item>
            <el-form-item label="早报摘要">
                <el-input disabled clearable type="textarea" v-model="ruleForm.summary" placeholder="150字以内"></el-input>
            </el-form-item>
            <el-form-item label="早报日期">
               <el-date-picker disabled v-model="ruleForm.date" type="date" format="yyyy-MM-dd" placeholder="请选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="文章正文" prop="content" class="lineHeightInit">
                <quill-editor
                    v-model="ruleForm.content"
                    ref="myQuillEditor"
                    @ready="onEditorReady($event)"
                    class="maxWidth800"
                >
                </quill-editor>
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
                <el-button size="medium" type="primary" @click="onMoDetail">早报预览</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getArtPaperDetail } from "@/assets/http/l_http";

export default {
    name: "articlePapDetail",
    data() {
        return {
            ruleForm: {
                status: "",
                fileList: [],
                title: "",
                summary: "",
                date: "",
                content: "",
            },
        };
    },
    computed: {
     
    },
    created(){
        this.getDetail();
    },
    methods: {
        onEditorReady(quill) {
            quill.enable(false);
        },    
        getDetail(){
            getArtPaperDetail.call(this,{id: this.$route.query.id});
        },
        onMoDetail(){
            this.$router.push({
                path:"/mornpaper/modetail",
                query: {
                    id: this.$route.query.id
                }
            })
        },
        onCancel() {
            this.$router.push("/mornpaper");
        }
    },
    mounted(){

    }
};
</script>

<style scoped>
@import "../assets/styles/upload.css";
</style>
