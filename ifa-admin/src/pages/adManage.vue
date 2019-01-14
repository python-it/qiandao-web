<template>
    <div class="wrapper">
        <el-row class="table-btn-row">
            <el-col :span="24">
                <el-button size="medium" type="primary" @click="add">新增</el-button>
            </el-col>
        </el-row>
        <el-row class="table-btn-row">
            <el-col :span="24">
                <el-table :data="tableData" header-cell-class-name="tableHeaderStyle" row-class-name="tableRowStyle" size="medium" border style="width: 100%">
                    <el-table-column prop="adPositionDesc" label="广告位">
                    </el-table-column>
                    <el-table-column label="是否可用" width="200">
                        <template slot-scope="scope">
                            {{scope.row.state == 0 ?'否':'是'}}
                        </template>
                    </el-table-column>
                     <el-table-column prop="createDate" label="创建时间">
                    </el-table-column>
                     <el-table-column prop="updateDate" label="修改时间">
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                            <el-button type="text" size="small" @click="check(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="text_right">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.currentPage" :page-sizes="[15, 30, 45, 60]" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.totalCount">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getAdManageList, adManageDel } from '@/assets/http/l_http';
export default {
  name: "adManage",
  data() {
    return {
        tableData: [],
        pagination: {
            pageSize: 15,
            currentPage: 1,
            totalCount: 0, //初始回归0
            maxAvailableNum: 0,    //最多广告位数量
        }
    };
  },
  created() {
    this.getAdList();
  },
  methods: {
        getAdList(){
            getAdManageList.call(this,this.pagination);
        },
        check(rowData){
            // 查看
            this.$router.push({
                path: "/admanage/detail",
                query: {
                    id: rowData.id
                }
            });
        },
        edit(rowData) {
            this.$router.push({
                path: "/admanage/edit",
                query: {
                    id: rowData.id
                }
            });
        },
        del(rowData) {
            this.$confirm("确认删除该广告位记录吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                adManageDel.call(this,{id: rowData.id});
            }).catch(() => {

            });
        },
        add() {
            if(this.pagination.maxAvailableNum != 0){
                this.$router.push({
                    path: "/admanage/add"
                });
            }else{
                this.$notify.info({
                    title: "提示",
                    duration: 2000,
                    message: `广告最多新增${this.pagination.totalCount}条记录！`
                });
            };
        },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            this.getAdList();
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            this.getAdList();
        }
    }
};
</script>

<style scoped>
</style>
