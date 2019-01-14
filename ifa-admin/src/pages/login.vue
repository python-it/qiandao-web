<template>
    <div class="loginWrapper">
        <el-form :model="ruleForm" ref="ruleForm" label-width="50px">
            <el-form-item>
                <h1>IFA后台管理系统</h1>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="ruleForm.account" @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" autocomplete="off" v-model="ruleForm.password" @keyup.enter.native="submitForm"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  :disabled="DISABLED" type="primary" @click="submitForm('ruleForm')">登 录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { login } from '@/assets/http/l_http.js'

export default {
  name: "login",
  data() {
    return {
        DISABLED: false,
      ruleForm: {
        account: "admin",
        password: "000000@2018"
        // account: "",
        // password: ""
      }
    };
  },
  mounted () {
       
  },
  methods: {
    ...mapMutations(['_inView','_setToken','_setPersonInfo','_setSideRouter','_setTopNavHide']),
    submitForm(formName) {
      let _this = this;
        this.DISABLED = true;
      login.call(_this,_this.ruleForm);
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/login.css";
</style>
