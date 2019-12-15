<template>
  <div>
    <div class="container">
      <div class="left">
        <div class="header">
          <h2 class="animation a1">欢迎回来</h2>
          <h4 class="animation a2">使用账号及密码登入你的帐户</h4>
        </div>
        <div style="margin: 10px;"></div>
        <el-form ref="loginFormRef" :model="loginForm" :label-position="labelPosition" :rules="loginFromRules" label-width="10px">
          <el-form-item  prop="id">
            <el-input v-model="loginForm.userName" prefix-icon="iconfont icon-user" ></el-input>
          </el-form-item>
          <el-form-item  prop="pwd">
            <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" ></el-input>
          </el-form-item>
        <div style="margin: 10px;"></div>
          <el-form-item class="btns">
            <el-row :gutter="20">
              <el-col :span="16"><div class="grid-content "><button  @click="login" class="button">登录</button></div></el-col>
              <el-col :span="4"><div class="grid-content "><el-button type="info" @click="resetloginForm">重置</el-button></div></el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      loginForm: {
        userName: '林贤钦',
        password: '123456'
      },
      loginFromRules: {
        userName: [
          { required: true, message: '请输入ID', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 13, message: '长度在 6 到 13 之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetloginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$http.post('user/checkLogin', this.loginForm)
        .then(function (response) {
          if (response.data.status !== '200') return this.$message.error(response.data.message)
          this.$message.success(response.data.message)
          window.sessionStorage.setItem('token', response.data.data.token)
          window.localStorage.setItem('user', response.data.data.userVO)
          this.$router.push('/home')
        }.bind(this)).catch(function (error) {
          console.log(error)
        })
      // this.$http.post('apis/employee/checkLogin', this.loginForm)
      // console.log(this)
      // this.$message.success('登录成功')
      // this.$router.push('/home')
      // this.$refs.loginFormRef.validate(async valid => {
      //   if (!valid) return
      //   const { data: res } = await this.$http.post('apis/employee/checkLogin', this.loginForm)
      //   if (res.meta.status !== 200) return this.$message.error('登录失败')
      //   this.$message.success('登录成功')
      //   window.sessionStorage.setItem('token', res.data.token)
      //   this.$router.push('/home')
      // })
    }
  }
}
</script>

<style lang="less" scoped>
.btns {
  display: flex;
  justify-content: flex-end;
}
.button {
  padding: 12px 60px;
  border: 0;
  background: linear-gradient(to right, #7D7AEB 30%, #0097ff 100%);
  border-radius: 5px;
  margin-top: 0px;
  color: #fff;
  letter-spacing: 5px;
  font-family: 'Rubik', sans-serif;
  cursor:pointer;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
