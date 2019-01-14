<template>
    <div class="wrapper welcome">您好！{{personAccount}}，欢迎登录！</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "welcome",
  data() {
    return {
    
    };
  },
  created () {
    
  },
  computed: {
    ...mapState({
        personAccount: ({ _global }) => {
            return JSON.parse(_global.personInfo).account;
        },
    }),
  },
  methods: {
   
  }
};
</script>

<style scoped>
    .welcome{
        font-size: 16px;
        font-weight: bold;
        padding-top: 20px; 
    }
</style>
