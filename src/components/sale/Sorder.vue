<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>出库申请</el-breadcrumb-item>
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
              <el-autocomplete
                v-model="form.medicineId"
                :fetch-suggestions="querySearchAsync"
                placeholder="选择药品ID"
              ></el-autocomplete>
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
      medicineList: [],
      form: {
        userNumber: '',
        medicineId: '',
        outstockAmount: '',
        outstockApplyRemark: '',
        outstockApplyCategory: ''
      },
      restaurants: [],
      state: '',
      timeout: null
    }
  },
  methods: {
    async onSubmit() {
      const { data: res } = await this.$http.post('/outstockManage/outstock', this.form)
      this.$message.success(res.message)
      console.log('submit!')
      this.form = ''
    },
    cls() {
      this.$refs.fromRef.resetFields()
    },
    loadAll() {
      // const { data: res } = await this.$http.get('suppliers')
      // console.log(res)
      return [
        { value: '1000001' },
        { value: '1000002' },
        { value: '1000003' },
        { value: '1000004' },
        { value: '1000005' },
        { value: '1000006' },
        { value: '1000007' },
        { value: '1000008' },
        { value: '1000009' },
        { value: '1000010' },
        { value: '1000011' },
        { value: '1000012' },
        { value: '1000013' },
        { value: '1000014' },
        { value: '1000015' },
        { value: '1000016' },
        { value: '1000017' },
        { value: '1000018' },
        { value: '1000019' },
        { value: '1000020' },
        { value: '1000021' },
        { value: '1000022' },
        { value: '1000023' },
        { value: '1000024' }
      ]
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
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
