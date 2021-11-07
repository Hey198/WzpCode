<template>
  <div class="app-container">
    <!--等待加载 -->
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-form"
    >
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="form.longitude"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="form.latitude"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { addLocation } from "@/api/location";
export default {
  data() {
    return {
      form: {
        address: "",
        longitude: "",
        latitude: "",
      },
      rules: {
        address: [{ required: true, message: "请输入位置", trigger: "blur" }],
        longitude: [{ required: true, message: "请输入经度", trigger: "blur" }],
        latitude: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert("submit!");
          addLocation({
            address: this.form.address,
            longitude: this.form.longitude,
            latitude: this.form.latitude,
            //跳转页面 通过 router路由页面内配置的path 路径进行配置跳转地址
          }).then(() => this.$router.push('/location/list2'));
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 500px;
  margin: 100px;
}
</style>