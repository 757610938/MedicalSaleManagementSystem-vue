<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" style="position:absolute; left:85%">
          <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="list" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
        <el-table-column label="编号" prop="medicineId" width="150"></el-table-column>
        <el-table-column label="批准文号" prop="medicineApprovalNumber" width="300"></el-table-column>
        <el-table-column label="药品名" prop="medicineName" width="200"></el-table-column>
        <el-table-column label="药品英文名称" prop="medicineEnglishName" width="200"></el-table-column>
        <el-table-column label="剂型种类" prop="medicineDosageformCategory" width="150"></el-table-column>
        <el-table-column label="生产单位" prop="medicineManufacturer" width="250"></el-table-column>
        <el-table-column label="生产单位地址" width="500" prop="medicineManufacturingAddress"></el-table-column>
        <el-table-column label="规格" width="150" prop="medicineSpecification"></el-table-column>
        <el-table-column label="药品种类" prop="medicineCategory" width="150"></el-table-column>
        <el-table-column label="批准日期" prop="medicineApprovaldate" width="200" :formatter="dataFormat"></el-table-column>
        <el-table-column label="原批准文号" width="300" prop="medicineOriginalApprovalNumber"></el-table-column>
        <el-table-column label="国产药/进口药" prop="medicineCountry" width="150"></el-table-column>
        <el-table-column label="进货价" prop="medicinePurchasePrice" width="150"></el-table-column>
        <el-table-column label="零售价" prop="medicineRetailPrice" width="150"></el-table-column>
        <el-table-column label="批发价" prop="medicineWholesalePrice" width="150"></el-table-column>
        <el-table-column label="药品供应商名" prop="supplierName" width="200"></el-table-column>
        <el-table-column label="药品库存量" prop="stochAmount" width="150"></el-table-column>
        <el-table-column label="药品存放仓库" prop="whseName" width="200"></el-table-column>
        <!-- <el-table-column label="创建时间" prop="time" width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="130px" fixed="right">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showDialog(scope.row.medicineId)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="removeById(scope.row.medicineId)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加信息" :visible.sync="addDialogVisible" width="45%" @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="110px">
        <el-form-item label="批准文号" prop="medicineApprovalNumber">
          <el-input v-model="addForm.medicineApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="药品名" prop="medicineName">
          <el-input v-model="addForm.medicineName"></el-input>
        </el-form-item>
        <el-form-item label="药品英文名称" prop="medicineEnglishName">
          <el-input v-model="addForm.medicineEnglishName"></el-input>
        </el-form-item>
        <el-form-item label="剂型种类" prop="medicineDosageformCategory">
          <el-input v-model="addForm.medicineDosageformCategory"></el-input>
        </el-form-item>
        <el-form-item label="生产单位" prop="medicineManufacturer">
          <el-input v-model="addForm.medicineManufacturer"></el-input>
        </el-form-item>
        <el-form-item label="生产单位地址" prop="medicineManufacturingAddress">
          <el-input v-model="addForm.medicineManufacturingAddress"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="medicineSpecification">
          <el-input v-model="addForm.medicineSpecification"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" prop="medicineCategory">
          <el-input v-model="addForm.medicineCategory"></el-input>
        </el-form-item>
        <el-form-item label="批准日期" prop="medicineApprovaldate">
          <el-date-picker v-model="addForm.medicineApprovaldate"></el-date-picker>
        </el-form-item>
        <el-form-item label="原批准文号" prop="medicineOriginalApprovalNumber">
          <el-input v-model="addForm.medicineOriginalApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="国产药/进口药" prop="medicineCountry">
          <el-input v-model="addForm.medicineCountry"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="medicinePurchasePrice">
          <el-input v-model="addForm.medicinePurchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="medicineRetailPrice">
          <el-input v-model="addForm.medicineRetailPrice"></el-input>
        </el-form-item>
        <el-form-item label="批发价" prop="medicineWholesalePrice">
          <el-input v-model="addForm.medicineWholesalePrice"></el-input>
        </el-form-item>
<!--        <el-form-item label="药品供应商名" prop="supplierName">-->
<!--          <el-input v-model="addForm.supplierName" disabled></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="药品库存量" prop="stochAmount">-->
<!--          <el-input v-model="addForm.stochAmount" disabled></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="药品存放仓库" prop="whseName">-->
<!--          <el-input v-model="addForm.whseName" disabled></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMedicline">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="mediclineDialogVisible" width="45%" @close="supplierDialogClose">
      <el-form :model="meidcineFrom" :rules="meidcineFromRules" ref="meidcineFromRef" label-width="110px">
        <el-form-item label="批准文号" prop="medicineApprovalNumber">
          <el-input v-model="meidcineFrom.medicineApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="药品名" prop="medicineName">
          <el-input v-model="meidcineFrom.medicineName"></el-input>
        </el-form-item>
        <el-form-item label="药品英文名称" prop="medicineEnglishName">
          <el-input v-model="meidcineFrom.medicineEnglishName"></el-input>
        </el-form-item>
        <el-form-item label="剂型种类" prop="medicineDosageformCategory">
          <el-input v-model="meidcineFrom.medicineDosageformCategory"></el-input>
        </el-form-item>
        <el-form-item label="生产单位" prop="medicineManufacturer">
          <el-input v-model="meidcineFrom.medicineManufacturer"></el-input>
        </el-form-item>
        <el-form-item label="生产单位地址" prop="medicineManufacturingAddress">
          <el-input v-model="meidcineFrom.medicineManufacturingAddress"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="medicineSpecification">
          <el-input v-model="meidcineFrom.medicineSpecification"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" prop="medicineCategory">
          <el-input v-model="meidcineFrom.medicineCategory"></el-input>
        </el-form-item>
        <el-form-item label="批准日期" prop="medicineApprovaldate">
          <el-input v-model="meidcineFrom.medicineApprovaldate"></el-input>
        </el-form-item>
        <el-form-item label="原批准文号" prop="medicineOriginalApprovalNumber">
          <el-input v-model="meidcineFrom.medicineOriginalApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="国产药/进口药" prop="medicineCountry">
          <el-input v-model="meidcineFrom.medicineCountry"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="medicinePurchasePrice">
          <el-input v-model="meidcineFrom.medicinePurchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="medicineRetailPrice">
          <el-input v-model="meidcineFrom.medicineRetailPrice"></el-input>
        </el-form-item>
        <el-form-item label="批发价" prop="medicineWholesalePrice">
          <el-input v-model="meidcineFrom.medicineWholesalePrice"></el-input>
        </el-form-item>
<!--        <el-form-item label="药品供应商名" prop="supplierName">-->
<!--          <el-input v-model="meidcineFrom.supplierName" disabled></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="药品库存量" prop="stochAmount">-->
<!--          <el-input v-model="meidcineFrom.stochAmount" disabled></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="药品存放仓库" prop="whseName">-->
<!--          <el-input v-model="meidcineFrom.whseName" disabled></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mediclineDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Info">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // var checkMobile = (rule, value, cb) => {
    //   const regMobile = /^1[34578]\d{9}$/
    //   if (regMobile.test(value)) {
    //     return cb()
    //   }
    //   cb(new Error('请输入合法的手机号码'))
    // }
    return {
      queryInfo: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      list: [{ supplierName: '122154' }],
      total: 0,
      addDialogVisible: false,
      addForm: {
        medicineApprovalNumber: '',
        medicineName: '',
        medicineEnglishName: '',
        medicineDosageformCategory: '',
        medicineManufacturer: '',
        medicineManufacturingAddress: '',
        medicineSpecification: '',
        medicineCategory: '',
        medicineApprovaldate: '',
        medicineOriginalApprovalNumber: '',
        medicineCountry: '',
        medicinePurchasePrice: '',
        medicineRetailPrice: '',
        medicineWholesalePrice: '',
        supplierName: '',
        stochAmount: '',
        whseName: ''
      },
      addFormRules: {},
      mediclineDialogVisible: false,
      meidcineFrom: {},
      meidcineFromRules: {},
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // const res = await this.$http.get('medicines/' + '1/' + '10/')
      // console.log(res)
      this.$http
        .get(
          'medicines/' +
            this.queryInfo.pageNum +
            '/' +
            this.queryInfo.pageSize +
            '/' +
            this.queryInfo.name
        )
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.list = response.data.data.list
            this.total = response.data.data.total
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error)
        })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getList()
    },
    addDialogClose() {
      setTimeout(() => {
        this.$refs.addFormRef.resetFields()
      }, 500)
    },
    addMedicline() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写真缺的用户信息')
        // //发送请求完成添加用户的操作
        // const { data: res } = await this.$http.post('users', this.addForm)
        // //判断如果添加失败，就做提示
        // if (res.meta.status !== 200) return this.$message.error('添加用户失败')
        // //添加成功的提示
        this.$http
          .post('medicine', this.addForm)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success('添加用户成功')
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error)
          })
        this.addDialogVisible = false
        this.getList()
      })
    },
    async showDialog(id) {
      //   const { data: res } = await this.$http.get('users/' + id)
      //   if (res.meta.status !== 200)
      //     return this.$message.error('获取用户信息失败')
      //   this.stockForm = res.data
      this.$http
        .get('medicine/' + id)
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.meidcineFrom = response.data.data.medicineVO
            console.log(id)
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error)
        })
      this.mediclineDialogVisible = true
    },
    supplierDialogClose() {
      setTimeout(() => {
        this.$refs.meidcineFromRef.resetFields()
      }, 500)
    },
    Info() {
      const res = this.meidcineFrom
      this.$refs.meidcineFromRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        // const { data: res } = await this.$http.put(
        //   'users/' + this.editForm.id,
        //   this.editForm
        // )
        // if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$http
          .put('medicine', res)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success('修改信息成功')
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error)
          })
        this.mediclineDialogVisible = false
        setTimeout(() => {
          this.getList()
        }, 1000)
      })
    },
    async removeById(id) {
      const confirmResult = await this.$confirm(
        '此操作将永久删除该信息, 是否继续?',
        '提示',
        {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      // //发送请求根据id完成删除操作
      // const { data: res } = await this.$http.delete('users/' + id)
      // //判断如果删除失败，就做提示
      // if (res.meta.status !== 200) return this.$message.error('删除用户失败')
      // this.getUserList()
      this.$http
        .delete('medicine/' + id)
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.$message.success(response.data.message)
            this.getList()
            console.log(id)
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error)
        })
      console.log(confirmResult)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    dataFormat: function(row, column) {
      var t = new Date(row.medicineApprovaldate)
      var year = t.getFullYear()
      var month = t.getMonth() + 1
      var day = t.getDate()
      var hour = t.getHours()
      var min = t.getMinutes()
      var sec = t.getSeconds()
      var newTime =
        year +
        '-' +
        (month < 10 ? '0' + month : month) +
        '-' +
        (day < 10 ? '0' + day : day) +
        ' ' +
        (hour < 10 ? '0' + hour : hour) +
        ':' +
        (min < 10 ? '0' + min : min) +
        ':' +
        (sec < 10 ? '0' + sec : sec)
      return newTime
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  margin-top: 20px;
}
</style>
