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
            <el-table-column prop="medcimeId" label="出库药品"></el-table-column>
            <el-table-column prop="outstockAmount" label="出库数量"></el-table-column>
            <el-table-column prop="outstockRemark" label="出库备注"></el-table-column>
            <el-table-column label="出库状态">
              <template slot-scope="scope" active-color="#727cf5" inactive-color="#ff4949">
                <el-switch
                  v-model="scope.row.Valid"
                  :active-value="1"
                  :inactive-value="0"
                  @change="stockValidChanged(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="outstockTime" label="出库申请时间"></el-table-column>
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
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出库单" name="second">
          <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
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
      total: 0,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('outstockManage/outstock' + this.queryInfo.pageNum + '/' + this.queryInfo.pageSize)
      this.outStockFrom = res.data.List
      this.total = res.total
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
    handleClick() {
      console.log(this.activeName)
    },
    async stockValidChanged(row) {
      const { data: res } = await this.$http.put(
        'outstockManage/outstock' + row.outstockApplyId + '/' + row.Valid
      )
      if (res.status !== '200') {
        row.Valid = !row.Valid
        return this.$message.error(res.message)
      }
      this.$message.success(res.message)
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
