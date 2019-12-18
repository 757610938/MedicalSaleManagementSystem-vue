<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>我的采购单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" style="position:absolute; left:85%">
          <el-button type="primary" @click="gotoPorder">制定采购单</el-button>
        </el-col>
      </el-row>
          <el-table :data="list" border stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="采购编号" prop="purOrderId" width="305px"></el-table-column>
            <el-table-column label="采购主题" prop="purName"></el-table-column>
            <el-table-column label="金额" prop="purTotalMoney"></el-table-column>
            <el-table-column label="采购日期" prop="purDate" :formatter="dataFormat"></el-table-column>
            <el-table-column label="状态" prop="purStatus">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.purStatus }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="负责人" prop="userNumber"></el-table-column>
            <el-table-column label="操作" width="180px" fixed="right">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="详情" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-more-outline"
                    size="mini"
                    @click="showDrawer (scope.row.purOrderId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showDialog(scope.row.purOrderId)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeById(scope.row.purOrderId)"
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
        <el-form-item label="采购编号" prop="purOrderId">
          <el-input v-model="addForm.purOrderId"></el-input>
        </el-form-item>
        <el-form-item label="采购主题" prop="purName">
          <el-input v-model="addForm.purName"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="purTotalMoney">
          <el-input v-model="addForm.purTotalMoney"></el-input>
        </el-form-item>
        <el-form-item label="采购日期" prop="purDate">
          <el-input v-model="addForm.purDate"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="userNumber">
          <el-input v-model="addForm.userNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPur">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="purDialogVisible" width="45%" @close="supplierDialogClose">
      <el-form :model="purFrom" :rules="purFromRules" ref="purFromRef" label-width="110px">
        <el-form-item label="采购编号" prop="purOrderId">
          <el-input v-model="purFrom.purOrderId" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="采购主题" prop="purName">
          <el-input v-model="purFrom.purName"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="purTotalMoney">
          <el-input v-model="purFrom.purTotalMoney" disabled></el-input>
        </el-form-item>
        <el-form-item label="采购日期" prop="purDate">
          <el-input v-model="purFrom.purDate"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="userNumber">
          <el-input v-model="purFrom.userNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="purDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Info">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer title="采购单详情" :visible.sync="detailsDrawer" :with-header="false" size="50%">
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="采购员工号" prop="purOrderId" class="from-inline">
          <el-input v-model="purFrom.purOrderId" disabled></el-input>
        </el-form-item>
        <el-form-item label="采购单编号" prop="purOrderId" class="from-inlines">
          <el-input v-model="purFrom.purOrderId" disabled></el-input>
        </el-form-item>
        <el-form-item label="采购日期" prop="purDate" class="from-inlines">
          <el-input v-model="purFrom.purDate" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="采购单名称" prop="purName" class="from-inline">
          <el-input v-model="purFrom.purName" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商编号" prop="supplierId" class="from-inlines">
          <el-input v-model="purFrom.supplierId" disabled></el-input>
        </el-form-item>
        <el-form-item label="总金额" prop="purTotalMoney" class="from-inlines" label-width="70px">
          <el-input v-model="purFrom.purTotalMoney" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="采购单状态" prop="purStatus" class="from-inline">
          <el-input v-model="purFrom.purStatus" disabled></el-input>
        </el-form-item>
        <el-form-item label="采购单备注" prop="purRemark" class="from-inlines" >
          <el-input v-model="purFrom.purRemark" disabled></el-input>
        </el-form-item>
      </el-form>
       <el-table :data="purFrom.purDtlList" border stripe @selection-change="handleSelectionChange">
        <el-table-column label="采购订单项编号" prop="purDtlOrderId" width="150px"></el-table-column>
        <el-table-column label="药品编号" prop="medicineId" width="150px"></el-table-column>
        <el-table-column label="药品名称" prop="medicineName"></el-table-column>
        <el-table-column label="采购单价" prop="purDtlPrcie"></el-table-column>
        <el-table-column label="采购数量" prop="purDtlAmount"></el-table-column>
        <el-table-column label="状态" prop="purDtlStatus">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.purStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="采购项备注" prop="purDtlRemark" width="400px"></el-table-column>
      </el-table>
    </el-drawer>
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
      list: [
        { purOrderId: 1, purStatus: '未审核' },
        { purOrderId: 2, purStatus: '已提交数据' },
        { purOrderId: 3, purStatus: '已审核' }
      ],
      total: 0,
      addDialogVisible: false,
      addForm: {
        purOrderId: '',
        purName: '',
        purTotalMoney: '',
        purDate: '',
        purStatus: '',
        userNumber: ''
      },
      addFormRules: {},
      purDialogVisible: false,
      purFrom: {},
      purFromRules: {},
      multipleSelection: [],
      detailsDrawer: false,
      activeName: '未审核'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // const res = await this.$http.get('medicines/' + '1/' + '10/')
      // console.log(res)
      const { data: res } = await this.$http.get('purchases/' + this.queryInfo.pageNum + '/' + this.queryInfo.pageSize + '/' + this.queryInfo.name)
      if (res.status !== '200') return this.$message.error(res.message)
      this.list = res.data.list
      this.total = res.data.total
      this.$message.success(res.message)
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
    addPur() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写正确的采购单信息')
        // //发送请求完成添加用户的操作
        // const { data: res } = await this.$http.post('users', this.addForm)
        // //判断如果添加失败，就做提示
        // if (res.meta.status !== 200) return this.$message.error('添加用户失败')
        // //添加成功的提示
        this.$http
          .post('purchase', this.addForm)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success('添加采购单成功')
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
        .get('purchase/' + id)
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.purFrom = response.data.data.purchaseVO
            console.log(id)
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error)
        })
      this.purDialogVisible = true
    },
    supplierDialogClose() {
      setTimeout(() => {
        this.$refs.purFromRef.resetFields()
      }, 500)
    },
    Info() {
      const res = this.purFrom
      this.$refs.purFromRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        // const { data: res } = await this.$http.put(
        //   'users/' + this.editForm.id,
        //   this.editForm
        // )
        // if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$http
          .put('purchase', res)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success(response.data.message)
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error)
          })
        this.purDialogVisible = false
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
        .delete('purchase/' + id)
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
    async showDrawer (id) {
      const { data: res } = await this.$http.get('purchase/' + id)
      if (res.status !== '200') {
        return this.$message({
          message: res.message,
          type: 'error'
        })
      }
      this.$message({
        message: res.message,
        type: 'success'
      })
      this.purFrom = res.data.purchaseVO
      this.detailsDrawer = true
    },
    dataFormat: function(row, column) {
      var t = new Date(row.purDate)
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
    },
    handleClick() {
      console.log('this.activeName :', this.activeName)
    },
    gotoPorder() {
      this.$router.push('/porder')
      window.sessionStorage.setItem('activePath', 'porder')
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
