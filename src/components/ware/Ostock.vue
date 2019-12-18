<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>出库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出库申请" name="first">
          <el-table
            ref="multipleTable"
            :data="outStockFrom"
            stripe
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="userNumber" label="员工号"></el-table-column>
            <el-table-column prop="outstockApplyCategory" label="出库类型"></el-table-column>
            <el-table-column prop="medicineId" label="出库药品"></el-table-column>
            <el-table-column prop="outstockAmount" label="出库数量"></el-table-column>
            <el-table-column prop="outstockRemark" label="出库备注"></el-table-column>
            <el-table-column label="出库状态">
              <template slot-scope="scope" active-color="#727cf5" inactive-color="#ff4949">
                <el-switch
                  v-model="scope.row.valid"
                  :active-value="1"
                  :inactive-value="0"
                  @change="stockValidChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="outstockTime" label="出库申请时间" :formatter="dataFormat"></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="出库单" name="second">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getOutstockList">
                <el-button slot="append" icon="el-icon-search" @click="getOutstockList"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-table :data="list" border stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="出库单编号" prop="outstockNumber" width="305px"></el-table-column>
            <el-table-column label="出库类型" prop="outstockCategory"></el-table-column>
            <el-table-column label="出库操作员" prop="userNumber"></el-table-column>
            <el-table-column label="出库时间" prop="outstockTime" :formatter="dataFormat2"></el-table-column>
            <el-table-column label="出库备注" prop="outstockRemark"></el-table-column>
            <el-table-column label="操作" width="70px" fixed="right">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="详情" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-more-outline"
                    size="mini"
                    @click="showDrawer (scope.row.outstockNumber)"
                  ></el-button>
                </el-tooltip>
                <!-- <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="showDialog(scope.row.outstockNumber)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                  <el-button
                    type="primary"
                    icon="el-icon-delete"
                    size="mini"
                    @click="removeById(scope.row.outstockNumber)"
                  ></el-button>
                </el-tooltip> -->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
            :current-page="queryInfo.pageNum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="queryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane name="goto"> <span slot="label"><i class="el-icon-plus"></i>增加出库单</span></el-tab-pane>
      </el-tabs>
    </el-card>
    <el-drawer title="出库单详情" :visible.sync="detailsDrawer" :with-header="false" size="50%">
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="出库单编号" prop="outstockNumber" class="from-inline">
          <el-input v-model="purFrom.outstockNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="出库类型" prop="outstockCategory" class="from-inlines">
          <el-input v-model="purFrom.outstockCategory" disabled></el-input>
        </el-form-item>
        <el-form-item label="出库时间" prop="outstockTime" class="from-inlines">
          <el-input v-model="purFrom.outstockTime" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="出库操作员" prop="userNumber" class="from-inline">
          <el-input v-model="purFrom.userNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="出库备注" prop="outstockRemark" class="from-inlines">
          <el-input v-model="purFrom.outstockRemark" disabled></el-input>
        </el-form-item>
      </el-form>
       <el-table :data="purFrom.outstockDtlList" border stripe @selection-change="handleSelectionChange">
        <el-table-column label="出库详细项编号" prop="outstockDtlNumber"></el-table-column>
        <el-table-column label="出库药品ID" prop="medicineId" ></el-table-column>
        <el-table-column label="出库数量" prop="outstockAmount"></el-table-column>
        <el-table-column label="出库仓库ID" prop="whseId"></el-table-column>
      </el-table>
      <el-row>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        name: '',
        pageNum: 1,
        pageSize: 5
      },
      outStockFrom: [],
      multipleSelection: [],
      activeName: 'first',
      list: [
        { outstockNumber: 1, outstockRemark: '未审核' },
        { outstockNumber: 2, outstockRemark: '已提交数据' },
        { outstockNumber: 3, outstockRemark: '已审核' }
      ],
      total: 0,
      addDialogVisible: false,
      addFormRules: {},
      purDialogVisible: false,
      purFrom: {},
      purFromRules: {},
      detailsDrawer: false,
      fullscreenLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get(
        'outstockManage/outstock/' +
          this.queryInfo.pageNum +
          '/' +
          this.queryInfo.pageSize
      )
      this.outStockFrom = res.data.list
      this.total = res.data.total
    },
    async getOutstockList() {
      const { data: res } = await this.$http.get('outstockManage/outstockRecord/' + this.queryInfo.pageNum + '/' + this.queryInfo.pageSize + '/' + this.queryInfo.name)
      if (res.status !== '200') return this.$message.error(res.message)
      this.list = res.data.list
      this.total = res.data.total
      this.$message.success(res.message)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getList()
    },
    handleSizeChange2(newSize) {
      this.queryInfo.pageSize = newSize
      this.getOutstockList()
    },
    handleCurrentChange2(newPage) {
      this.queryInfo.pageNum = newPage
      this.getOutstockList()
    },
    handleClick() {
      if (this.activeName === 'second') {
        this.getOutstockList()
      }
      if (this.activeName === 'goto') {
        this.goto()
      }
      console.log(this.activeName)
    },
    async stockValidChanged(row) {
      const { data: res } = await this.$http.put(
        'outstockManage/outstock/',
        row
      )
      if (res.status !== '200') {
        row.valid = !row.valid
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
    },
    dataFormat: function(row, column) {
      var t = new Date(row.outstockTime)
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
    dataFormat2: function(row, column) {
      var t = new Date(row.outstockTime)
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
    goto() {
      this.$router.push('/istock')
      window.sessionStorage.setItem('activePath', 'istock')
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
    async showDrawer (outstockNumber) {
      const { data: res } = await this.$http.get('outstockManage/outstockRecord/' + outstockNumber)
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
      this.purFrom = res.data.outstockVO
      this.detailsDrawer = true
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
