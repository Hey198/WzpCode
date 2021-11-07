<template>
  <div class="app-container">
    <div class="table-data">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="150">
        </el-table-column>
        <el-table-column prop="addressname" label="地址" width="150">
        </el-table-column>
        <el-table-column prop="longitude" label="经度"> </el-table-column>
        <el-table-column prop="latitude" label="纬度"> </el-table-column>
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
import { locationList, delLocation } from "@/api/location";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    //获取位置信息
    getList() {
      locationList().then((res) => {
        console.log(res);
        this.tableData = res.data.data;
        // console.log(prop);
      });
    },
    deleteRow(item) {
      this.$confirm("此操作将永久删除该操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(item);
          delLocation({addressid:item.addressid}).then(() => {
              this.getList();
            this.$message({
              type: "success",
              message: "删除成功!",
            });
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
  created() {
    this.getList();
  },
};
</script>