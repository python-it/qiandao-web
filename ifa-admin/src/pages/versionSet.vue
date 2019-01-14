<template>
    <div class="wrapper form_wraper">
        <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
            <el-tab-pane label="Android" name="android">
                <VSC type="android" :formdata="ruleForm"/>
            </el-tab-pane>
            <el-tab-pane label="IOS" name="ios">
                <VSC type="ios" :formdata="ruleForm"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import VersionSetComp from '@/components/common/VersionSetComp'
import { versionSetGet } from "@/assets/http/l_http";

export default {
    name: "versionSet",
    components:{
        VSC: VersionSetComp,
    },
    data() {
        return {
            activeTab: '',
            ruleForm: {},
        }
    },
    created(){
        this.getDetail({});
    },
    methods: {
        getDetail(appType){
            versionSetGet.call(this,appType);
        },
        handleClick(tab, event){
            this.getDetail({'appType': tab.name});
        }
    }
};
</script>

<style scoped>

</style>
