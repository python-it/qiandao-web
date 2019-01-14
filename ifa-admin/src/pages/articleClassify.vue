<template>
    <div class="wrapper">
        <el-row class="table-btn-row">
            <el-col :span="24">
                <el-button size="medium" type="primary" @click="add">新增分类</el-button>
            </el-col>
        </el-row>
        <el-row class="table-btn-row">
            <el-col :span="24">
                <el-table :data="tableData" header-cell-class-name="tableHeaderStyle" row-class-name="tableRowStyle" size="medium" border style="width: 100%">
                    <el-table-column prop="typeName" label="分类名称" width="200">
                    </el-table-column>
                    <el-table-column label="分类描述">
                        <template slot-scope="scope">
                            <div style="width: 100%">
                                <el-tooltip class="item" effect="dark" :content="scope.row.typeDescribe" placement="top">
                                    <div class="tooltip_wraper">{{scope.row.typeDescribe}}</div>
                                </el-tooltip>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
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
import { artClasList, artClasDel } from '@/assets/http/l_http';
export default {
  name: "articleClassify",
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
        this.getArtClasList();
  },
  methods: {
      getArtClasList(){
          artClasList.call(this,this.pagination);
      },
    edit(rowData) {
      this.$router.push({
        path: "/artclassify/edit",
        query: {
          id: rowData.id
        }
      });
    },
    del(rowData) {
      if (rowData.articleNum != 0) {
        this.$notify.info({
            title: "提示",
            duration: 2000,
            message: "该分类存在文章，不允许删除！"
        });
      } else {
        this.$confirm("确定删除该分类吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
           artClasDel.call(this,{id: rowData.id});
        }).catch(() => {

        });
      }
    },
    add() {
       if(this.pagination.totalCount < 5){
            this.$router.push({
                path: "/artclassify/add"
            });
       }else{
            this.$notify.info({
                title: "提示",
                duration: 2000,
                message: "分类最多新增5条记录！"
            });
       };
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
        this.getArtClasList();

    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
        this.getArtClasList();
    }
  }
};
</script>

<style scoped>
</style>
