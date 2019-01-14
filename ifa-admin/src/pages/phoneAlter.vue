<template>
    <div class="wrapper specialPage">
        <el-row class="table-btn-row search">
            <el-col :span="24">
                <el-form :inline="true" :model="pagination">
                    <el-form-item label="账号">
                        <el-input clearable v-model="pagination.account" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号">
                        <el-input clearable v-model="pagination.newMobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="旧手机号">
                        <el-input clearable v-model="pagination.oldMobile" placeholder="请输入旧手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="medium" type="primary" @click="getMobileInfo">搜索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

        <el-row class="table-btn-row">
            <el-col :span="24">
                <el-table :data="tableData" header-cell-class-name="tableHeaderStyle" row-class-name="tableRowStyle" size="medium" border style="width: 100%">
                    <el-table-column label="账号" prop="account"></el-table-column>
                    <el-table-column label="旧手机号" prop="oldMobile"></el-table-column>
                    <el-table-column label="手机号" prop="newMobile"></el-table-column>
                    <el-table-column label="变更时间" prop="createDate"></el-table-column>
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
import { getPhoneAlterList } from "@/assets/http/l_http";

export default {
  name: "phoneAlter",
  data() {
    return {
      tableData: [],
      pagination: {
        pageSize: 15,
        currentPage: 1,
        totalCount: 0, //初始回归0
        account: '',
        newMobile: '',
        oldMobile: ''
      }
    };
  },
  created() {
        let _hasParamsMobile = this.$route.params.account;
        if(_hasParamsMobile){
            this.pagination.account = _hasParamsMobile;
        };
        this.getMobileInfo();
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
    getMobileInfo() {
        getPhoneAlterList.call(this, this.pagination);
    },
    handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getMobileInfo();
    },
    handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.getMobileInfo();
    }
  }
};
</script>

<style>
    .specialPage .tableRowStyle td{
        padding:  9px 5px!important;
    }
</style>
