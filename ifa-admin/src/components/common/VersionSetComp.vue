<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="form_wraper_inner padding057">
            <!-- <el-form-item label="app类型" prop="appType">
                 <el-radio-group :disabled="cantTab" v-model="ruleForm.appType"  @change="handleCheckChange">
                    <el-radio label="Android"></el-radio>
                    <el-radio label="IOS"></el-radio>
                </el-radio-group>
            </el-form-item> -->
           <el-form-item label="是否弹窗提示" prop="isOpenDialog" v-if="showElItem">
                <el-select clearable v-model="ruleForm.isOpenDialog" placeholder="请选择是否弹窗提示">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="最新版本名称" prop="appNewName">
                <el-input clearable v-model="ruleForm.appNewName" placeholder="10字以内"></el-input>
            </el-form-item>
            <el-form-item label="最新版本号" prop="appNewVer">
                <el-input clearable v-model="ruleForm.appNewVer" placeholder="10字以内"></el-input>
            </el-form-item>
            <el-form-item label="最新版本文案" prop="appNewInfo">
                <el-input clearable type="textarea" v-model="ruleForm.appNewInfo" placeholder="100字以内"></el-input>
            </el-form-item>
            <el-form-item label="下载地址" prop="downloadUrl">
                <el-input clearable v-model="ruleForm.downloadUrl" placeholder="请输入下载地址"></el-input>
            </el-form-item>
            <el-form-item label="是否强制更新" prop="isUpdate">
                <el-select clearable v-model="ruleForm.isUpdate" placeholder="请选择是否强制更新">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="最低兼容版本" prop="minVersion">
                <el-input clearable v-model="ruleForm.minVersion" placeholder="请输入最低兼容版本(含以下将升级至最新版本)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  :disabled="DISABLED" size="medium" type="primary" @click="onSubmit">保存</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { versionSetUpdate } from "@/assets/http/l_http";

export default {
    props: ['formdata','type'],
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
            showElItem: false,
            ruleForm: {
                appType: '',
                createDate: '',
                isOpenDialog: '',
                appNewName: "",
                appNewVer: "",
                appNewInfo: "",
                downloadUrl: "",
                isUpdate: "",
                minVersion: "",
                id: "",
            },
            cantTab: false,
            rules: {
                appType: [
                    { required: true, message: "至少选择一种app类型", trigger: "change" },
                ],
                isOpenDialog: [
                    { required: true, message: "请选择是否弹窗提示", trigger: "change"},
                ],
                appNewName: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 10, message: '填写内容超限', trigger: 'blur' }
                ],
                appNewVer: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 10, message: '填写内容超限', trigger: 'blur' }
                ],
                appNewInfo: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                    { min: 1, max: 100, message: '填写内容超限', trigger: 'blur' }
                ],
                downloadUrl: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                ],
                isUpdate: [
                    { required: true, message: "请选择是否强制更新", trigger: "change" },
                ],
                minVersion: [
                    { required: true, validator: requireValidator, trigger: "blur" },
                ],
            },
            timeout: null,
        };
    },
    created(){
        if(this.type == 'ios'){
            this.showElItem = true;
        }else{
            this.showElItem = false;
        }
    },
    computed: {
        ...mapState({
            sideRouter: ({_global}) => {
                return JSON.parse(_global.sideRouter);
            }
        }),
    },
    destroyed(){
        clearTimeout(this.timeout);
    },
    watch: {
        formdata(val){
            this.ruleForm = val;
            this.timeout = setTimeout(()=>{
                this.$refs.ruleForm.validate((valid)=>{
                    if(!valid){
                        return false;
                    }else{
                    }
                });
            },500);
        },
        // ruleForm:{
        //     handler(val, oldVal){
        //         for(let i in val){
        //             this.cantTab = false;
        //             if(val[i] == ''){
        //                 if(val['appType'] == 'Android' && i == 'isOpenDialog'){
        //                     this.cantTab = false;
        //                 }else{
        //                     this.cantTab = true;
        //                     return
        //                 }
        //             };
        //         }
        //     },
        //     deep:true
        // }
    },
    methods: {
        ...mapMutations(['_setSideRouter','_setSidebar']),
        handleCheckChange(value){
            versionSetGet.call(this,{'appType': (this.ruleForm.appType).toLowerCase()});
        },
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.DISABLED = true;
                    versionSetUpdate.call(this,this.ruleForm);
                } else {
                    return false;
                }
            });
        },
        onCancel() {
            const _cache = this.sideRouter;
            const _array = new Array();
            this._setSideRouter(JSON.stringify(_array));
            setTimeout(()=>{
                this._setSideRouter(JSON.stringify(_cache));
                this.$router.push("/");
            },50);
        }
    },
    mounted(){
       
    }
};
</script>

<style scoped>

</style>
