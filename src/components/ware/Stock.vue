<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>仓库信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="仓库名" prop="whseName" fixed></el-table-column>
        <el-table-column label="仓库地址" prop="whseAddress"></el-table-column>
        <el-table-column label="电话" prop="whseTel"></el-table-column>
        <el-table-column label="最大容量" prop="whseCapacity"></el-table-column>
        <el-table-column label="仓库管理员" prop="userNumber"></el-table-column>
        <el-table-column label="创建时间" prop="genTime" :formatter="dataFormat"></el-table-column>
        <el-table-column label="操作" width="130px" fixed="right">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showStockDialog(scope.row.whseId)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="removeStockById(scope.row.whseId)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <el-dialog title="添加信息" :visible.sync="addDialogVisible" width="25%" @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="仓库名" prop="whseName">
          <el-input v-model="addForm.whseName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="whseAddress">
          <el-input v-model="addForm.whseAddress"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="whseTel">
          <el-input v-model="addForm.whseTel"></el-input>
        </el-form-item>
        <el-form-item label="最大容量" prop="whseCapacity">
          <el-input v-model.number="addForm.whseCapacity"></el-input>
        </el-form-item>
        <el-form-item label="仓库管理员" prop="userNumber">
          <el-input v-model="addForm.userNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStock">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改信息"
      :visible.sync="stockDialogVisible"
      width="25%"
      @close="stockDialogClose"
    >
      <el-form :model="stockFrom" :rules="stockFromRules" ref="stockFromRef" label-width="100px">
        <el-form-item label="仓库名" prop="whseName">
          <el-input v-model="stockFrom.whseName"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="whseAddress">
          <el-input v-model="stockFrom.whseAddress"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="whseTel">
          <el-input v-model="stockFrom.whseTel"></el-input>
        </el-form-item>
        <el-form-item label="最大容量" prop="whseCapacity">
          <el-input v-model.number="stockFrom.whseCapacity"></el-input>
        </el-form-item>
        <el-form-item label="仓库管理员" prop="userNumber">
          <el-input v-model="stockFrom.userNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="stockDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="stockInfo">确 定</el-button>
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
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userlist: [],
      total: 5,
      addDialogVisible: false,
      addForm: {
        whseName: '',
        whseAddress: '',
        whseTel: '',
        whseCapacity: '',
        userNumber: '',
        genTime: ''
      },
      addFormRules: {
        whseName: [
          { required: true, message: '请输入序号', trigger: 'blur' },
          {
            min: 4,
            max: 10,
            message: '长度在4-10之间',
            trigger: 'blur'
          }
        ],
        whseAddress: [
          { required: false, message: '请输入序号', trigger: 'blur' }
        ],
        whseTel: [
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
        whseCapacity: [
          { required: true, message: '请输入最大容量', trigger: 'blur' },
          {
            type: 'number',
            message: '只能是数字',
            trigger: 'blur'
          }
        ]
      },
      stockDialogVisible: false,
      stockFrom: {
        whseName: '',
        whseAddress: '',
        whseTel: '',
        whseCapacity: '',
        userNumber: '',
        genTime: ''
      },
      stockFromRules: {
        whseName: [
          { required: false, message: '请输入序号', trigger: 'blur' },
          {
            min: 4,
            max: 10,
            message: '长度在4-10之间',
            trigger: 'blur'
          }
        ],
        whseAddress: [
          { required: false, message: '请输入序号', trigger: 'blur' }
        ],
        whseTel: [
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
        whseCapacity: [
          { required: false, message: '请输入最大容量', trigger: 'blur' },
          {
            type: 'number',
            message: '只能是数字',
            trigger: 'blur'
          }
        ]
      },
      multipleSelection: []
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      //   const { data: res } = await this.$http.get('users', {
      //     params: this.queryInfo
      //   })
      //   if (res.meta.status !== 200) {
      //     return this.$massage.error('获取用户列表失败')
      //   }
      //   this.userlist = res.data.users
      //   this.total = res.data.total
      const { data: res } = await this.$http.get('warehouseManage/warehouse/' + this.queryInfo.pagenum + '/' + this.queryInfo.pagesize + '/' + this.queryInfo.query)
      if (res.status !== '200') return this.$message.error(res.message)
      this.$message.success(res.message)
      this.userlist = res.data.list
      this.total = res.data.total
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    addDialogClose() {
      setTimeout(() => {
        this.$refs.addFormRef.resetFields()
      }, 500)
    },
    async addStock() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写真缺的用户信息')
        // //发送请求完成添加用户的操作
        // const { data: res } = await this.$http.post('users', this.addForm)
        // //判断如果添加失败，就做提示
        // if (res.meta.status !== 200) return this.$message.error('添加用户失败')
        // //添加成功的提示
        const { data: res } = await this.$http.post('warehouseManage/warehouse/', this.addForm)
        if (res.status !== '200') return this.$message.error(res.message)
        this.$message.success(res.message)
        this.addDialogVisible = false
        this.getUserList()
      })
    },
    async showStockDialog(id) {
      const { data: res } = await this.$http.get('warehouseManage/warehouse/' + id)
      if (res.status !== '200') return this.$message.error(res.message)
      this.stockFrom = res.data.warehouseVO
      this.stockDialogVisible = true
    },
    stockDialogClose() {
      setTimeout(() => {
        this.$refs.stockFromRef.resetFields()
      }, 500)
    },
    stockInfo() {
      this.$refs.stockFromRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        const { data: res } = await this.$http.put(
          'warehouseManage/warehouse/', this.stockFrom
        )
        if (res.status !== '200') return this.$message.error(res.message)
        this.$message.success(res.message)
        this.stockDialogVisible = false
        this.getUserList()
      })
    },
    async removeStockById(id) {
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
      const { data: res } = await this.$http.delete('warehouseManage/warehouse/' + id)
      if (res.status !== '200') return this.$message.error(res.message)
      this.$message.success(res.message)
      this.getUserList()
      console.log(confirmResult)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    dataFormat: function(row, column) {
      var t = new Date(row.genTime)
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
