<template>
  <!-- 定义 页面加载效果 -->
  <div class="container" v-loading="loading">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="location">
        <el-select v-model="ruleForm.location" placeholder="请选择地址">
          <el-option
            v-for="item in locationData"
            :key="item.addressid"
            :label="item.addressname"
            :value="item.addressid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="level">
        <el-select v-model="ruleForm.level" placeholder="请选择等级">
          <el-option
            v-for="item in levelData"
            :key="item.jrid"
            :label="item.levelname"
            :value="item.jrid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
          name="sfile"
          class="upload-demo"
          action="http://47.92.82.13:4000/getMessageA"
          multiple
          :on-success="sfileSuccess"
          :limit="1"
          :file-list="fileList"
        >
          <el-button class="btn" size="small" type="primary"
            >头像上传</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-upload
          name="sweixin"
          class="upload-demo"
          action="http://47.92.82.13:4000/getMessageB"
          multiple
          :limit="1"
          :on-success="weixinSuccess"
          :file-list="fileList"
        >
          <el-button class="btn" size="small" type="primary"
            >微信上传</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="isUpdate"
          type="primary"
          @click="updateForm('ruleForm')"
          >修改</el-button
        >
        <el-button v-else type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >

        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { locationList } from "@/api/location";
import { levelList } from "@/api/level";
import {
  addInformation,
  informationId,
  udInformation,
} from "@/api/information";
export default {
  data() {
    return {
      isUpdate: false,
      loading: false,
      fileList: [],
      locationData: [],
      levelData: [],
      ruleForm: {
        name: "",
        location: "",
        tel: "",
        level: "",
        tcoin: "",
        weixin: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名字", trigger: "blur" }],
        level: [{ required: true, message: "请选择等级", trigger: "change" }],
        location: [
          { required: true, message: "请选择地址", trigger: "change" },
        ],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
      },
    };
  },
  methods: {
    //获取下拉列表
    getSelData() {
      this.loading = true;
      let promiseLevel = new Promise((resolve, reject) => {
        levelList().then((res) => {
          this.levelData = res.data.data;
          resolve(res.data.data);
        });
      });
      let promiseAddress = new Promise((resolve, reject) => {
        locationList().then((res) => {
          this.locationData = res.data.data;
          resolve(res.data.data);
        });
      });
      Promise.all([promiseLevel, promiseAddress]).then((res) => {
        this.loading = false;
      });
    },
    // 头像上传成功
    //保存提交表单时需要 传递后端的参数
    //此处是 tcoin保存的 上传图片的相对地址
    sfileSuccess(response) {
      //console.log(response);
      this.ruleForm.tcoin = response.headerurl;
    },
    // 微信二维码上传
    weixinSuccess(response) {
      console.log(response);
      this.ruleForm.weixin = response.weixinurl;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      //console.log(1);
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addInformation({
            uname: this.ruleForm.name,
            addressid: this.ruleForm.location,
            levelid: this.ruleForm.level,
            tel: this.ruleForm.tel,
            tcoin: this.ruleForm.tcoin,
            weixin: this.ruleForm.weixin,
          }).then((res) => {
           // console.log(res);
            this.$router.push("/information/list3");
          });
        } else {
          this.$message.error("表单内容有误");
          return false;
        }
      });
    },

    //初始化求改
    updateInit(id) {
      if (id) {
        this.isUpdate = true;
      }
      informationId({ id }).then((res) => {
        let list = res.data.data[0];
        console.log(list);
        this.ruleForm.name = list.jrname;
        this.ruleForm.location = list.jraddressesid;
        this.ruleForm.level = list.jrlevel;
        this.ruleForm.tel = list.jrtel;
        this.ruleForm.tcoin = list.tcoin;
        this.ruleForm.weixin = list.weixin;
      });
    },
    //提交修改
    updateForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          udInformation({
            id:this.$route.query.id,
            uname: this.ruleForm.name,
            addressid: this.ruleForm.location,
            levelid: this.ruleForm.level,
            tel: this.ruleForm.tel,
          }).then((res) => {
            console.log(res);
            this.$router.push("/information/list3");
          });
        } else {
          this.$message.error("请输入正确信息");
          return false;
        }
      });
    },
  },
  created() {
    this.getSelData();
    this.updateInit(this.$route.query.id);
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 500px;
  margin: 100px 150px;
}
// .btn{
//   margin-left: 100px;
// }
</style>