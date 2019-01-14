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
                    <el-table-column label="是否可用">
                        <template slot-scope="scope">
                            {{scope.row.state == 2 ? '默认' : (scope.row.state == 0 ? '否': '是')}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" label="创建时间">
                    </el-table-column>
                     <el-table-column prop="updateDate" label="修改时间">
                    </el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="edit(scope.row)">修改</el-button>
                            <el-button type="text" size="small" @click="del(scope.row)" v-if="scope.row.state != 2">删除</el-button>
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
import { getBirthManList, birthManageDel } from '@/assets/http/l_http';
export default {
  name: "birthManage",
  data() {
    return {
        hasDefault: 0,
        tableData: [],
        pagination: {
            pageSize: 15,
            currentPage: 1,
            totalCount: 0 //初始回归0
        }
    };
  },
  created() {
        this.getBirthList();
  },
  methods: {
      getBirthList(){
          getBirthManList.call(this,this.pagination);
      },
    edit(rowData) {
        this.$router.push({
            path: "/birthmanage/edit",
            query: {
                id: rowData.id
            }
        });
    },
    check(rowData){
        this.$router.push({
            path: "/birthmanage/detail",
            query: {
                id: rowData.id
            }
        });
    },
    del(rowData) {
        this.$confirm("确认删除该生日记录吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(() => {
           birthManageDel.call(this,{id: rowData.id});
        }).catch(() => {});
    },
    add() {
        this.$router.push({
            path: "/birthmanage/add",
            query: {
                has: this.hasDefault
            }
        });
    },
    handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getBirthList();
    },
    handleCurrentChange(val) {
        this.pagination.currentPage = val;
        this.getBirthList();
    }
  }
};
</script>

<style scoped>
</style>
