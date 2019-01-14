<template>
    <div class="wrapper form_wraper">
        <el-form ref="ruleForm" label-width="120px" class="userManage_detail form_wraper_inner padding057">
            <el-form-item label="账号">
                {{ruleForm.account}}
            </el-form-item>

            <el-form-item label="头像">
                <div class="lupload_wraper">
                    <ul class="lw_preview">
                        <li>
                            <img class="upedImg" :src="ruleForm.avatar">
                        </li>
                    </ul>
                </div>
            </el-form-item>
            <el-form-item label="昵称">
                {{ruleForm.nickName}}
            </el-form-item>
            <el-form-item label="姓名">
                {{ruleForm.name}}
            </el-form-item>
            <el-form-item label="手机号">
                {{ruleForm.mobile}}
            </el-form-item>
            <el-form-item label="邮箱">
                {{ruleForm.email}}
            </el-form-item>
            <el-form-item label="所属公司">
                {{ruleForm.company}}
            </el-form-item>
             <el-form-item label="自荐语">
                <div class="define_content">
                    {{ruleForm.recommendation}}
                 </div>
            </el-form-item>

            <el-form-item label="客户数量">
                {{ruleForm.customerNum}}
            </el-form-item>
            <el-form-item label="已绑微信数量">
                {{ruleForm.bindWxNum}}
            </el-form-item>

             <el-form-item label="注册时间">
                {{ruleForm.createTime}}
            </el-form-item>
            <el-form-item label="最近登录时间">
                {{ruleForm.loginTime}}
            </el-form-item>
            
            <el-form-item>
                <el-button size="medium" @click="onCancel">返回</el-button>
                <el-button type="primary" size="medium" @click="onSearch">手机号变更查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { ifaManDetail } from "@/assets/http/l_http";
import IFAPIC from '@/assets/images/portrait.png';

export default {
    name: "ifaManageCheck",
    data() {
        return {
            ruleForm: {},
            defaultPic: IFAPIC
        };
    },
    created(){
        this.getIfaManListDetail();
    },
    methods: {
        getIfaManListDetail(){
            ifaManDetail.call(this,{id: this.$route.query.id});
        },
        onCancel() {
            this.$router.push("/usermanage");
        },
        onSearch(){
            /* 手机号变更查询 */
            this.$router.push({
                name: 'phoneAlter',
                params: {
                    'account': this.ruleForm.account
                },
            })
        }
    },
    mounted(){

    }
};
</script>

<style>
    .userManage_detail .lw_preview li{
        line-height: 0;
    }
    .userManage_detail .lw_preview li img{
        max-width: 137px;
    }
    .userManage_detail .el-form-item__label{
        text-align: right;
        padding-right: 25px;
    }
</style>
