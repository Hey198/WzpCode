<template>
   <div class="container" v-loading="loadng"><!--等待加载 -->
    <!-- 表单验证:rules="rules" -->
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="等级名称" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {addLevel} from '@/api/level'
export default {
  data() {
    return {
        loading:false,
      form: {
        title: "",
      },
      rules: {
        title: [{ required: true, message: "请填写等级名称", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
            this.loading="true"
            //传回数据库一个对象 在此是需要添加的职位名称
            addLevel({levelname:this.form.title}).then((res)=>{
                console.log(res);
                this.loading="false";
                this.$router.push('/level/list')

            })
        } else {
            this.$message.console.error('请填写正确信息');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$color: blue;
.container {
  width: 500px;
  margin: 200px;
}
</style>