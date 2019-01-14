<template>
    <div id="app">
        <el-container v-if="changeView">
            <el-aside width="216px">
                <SIDEBAR />
            </el-aside>
            <el-container>
                <!-- <el-header :class="{'fadeIn': !changeTopNav,'fadeOut': changeTopNav}"> -->
                <el-header class="suitElZindex" v-show="!changeTopNav">
                    <el-row>
                        <el-col :span="24" class="logo_wraper">
                            <div class="grid-content bg-purple">
                                <h1 class="system_name text_left">
                                    IFA后台管理系统
                                    <div class="version">V0.3.0</div>
                                </h1>
                            </div>
                        </el-col>
                    </el-row>
                </el-header>
                <el-row :gutter="0" class="suitElZindex layBreadCrumbs" v-if="hiddenBreadCrumb">
                    <el-col :span="4">当前路径:</el-col>
                    <el-col :span="18">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="(bread,index) in breadCrumbLists" :key="index">
                                <router-link :to="bread.url" v-if="bread.url != null">{{bread.title}}</router-link>
                                <span v-else>{{bread.title}}</span>
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="2" style="text-align: right;float: right">
                        <el-switch v-model="toggleStatus" inactive-color="#dcdfe6" active-color="#436dd4" @change="toggleNav"></el-switch>
                    </el-col>
                </el-row>
                <el-main id='viewWraper'>
                    <transition name="move" mode="out-in">
                        <router-view/>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
        <div v-else>
            <transition name="move" mode="out-in">
                <router-view />
            </transition>
        </div>
    </div>
</template>

<script>
import store from '@/store/store.js';
import { mapState, mapMutations } from "vuex";
import Side_bar from "@/components/layout/sideBar.vue";

export default {
  name: "home",
  components: {
    SIDEBAR: Side_bar
  },
  data() {
    return {
        toggleStatus: !store.state._global.hideTopHeader,
    };
  },
  created() {
      
  },
  watch:{
        $route(obj){
            let _this = this;
            if(obj.name != 'login'){
               if(obj.meta.hideNav){
                _this.toggleStatus = !obj.meta.hideNav;
                _this.toggleNav(_this.toggleStatus);
               }
            }else{
                _this.toggleStatus = true;
            }
        }
  },
  methods: {
    ...mapMutations(["_outView", "_clearToken", '_setTopNavHide']),
    loginOut() {
        this._clearToken();
        this._outView();
        this.$router.replace({
            path: "/login"
        });
    },
    toggleNav(status){
        this._setTopNavHide(!status);
    }
  },
  computed: {
    ...mapState({
        changeView: ({ _global }) => _global.viewRouter,
        changeTopNav: ({ _global }) => {
            return _global.hideTopHeader;
        },
    }),
    breadCrumbLists(){
        return this.$route.meta.crumbs;
    },
    hiddenBreadCrumb(){
        return this.$route.path != '/';
    }
  }
};
</script>

<style>
@import "./assets/styles/layout.css";
</style>
