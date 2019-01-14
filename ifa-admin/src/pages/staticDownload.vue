<template>
    <div class="wrapper form_wraper">
        <el-form ref="ruleForm" label-width="0px" class="form_wraper_inner padding057">
            <el-form-item label="">
                <h3 class="title">早报/文章分享导出</h3>
                <el-date-picker
                    v-model="rangeTime.time1"
                    :picker-options="pickerOptions"
                    type="datetimerange"
                    value-format='timestamp'
                    range-separator="至"
                    start-placeholder="分享时间-开始"
                    end-placeholder="分享时间-结束">
                </el-date-picker>
                <el-button type='primary' style="margin-left: 20px;" size="medium" :disabled="DISABLED_chapter" @click="onDownload('chapter')">导出</el-button>
            </el-form-item>
            <el-form-item label="">
                <h3 class="title">名片分享导出</h3>
                <el-date-picker
                    v-model="rangeTime.time2"
                    :picker-options="pickerOptions"
                    type="datetimerange"
                    value-format='timestamp'
                    range-separator="至"
                    start-placeholder="分享时间-开始"
                    end-placeholder="分享时间-结束">
                </el-date-picker>
                <el-button type='primary' style="margin-left: 20px;" size="medium" :disabled="DISABLED_card" @click="onDownload('card')">导出</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { staticDownload } from "@/assets/http/l_http";

export default {
    name: "staticDownload",
    data() {
        return {
            DISABLED_chapter: false,
            DISABLED_card: false,
            rangeTime: {
                time1: [Date.parse(new Date()),Date.parse(new Date())], 
                time2: [Date.parse(new Date()),Date.parse(new Date())]
            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一年',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        };
    },
    created(){

    },
    methods: {
        onDownload(type){
            let _obj = {};
            _obj.type = type;
            if(type == 'chapter'){
                this.DISABLED_chapter = true;
                if(this.rangeTime.time1 != null){
                    _obj.startDate = this.rangeTime.time1[0];
                    _obj.endDate = this.rangeTime.time1[1];
                }else{
                    this.$message({
                        type: 'error',
                        message: '时间不能为空！',
                        duration: 1200,
                        onClose: ()=>{
                            let timeout = setTimeout(()=>{
                                this.DISABLED_chapter = false;
                                clearTimeout(timeout);
                            },1000);
                        }
                    });
                    return;
                };
            }else{
                this.DISABLED_card = true;
                if(this.rangeTime.time2 != null){
                    _obj.startDate = this.rangeTime.time2[0];
                    _obj.endDate = this.rangeTime.time2[1];
                }else{
                    this.$message({
                        type: 'error',
                        message: '时间不能为空！',
                        duration: 1200,
                        onClose: ()=>{
                            let timeout = setTimeout(()=>{
                                this.DISABLED_card = false;
                                clearTimeout(timeout);
                            },1000);
                        }
                    });
                    return;
                };
            };
            staticDownload.call(this,_obj);
        },
        fileDownload(data, fileName) {
            let blob = new Blob([data], {
                type: "application/vnd.ms-excel"
            });
            let filename = fileName || "filename.xls";
            if (typeof window.navigator.msSaveBlob !== "undefined") {
                /* IE浏览器 */
                if(filename != "filename.xls"){
                    filename = `${filename}.xls`;
                };
                window.navigator.msSaveBlob(blob, filename);
            } else {
                /* 谷歌浏览器 */
                var blobURL = window.URL.createObjectURL(blob);
                var tempLink = document.createElement("a");
                tempLink.style.display = "none";
                tempLink.href = blobURL;
                tempLink.setAttribute("download", filename);
                if (typeof tempLink.download === "undefined") {
                    tempLink.setAttribute("target", "_blank");
                };
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(blobURL);
            }
        }
    },
    watch:{
      
    }
};
</script>
<style scoped>
    .title{
        margin-bottom: 5px;
    }
    .el-form-item{
        margin-bottom: 40px;
    }
</style>


