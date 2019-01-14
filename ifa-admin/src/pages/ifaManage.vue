<template>
    <div class="wrapper">
        <!-- <el-row class="table-btn-row">
            <el-col :span="24">
            </el-col>
        </el-row> -->
        <el-row class="table-btn-row">
            <el-col :span="24">
                <el-table :data="tableData" header-cell-class-name="tableHeaderStyle" row-class-name="tableRowStyle" size="medium" border style="width: 100%">
                    <el-table-column label="账号" prop="account"></el-table-column>
                    <el-table-column label="手机号" prop="mobile" width="200"></el-table-column>
                    <el-table-column label="昵称" prop="nickName"></el-table-column>
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="注册时间" prop="createTime"></el-table-column>
                    <el-table-column label="最近登录时间" prop="loginTime"></el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
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
import { ifaManList } from "@/assets/http/l_http";

export default {
  name: "ifaManage",
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
    this.getIfaManList();
  },
  methods: {
    see(rowData) {
      this.$router.push({
        path: "/usermanage/detail",
        query: {
            id: rowData.id
        }
      });
    },
    getIfaManList() {
      ifaManList.call(this, this.pagination);
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
        this.getIfaManList();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
        this.getIfaManList();
    }
  }
};
</script>

<style scoped>
</style>
