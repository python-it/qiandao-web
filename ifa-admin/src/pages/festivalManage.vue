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
                    <el-table-column prop="title" label="节日标题">
                    </el-table-column>
                    <el-table-column label="日期">
                         <template slot-scope="scope">
                            {{scope.row.remindDate.split(" ")[0] ? scope.row.remindDate.split(" ")[0]:scope.row.remindDate}}
                        </template>
                    </el-table-column>
                    <el-table-column label="是否可用" width="100">
                        <template slot-scope="scope">
                            {{scope.row.status == 0?'否':'是'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="修改时间">
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
import { getFestivalManList, festivalManageDel } from '@/assets/http/l_http';
export default {
  name: "festivalManage",
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
        this.getFestList();
  },
  methods: {
      getFestList(){
          getFestivalManList.call(this,this.pagination);
      },
    edit(rowData) {
      this.$router.push({
        path: "/festmanage/edit",
        query: {
          id: rowData.id
        }
      });
    },
    check(rowData){
        this.$router.push({
            path: "/festmanage/detail",
            query: {
            id: rowData.id
            }
        });
    },
    del(rowData) {
      this.$confirm("确认删除该节日记录吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
           festivalManageDel.call(this,{id: rowData.id});
        }).catch(() => {

        });
    },
    add() {
        this.$router.push({
            path: "/festmanage/add"
        });
    },
    handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getFestList();

    },
    handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.getFestList();
    }
  }
};
</script>

<style scoped>
</style>
