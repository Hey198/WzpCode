<template>
  <div class="app-container">
    <div class="form-bar">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="地址">
          <el-select v-model="locationId" placeholder="选择地址">
            <el-option
              v-for="item in locationData"
              :key="item.addressid"
              :label="item.addressname"
              :value="item.addressid"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandle">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="jrname" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="levelname" label="等级" width="180">
      </el-table-column>
      <el-table-column prop="addressname" label="地址"> </el-table-column>
      <el-table-column prop="jrtel" label="手机号"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="updateBtn(scope.row)"
            type="text"
            size="small"
            icon="el-icon-edit"
          >
            修改
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteBtn(scope.row)"
            type="text"
            size="small"
            icon="el-icon-delete"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { locationList } from "@/api/location";
import {
  informationList,
  messageByAddress,
  delInformation,
} from "@/api/information";
export default {
  data() {
    return {
      locationId: "",
      tableData: [],
      locationData: [],
    };
  },
  //获取信息列表
  methods: {
    getList() {
      informationList().then((res) => {
        console.log(res);
        this.tableData = res.data.data;
      });
    },
    //筛选框内 获取地址列表
    getLocation() {
      locationList().then((res) => {
        this.locationData = res.data.data;
      });
    },
    //按地址筛选
    searchHandle() {
      messageByAddress().then((res) => {
        console.log(res);
      });
    },
    //重置页面
    resetSearch() {
      this.getList();
      this.locationId = "";
    },

    //信息修改

    //点击修改按钮
    updateBtn(item) {
      this.$router.push({
        path: "/information/add3",
        query: {
          id: item.jrid,
        },
      });
    },

    //点击删除
   deleteBtn(item) {
      this.$confirm("此操作将永久删除该操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
         // console.log(item);
          //传参问题
          delInformation({id:item.jrid}).then(() => {
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
    this.getLocation();
  },
};
</script>