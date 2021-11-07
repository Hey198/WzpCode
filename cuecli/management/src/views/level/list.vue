<template>
  <div class="app-container">
    <div class="table-data">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="150">
        </el-table-column>
        <el-table-column prop="levelname" label="级别名称"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <!-- //  事件处理函数 传入参数 scope.row 把整行元素传入// -->
            <el-button
              @click.native.prevent="deleteRow(scope.row)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { levelList, delLevel } from "@/api/level";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取列表
    getList() {
      levelList().then((res) => {
        this.tableData = res.data.data;
        //console.log(res);
      });
    },

    //删除记录
    deleteRow(item) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //console.log(item);
          //传参删除
          delLevel({ levelid: item.jrid }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //删除之后 重新获取数据  显示删除后的表单
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>