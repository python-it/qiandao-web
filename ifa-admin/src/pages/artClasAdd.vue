<template>
    <div class="wrapper form_wraper">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="form_wraper_inner max600">
            <el-form-item label="分类名称" prop="typeName">
                <el-input clearable v-model="ruleForm.typeName" placeholder="请填写分类名称  2字（含）以内"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="typeDescribe">
                <el-input clearable type="textarea" v-model="ruleForm.typeDescribe" placeholder="请填写分类描述  100字以内"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  :disabled="DISABLED"  size="medium" type="primary" @click="onSubmit">确定</el-button>
                <el-button size="medium" @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { artClasUpdate } from '@/assets/http/l_http';

export default {
  name: "artClasAdd",
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
      ruleForm: {
        typeName: "",
        typeDescribe: ""
      },
      rules: {
        typeName: [
            { required: true, validator: requireValidator, trigger: "blur" },
            { min: 1, max: 2, message: "填写内容超限", trigger: "blur" }
        ],
        typeDescribe: [
            { min: 0, max: 100, message: "填写内容超限", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
        this.$refs['ruleForm'].validate((valid) => {
            if (valid) {
                this.DISABLED = true;
                artClasUpdate.call(this,this.ruleForm);
            } else {
                return false;
            }
        });
    },
    onCancel() {
        this.$router.push("/artclassify");
    }
  }
};
</script>

<style scoped>
</style>
