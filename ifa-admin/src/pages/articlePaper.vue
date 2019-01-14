<template>
       <div class="wrapper">
            <el-row class="table-btn-row">
                <el-col :span="24">
                    <el-button size="medium" type="primary" @click="add">新增早报</el-button>
                </el-col>
            </el-row>
            <el-row class="table-btn-row">
                <el-col :span="24">
                    <el-table 
                        :data="tableData"
                        header-cell-class-name="tableHeaderStyle"
                        row-class-name="tableRowStyle"
                        size="medium" 
                        border
                        style="width: 100%">
                        <el-table-column label="早报标题">
                            <template slot-scope="scope">
                                <div style="width: 100%">
                                    <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
                                        <div class="tooltip_wraper">{{scope.row.title}}</div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="发布状态">
                            <template slot-scope="scope">
                                {{scope.row.status == '1' ? '已发布' : '未发布'}}
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" prop="createTime"></el-table-column>
                        <el-table-column label="修改时间" prop="updateTime"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                                <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                                <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="text_right">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pagination.currentPage"
                        :page-sizes="[15, 30, 45, 60]"
                        :page-size="pagination.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pagination.totalCount">
                    </el-pagination>
                </el-col>
            </el-row>
       </div>
</template>

<script>
import { artPaperList, delArtPaper } from "@/assets/http/l_http";

export default {
  name: "articlePaper",
  data() {
    return {
        tableData: [],
        pagination:{
            pageSize: 15,
            currentPage: 1,
            totalCount: 0,  //初始回归0
        }
    };
  },
    created(){
        this.getArtPaperList();
    },
  methods: {
        getArtPaperList(){
            artPaperList.call(this, this.pagination);
        },
      see(rowData){
        this.$router.push({
            path:'/mornpaper/detail',
            query:{
                id: rowData.id
            }
        })
      },
      edit(rowData){
           this.$router.push({
                path:'/mornpaper/edit',
                query:{
                    id: rowData.id
                }
            })
      },
      del(rowData){
            if(rowData.status == 1){
                this.$notify.info({
                    title: '提示',
                    message: '已发布早报不允许删除！'
                });
            }else{
                this.$confirm('确认删除该早报吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delArtPaper.call(this, {id: rowData.id});
                }).catch(() => {
                           
                });
            }
      },
      add(){    
          this.$router.push({
              path:'/mornpaper/add'
          })
      },
        handleSizeChange(val) {
            this.pagination.pageSize = val;
            this.getArtPaperList();
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            this.getArtPaperList();
        }
  }
};
</script>

<style scoped>

</style>
