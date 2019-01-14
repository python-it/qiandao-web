<template>
    <div class="height001 p-rel layout_tpwraper">
        <section class="layout_side_personInfo">
            <img :src="personInfo.avatar != '' ? personInfo.avatar : potrait">
            <h2>WELCOME</h2>
            <span>{{personInfo.name}}</span>
        </section>

        <section class="height001 hidScroll layout_side_menu">
            <el-menu class="hidScroll" :default-active="activeMenu" router @open="handleOpen" @close="handleClose" background-color="#30416c" text-color="#c8d5f7" active-text-color="#407bf2">
                <el-submenu :index="String(index)" v-for="(item,index) in sideRouter" :key="index">
                    <template slot="title">
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="(items,inde) in item.moduleDtos" :key='inde' :index="items.url" @click="setTab(`${items.url}`)">{{items.name}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </section>

        <section class="layout_side_handle">
            <div class="lsh_wraper clearfix">
                <span class="login_out" @click="loginOut" v-if="!DISABLED">退出</span>
                <span class="login_out" v-else>退出</span>
                <i class="system_setting">
                    <img src="../../assets/images/set.png" @click="$router.push('/versionset')">
                </i>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Portrait from '../../assets/images/defalut_portrait.png'
import { loginOut } from '@/assets/http/l_http';
export default {
  name: "sideBar",
  data() {
    return {
        DISABLED: false,
        potrait: Portrait
    };
  },
  computed: {
    ...mapState({
        activeMenu: ({ _global }) => {
            return _global.activeIndex;
        },
        personInfo: ({ _global }) => {
            return JSON.parse(_global.personInfo);
        },
        sideRouter: ({_global}) => {
            return JSON.parse(_global.sideRouter);
        }
    }),
  },
  methods: {
    ...mapMutations(['_setSidebar',"_outView", "_clearToken"]),
    loginOut() {
        this.DISABLED = true;
        loginOut.call(this,{});
    },
    setTab(path){
        this._setSidebar(path);
    },
    handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    }
  }
};
</script>

