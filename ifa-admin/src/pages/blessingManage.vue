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
                    <el-table-column prop="sentimentTypeDesc" label="分类">
                    </el-table-column>
                    <el-table-column label="是否可用" width="200">
                        <template slot-scope="scope">
                            {{scope.row.state == 0?'否':'是'}}
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
import { getBlessingManaList, getBlessingManaDel } from '@/assets/http/l_http';
export default {
  name: "blessingManage",
  data() {
    return {
        tableData: [],
        pagination: {
            pageSize: 15,
            currentPage: 1,
            totalCount: 0 //初始回归0
        }
    };
  },
  created() {
        this.getBlesList();
  },
  methods: {
      getBlesList(){
          getBlessingManaList.call(this,this.pagination);
      },
      check(rowData){
        this.$router.push({
            path: "/blesmanage/detail",
            query:{
                id: rowData.id
            }
        });
      },
    edit(rowData) {
        this.$router.push({
            path: "/blesmanage/edit",
            query: {
                id: rowData.id
            }
        });
    },
    del(rowData) {
        this.$confirm("确认删除该祝福语吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
            getBlessingManaDel.call(this,{id: rowData.id});
        }).catch(() => {

        });
    },
    add() {
        this.$router.push({
            path: "/blesmanage/add"
        });
    },
    handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getBlesList();
    },
    handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.getBlesList();
    }
  }
};
</script>

<style scoped>
</style>
