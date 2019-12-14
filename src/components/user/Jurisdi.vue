<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary"  @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="list" stripe style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <pre>
              {{scope.row}}
            </pre>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" width="60px"></el-table-column>
        <el-table-column prop="name" label="角色名"></el-table-column>
        <el-table-column prop="msg" label="角色描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showJurisdiDialog(scope.row.name)"
            >修改</el-button>
            <el-button
              type="primary"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.name)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加角色" :visible.sync="addDialogVisible" width="30%">
        <span>这是一段信息</span>
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{ name: '管理员', msg: '666' }],
      addDialogVisible: false,
      addForm: {
        Name: '',
        whseAddress: '',
        whseTel: '',
        whseCapacity: '',
        userNumber: '',
        genTime: ''
      },
      jurisdiDialogVisible: false
    }
  },
  created() {
    this.getJurisdiList()
  },
  methods: {
    async getJurisdiList() {
      // const { data: res } = await this.$http.get('roles')
      // 如果返回状态为异常状态则报错并返回
      // if (res.meta.status !== 200)
      //     return this.$message.error('获取角色列表失败')
      // //如果返回状态正常，将请求的数据保存在data中
      // this.roleList = res.data
      // console.log(res.data)
      // this.roleList = res.data
      console.log('获取了列表')
    },
    removeById(id) {
      console.log(id)
    },
    async showJurisdiDialog(id) {
      //   const { data: res } = await this.$http.get('users/' + id)
      //   if (res.meta.status !== 200)
      //     return this.$message.error('获取用户信息失败')
      //   this.stockForm = res.data
      console.log(id)
      this.jurisdiDialogVisible = true
    },
    add() {

    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}
</style>
