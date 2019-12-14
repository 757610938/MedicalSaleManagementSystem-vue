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
        <el-table-column label="批准文号" prop="meidcineApprovalNumber" width="300"></el-table-column>
        <el-table-column label="药品名" prop="meidcineName" width="200"></el-table-column>
        <el-table-column label="药品英文名称" prop="meidcineEnglishName" width="200"></el-table-column>
        <el-table-column label="剂型种类" prop="meidcineDosageformCategory" width="150"></el-table-column>
        <el-table-column label="生产单位" prop="meidcineManufacturer" width="250"></el-table-column>
        <el-table-column label="生产单位地址" width="500" prop="meidcineManufacturingAddress"></el-table-column>
        <el-table-column label="规格" width="150" prop="meidcineSpecification"></el-table-column>
        <el-table-column label="药品种类" prop="meidcineCategory" width="150"></el-table-column>
        <el-table-column label="批准日期" prop="meidcineApprovaldate" width="200"></el-table-column>
        <el-table-column label="原批准文号" width="300" prop="meidcineOriginalApprovalNumber"></el-table-column>
        <el-table-column label="国产药/进口药" prop="meidcineCountry" width="150"></el-table-column>
        <el-table-column label="进货价" prop="meidcinePurchasePrice" width="150"></el-table-column>
        <el-table-column label="零售价" prop="meidcineRetailPrice" width="150"></el-table-column>
        <el-table-column label="批发价" prop="meidcineWholesalePrice" width="150"></el-table-column>
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
                @click="showDialog(scope.row.meidcineId)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="removeById(scope.row.meidcineId)"
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
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="批准文号" prop="meidcineApprovalNumber">
          <el-input v-model="addForm.meidcineApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="药品名" prop="meidcineName">
          <el-input v-model="addForm.meidcineName"></el-input>
        </el-form-item>
        <el-form-item label="药品英文名称" prop="meidcineEnglishName">
          <el-input v-model="addForm.meidcineEnglishName"></el-input>
        </el-form-item>
        <el-form-item label="剂型种类" prop="meidcineDosageformCategory">
          <el-input v-model="addForm.meidcineDosageformCategory"></el-input>
        </el-form-item>
        <el-form-item label="生产单位" prop="meidcineManufacturer">
          <el-input v-model="addForm.meidcineManufacturer"></el-input>
        </el-form-item>
        <el-form-item label="生产单位地址" prop="meidcineManufacturingAddress">
          <el-input v-model="addForm.meidcineManufacturingAddress"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="meidcineSpecification">
          <el-input v-model="addForm.meidcineSpecification"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" prop="meidcineCategory">
          <el-input v-model="addForm.meidcineCategory"></el-input>
        </el-form-item>
        <el-form-item label="批准日期" prop="meidcineApprovaldate">
          <el-input v-model="addForm.meidcineApprovaldate"></el-input>
        </el-form-item>
        <el-form-item label="原批准文号" prop="meidcineOriginalApprovalNumber">
          <el-input v-model="addForm.meidcineOriginalApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="国产药/进口药" prop="meidcineCountry">
          <el-input v-model="addForm.meidcineCountry"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="meidcinePurchasePrice">
          <el-input v-model="addForm.meidcinePurchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="meidcineRetailPrice">
          <el-input v-model="addForm.meidcineRetailPrice"></el-input>
        </el-form-item>
        <el-form-item label="批发价" prop="meidcineWholesalePrice">
          <el-input v-model="addForm.meidcineWholesalePrice"></el-input>
        </el-form-item>
        <el-form-item label="药品供应商名" prop="supplierName">
          <el-input v-model="addForm.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="药品库存量" prop="stochAmount">
          <el-input v-model="addForm.stochAmount"></el-input>
        </el-form-item>
        <el-form-item label="药品存放仓库" prop="whseName">
          <el-input v-model="addForm.whseName" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMedicline">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="mediclineDialogVisible" width="45%" @close="supplierDialogClose">
      <el-form :model="meidcineFrom" :rules="meidcineFromRules" ref="meidcineFromRef" label-width="100px">
        <el-form-item label="批准文号" prop="meidcineApprovalNumber">
          <el-input v-model="meidcineFrom.meidcineApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="药品名" prop="meidcineName">
          <el-input v-model="meidcineFrom.meidcineName"></el-input>
        </el-form-item>
        <el-form-item label="药品英文名称" prop="meidcineEnglishName">
          <el-input v-model="meidcineFrom.meidcineEnglishName"></el-input>
        </el-form-item>
        <el-form-item label="剂型种类" prop="meidcineDosageformCategory">
          <el-input v-model="meidcineFrom.meidcineDosageformCategory"></el-input>
        </el-form-item>
        <el-form-item label="生产单位" prop="meidcineManufacturer">
          <el-input v-model="meidcineFrom.meidcineManufacturer"></el-input>
        </el-form-item>
        <el-form-item label="生产单位地址" prop="meidcineManufacturingAddress">
          <el-input v-model="meidcineFrom.meidcineManufacturingAddress"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="meidcineSpecification">
          <el-input v-model="meidcineFrom.meidcineSpecification"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" prop="meidcineCategory">
          <el-input v-model="meidcineFrom.meidcineCategory"></el-input>
        </el-form-item>
        <el-form-item label="批准日期" prop="meidcineApprovaldate">
          <el-input v-model="meidcineFrom.meidcineApprovaldate"></el-input>
        </el-form-item>
        <el-form-item label="原批准文号" prop="meidcineOriginalApprovalNumber">
          <el-input v-model="meidcineFrom.meidcineOriginalApprovalNumber"></el-input>
        </el-form-item>
        <el-form-item label="国产药/进口药" prop="meidcineCountry">
          <el-input v-model="meidcineFrom.meidcineCountry"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="meidcinePurchasePrice">
          <el-input v-model="meidcineFrom.meidcinePurchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="meidcineRetailPrice">
          <el-input v-model="meidcineFrom.meidcineRetailPrice"></el-input>
        </el-form-item>
        <el-form-item label="批发价" prop="meidcineWholesalePrice">
          <el-input v-model="meidcineFrom.meidcineWholesalePrice"></el-input>
        </el-form-item>
        <el-form-item label="药品供应商名" prop="supplierName">
          <el-input v-model="meidcineFrom.supplierName"></el-input>
        </el-form-item>
        <el-form-item label="药品库存量" prop="stochAmount">
          <el-input v-model="meidcineFrom.stochAmount"></el-input>
        </el-form-item>
        <el-form-item label="药品存放仓库" prop="whseName">
          <el-input v-model="meidcineFrom.whseName" disabled></el-input>
        </el-form-item>
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
        meidcineApprovalNumber: '',
        meidcineName: '',
        meidcineEnglishName: '',
        meidcineDosageformCategory: '',
        meidcineManufacturer: '',
        meidcineManufacturingAddress: '',
        meidcineSpecification: '',
        meidcineCategory: '',
        meidcineApprovaldate: '',
        meidcineOriginalApprovalNumber: '',
        meidcineCountry: '',
        meidcinePurchasePrice: '',
        meidcineRetailPrice: '',
        meidcineWholesalePrice: '',
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
      this.$http
        .get(
          'customers/' +
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
          .post('customer', this.addForm)
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
        .get('customer/' + id)
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.meidcineFrom = response.data.data.customerVO
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
          .put('customer', res)
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
        .delete('customer/' + id)
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
