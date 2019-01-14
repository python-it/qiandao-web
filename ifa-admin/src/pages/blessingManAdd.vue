<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form_wraper_inner padding057">
            <el-form-item label="分类" prop="sentimentType">
                <el-select clearable v-model="ruleForm.sentimentType" placeholder="分类">
                    <el-option v-for="(item,index) in dictionaryTable.clasList" :key="index" :label="item.dicValue" :value="item.dicCode"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否可用" prop="state">
                <el-select clearable v-model="ruleForm.state" placeholder="是否可用">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="正文" prop="content">
                <div class="p-rel maxWidth800">
                    <el-input clearable type="textarea" v-model="ruleForm.content" placeholder="150字以内" :maxlength="editorRules.maxLength"></el-input>
                    <div class="textNum">{{editorRules.currentNum}}/{{editorRules.maxLength}}</div>
                </div>
            </el-form-item>

            <el-form-item>
                <el-button  :disabled="DISABLED" size="medium" type="primary" @click="onSubmit">保存</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { getblessingClasList, blessingUpdate } from "@/assets/http/l_http";

export default {
    name: "blessingManAdd",
    data() {
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
            editorRules: {
                currentNum: 0,  //当前总字数
                maxLength: 150,  //最大字数
            },
            dictionaryTable:{
                clasList: []
            },
            ruleForm: {
                sentimentType: "",
                state: "",
                content: "",
            },
            rules: {
                sentimentType: [
                    { required: true, message: "请选择分类", trigger: "change" },
                ],
                state: [
                    { required: true, message: "请选择是否可用", trigger: "change" },
                ],
                content: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 150, message: '填写内容超限', trigger: 'blur' }
                ],
            }
        };
    },
    watch: {
        ['ruleForm.content'](val){
           this.editorRules.currentNum = String(val).length;
        },
    },
    computed: {
      
    },
    created(){
        /* 分类字典表 */
        getblessingClasList.call(this);
    },
    methods: {
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.DISABLED = true;
                    blessingUpdate.call(this,this.ruleForm);
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
            this.$router.push("/blesmanage");
        }
    },
    mounted(){
       
    }
};
</script>
<style scoped>
@import "../assets/styles/upload.css";
</style>
