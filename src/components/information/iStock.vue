<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>退货入库申请</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="formRef" :model="form" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库操作员：">
              <el-input v-model="form.userNumber" placeholder="请输入工号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="出库药品：">
              <el-input v-model="form.medicineId" placeholder="请输入药品ID"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="出库类型:">
              <el-radio-group v-model="form.outstockApplyCategory">
                <el-radio label="销售出库"></el-radio>
                <el-radio label="采购退货"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="出库数量：">
              <el-input v-model="form.outstockAmount" placeholder="请输入药品数量"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="出库备注：">
          <el-input type="textarea" v-model="form.outstockApplyRemark" placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cls">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        userNumber: '',
        medicineId: '',
        outstockAmount: '',
        outstockApplyRemark: '',
        outstockApplyCategory: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      const { data: res } = await this.$http.post('/outstockManage/outstock', this.form)
      this.$message.success(res.message)
      console.log('submit!')
    },
    cls() {
      this.$refs.fromRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  margin-top: 20px;
}
.from-inline {
  margin-left: 20px;
}
.from-inlines {
  margin-left: 30px;
}
</style>
