<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
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
        <el-table-column label="用户名" prop="userName" width="150"></el-table-column>
        <el-table-column label="性别" prop="userSex" width="150"></el-table-column>
        <el-table-column label="生日" prop="userBirthday" width="200"></el-table-column>
        <el-table-column label="邮箱地址" prop="userEmail" width="400"></el-table-column>
        <el-table-column label="身份证号码" prop="userIdCard" width="400"></el-table-column>
        <el-table-column label="地址" prop="userAddress" width="400"></el-table-column>
        <el-table-column label="手机号码" width="200" prop="userPhone"></el-table-column>
        <el-table-column label="工号" width="200" prop="userNumber"></el-table-column>
        <el-table-column label="状态" width="150">
          <template slot-scope="scope" active-color="#727cf5" inactive-color="#ff4949">
            <el-switch v-model="scope.row.userValid" :active-value="1" :inactive-value="0" @change="userValidChanged(scope.row)" ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="上一次登录Ip" prop="lastLoginIp" width="500"></el-table-column>
        <el-table-column label="上一次登录时间" width="150" prop="lastLoginTime"></el-table-column>
        <el-table-column label="创建时间" prop="genTime" width="150" :formatter="dataFormat"></el-table-column>
        <el-table-column label="操作" width="130px" fixed="right">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showDialog(scope.row.userId)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="removeById(scope.row.userId)"
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
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-input v-model="addForm.userSex"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="userBirthday">
          <el-input v-model="addForm.userBirthday"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="userIdCard">
          <el-input v-model="addForm.userIdCard"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddress">
          <el-input v-model="addForm.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userPhone">
          <el-input v-model="addForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="库房电话" prop="userNumber">
          <el-input v-model="addForm.userNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="userEmail">
          <el-input v-model="addForm.userEmail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改信息" :visible.sync="userDialogVisible" width="45%" @close="userDialogClose">
      <el-form :model="userFrom" :rules="userFromRules" ref="userFromRef" label-width="100px">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userFrom.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-input v-model="userFrom.userSex"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="userBirthday">
          <el-input v-model="userFrom.userBirthday"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="userIdCard">
          <el-input v-model="userFrom.userIdCard"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="userAddress">
          <el-input v-model="userFrom.userAddress"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="userPhone">
          <el-input v-model="userFrom.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="库房电话" prop="userNumber">
          <el-input v-model="userFrom.userNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="userEmail">
          <el-input v-model="userFrom.userEmail"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取 消</el-button>
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
      list: [{ userName: '122154', userValid: '1' }],
      total: 0,
      addDialogVisible: false,
      addForm: {
        userName: '',
        userSex: '',
        userBirthday: '',
        userIdCard: '',
        userAddress: '',
        userPhone: '',
        userNumber: '',
        userEmail: '',
        userValid: '',
        lastLoginIp: '',
        lastLoginTime: '',
        genTime: ''

      },
      addFormRules: {},
      userDialogVisible: false,
      userFrom: {},
      userFromRules: {},
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
          'users/' +
            this.queryInfo.pageNum +
            '/' +
            this.queryInfo.pageSize +
            '/' +
            this.queryInfo.name
        )
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            console.log(response)
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
    async add() {
      this.$refs.addFormRef.validate(async userValid => {
        if (!userValid) return this.$message.error('请填写欠缺的信息')
        // //发送请求完成添加用户的操作
        // const { data: res } = await this.$http.post('users', this.addForm)
        // //判断如果添加失败，就做提示
        // if (res.meta.status !== 200) return this.$message.error('添加用户失败')
        // //添加成功的提示
        // this.$http
        //   .post('user', this.addForm)
        //   .then(
        //     function(response) {
        //       if (response.data.status !== '200') return this.$message.error(response.data.message)
        //       this.$message.success(response.data.message)
        //     }.bind(this)
        //   )
        //   .catch(function(error) {
        //     console.log(error)
        //   })
        // this.addDialogVisible = false
        // this.getList()
        const { data: res } = await this.$http.post('user', this.addForm)
        if (res.status !== '200') return this.$message.error(res.message)
        this.$message.success(res.message)
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
        .get('user/' + id)
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.userFrom = response.data.data.userVO
            console.log(id)
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error)
        })
      this.userDialogVisible = true
    },
    userDialogClose() {
      setTimeout(() => {
        this.$refs.userFromRef.resetFields()
      }, 500)
    },
    async Info() {
      const res = this.userFrom
      this.$refs.userFromRef.validate(async userValid => {
        if (!userValid) return this.$message.error('请填写完整用户信息')
        // const { data: res } = await this.$http.put(
        //   'users/' + this.editForm.id,
        //   this.editForm
        // )
        // if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$http
          .put('user', res)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success('修改信息成功')
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error)
          })
        this.userDialogVisible = false
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
        .delete('user/' + id)
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
    async userValidChanged(row) {
      const { data: res } = await this.$http.put('user/' + row.userId + '/' + row.userValid)
      if (res.status !== '200') {
        row.userValid = !row.userValid
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
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
