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
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="昵称" prop="nickName"></el-table-column>
                    <el-table-column label="手机号" prop="mobile"></el-table-column>
                    <el-table-column label="反馈时间" prop="createTime"></el-table-column>
                    <el-table-column label="手机型号" prop="phoneModel"></el-table-column>
                    <el-table-column label="系统型号" prop="systemModel"></el-table-column>
                    <el-table-column label="APP版本号" prop="appVersion"></el-table-column>
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
import { getOpinionList } from "@/assets/http/l_http";

export default {
  name: "opinionBack",
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
    this.getOpinion();
  },
  methods: {
    see(rowData) {
      this.$router.push({
        path: "/opinionback/detail",
        query: {
          id: rowData.id
        }
      });
    },
    getOpinion() {
      getOpinionList.call(this, this.pagination);
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
        this.getOpinion();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
        this.getOpinion();
    }
  }
};
</script>

<style scoped>
</style>
