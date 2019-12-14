<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>客户信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getCustList">
            <el-button slot="append" icon="el-icon-search" @click="getCustList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"  style="position:absolute; left:85%">
          <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="custlist" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
        <el-table-column label="编号" prop="custId" width="150"></el-table-column>
        <el-table-column label="姓名" prop="custName" width="150"></el-table-column>
        <el-table-column label="电话" prop="custTel" width="200"></el-table-column>
        <el-table-column label="邮编" prop="custZipCode" width="150"></el-table-column>
        <el-table-column label="传真" prop="custFax" width="200"></el-table-column>
        <el-table-column label="种类" prop="custCategory" width="150"></el-table-column>
        <el-table-column label="地址" width="400" prop="custAddress"></el-table-column>
        <el-table-column label="收货地址" width="400" prop="custShippingAddress"></el-table-column>
        <el-table-column label="开户行" prop="custOpeningBank" width="500"></el-table-column>
        <el-table-column label="银行账号" prop="custBankNumber" width="500"></el-table-column>
        <el-table-column label="联系人名字" width="150" prop="custContactsName"></el-table-column>
        <el-table-column label="联系人电话" prop="custContactsTel" width="150"></el-table-column>
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
                @click="showCustDialog(scope.row.custId)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="removeById(scope.row.custId)"
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
        <el-form-item label="姓名" prop="custName">
          <el-input v-model="addForm.custName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="custTel">
          <el-input v-model="addForm.custTel"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="custZipCode">
          <el-input v-model="addForm.custZipCode"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="custFax">
          <el-input v-model="addForm.custFax"></el-input>
        </el-form-item>
        <el-form-item label="种类" prop="custCategory">
          <el-input v-model="addForm.custCategory"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="custAddress">
          <el-input v-model="addForm.custAddress"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="custShippingAddress">
          <el-input v-model="addForm.custShippingAddress"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="custOpeningBank">
          <el-input v-model="addForm.custOpeningBank"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="custBankNumber">
          <el-input v-model="addForm.custBankNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系人名字" prop="custContactsName">
          <el-input v-model="addForm.custContactsName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="custContactsTel">
          <el-input v-model="addForm.custContactsTel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCust">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改信息"
      :visible.sync="custDialogVisible"
      width="45%"
      @close="custDialogClose"
    >
      <el-form :model="custFrom" :rules="custFromRules" ref="custFromRef" label-width="100px">
        <el-form-item label="姓名" prop="custName">
          <el-input v-model="custFrom.custName"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="custTel">
          <el-input v-model="custFrom.custTel"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="custZipCode">
          <el-input v-model="custFrom.custZipCode"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="custFax">
          <el-input v-model="custFrom.custFax"></el-input>
        </el-form-item>
        <el-form-item label="种类" prop="custCategory">
          <el-input v-model="custFrom.custCategory"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="custAddress">
          <el-input v-model="custFrom.custAddress"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="custShippingAddress">
          <el-input v-model="custFrom.custShippingAddress"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="custOpeningBank">
          <el-input v-model="custFrom.custOpeningBank"></el-input>
        </el-form-item>
        <el-form-item label="银行账号" prop="custBankNumber">
          <el-input v-model="custFrom.custBankNumber"></el-input>
        </el-form-item>
        <el-form-item label="联系人名字" prop="custContactsName">
          <el-input v-model="custFrom.custContactsName"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="custContactsTel">
          <el-input v-model="custFrom.custContactsTel"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="custDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Info">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号码'))
    }
    return {
      queryInfo: {
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      custlist: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        custName: '',
        custTel: '',
        custZipCode: '',
        custFax: '',
        custCategory: '',
        custAddress: '',
        custShippingAddress: '',
        custOpeningBank: '',
        custBankNumber: '',
        custContactsName: '',
        custContactsTel: ''
      },
      addFormRules: {
        custName: [
          { required: true, message: '请输入序号', trigger: 'blur' },
          {
            min: 2,
            message: '最少输入2位',
            trigger: 'blur'
          }
        ],
        // whseAddress: [
        //   { required: false, message: '请输入序号', trigger: 'blur' }
        // ],
        custTel: [
          //   {
          //     type: 'number',
          //     message: '只能是数字',
          //     trigger: 'blur'
          //   },
          { required: false, message: '请输入电话', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        custContactsTel: [
          //   {
          //     type: 'number',
          //     message: '只能是数字',
          //     trigger: 'blur'
          //   },
          { required: false, message: '请输入电话', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
        // whseCapacity: [
        //   { required: true, message: '请输入最大容量', trigger: 'blur' },
        //   {
        //     type: 'number',
        //     message: '只能是数字',
        //     trigger: 'blur'
        //   }
        // ]
      },
      custDialogVisible: false,
      custFrom: {},
      custFromRules: {
        custName: [
          { required: true, message: '请输入序号', trigger: 'blur' },
          {
            min: 2,
            message: '最少输入2位',
            trigger: 'blur'
          }
        ],
        // whseAddress: [
        //   { required: false, message: '请输入序号', trigger: 'blur' }
        // ],
        custTel: [
          //   {
          //     type: 'number',
          //     message: '只能是数字',
          //     trigger: 'blur'
          //   },
          { required: false, message: '请输入电话', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        custContactsTel: [
          //   {
          //     type: 'number',
          //     message: '只能是数字',
          //     trigger: 'blur'
          //   },
          { required: false, message: '请输入电话', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      multipleSelection: []
    }
  },
  created() {
    this.getCustList()
  },
  methods: {
    async getCustList() {
      this.$http.get('customers/' + this.queryInfo.pageNum + '/' + this.queryInfo.pageSize + '/' + this.queryInfo.name)
        .then(function (response) {
          if (response.data.status !== '200') return this.$message.error(response.data.message)
          this.custlist = response.data.data.list
          this.total = response.data.data.total
        }.bind(this)).catch(function (error) {
          console.log(error)
        })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getCustList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getCustList()
    },
    addDialogClose() {
      setTimeout(() => {
        this.$refs.addFormRef.resetFields()
      }, 500)
    },
    addCust() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写真缺的用户信息')
        // //发送请求完成添加用户的操作
        // const { data: res } = await this.$http.post('users', this.addForm)
        // //判断如果添加失败，就做提示
        // if (res.meta.status !== 200) return this.$message.error('添加用户失败')
        // //添加成功的提示
        this.$http.post('customer', this.addForm)
          .then(function (response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.$message.success('添加用户成功')
          }.bind(this)).catch(function (error) {
            console.log(error)
          })
        this.addDialogVisible = false
        this.getCustList()
      })
    },
    async showCustDialog(id) {
      //   const { data: res } = await this.$http.get('users/' + id)
      //   if (res.meta.status !== 200)
      //     return this.$message.error('获取用户信息失败')
      //   this.stockForm = res.data
      this.$http.get('customer/' + id)
        .then(function (response) {
          if (response.data.status !== '200') return this.$message.error(response.data.message)
          this.custFrom = response.data.data.customerVO
          console.log(id)
        }.bind(this)).catch(function (error) {
          console.log(error)
        })
      this.custDialogVisible = true
    },
    custDialogClose() {
      setTimeout(() => {
        this.$refs.custFromRef.resetFields()
      }, 500)
    },
    Info() {
      const res = this.custFrom
      this.$refs.custFromRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        // const { data: res } = await this.$http.put(
        //   'users/' + this.editForm.id,
        //   this.editForm
        // )
        // if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$http.put('customer', res)
          .then(function (response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.$message.success('修改信息成功')
          }.bind(this)).catch(function (error) {
            console.log(error)
          })
        this.custDialogVisible = false
        setTimeout(() => {
          this.getCustList()
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
      this.$http.delete('customer/' + id)
        .then(function (response) {
          if (response.data.status !== '200') return this.$message.error(response.data.message)
          this.$message.success(response.data.message)
          this.getCustList()
          console.log(id)
        }.bind(this)).catch(function (error) {
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
