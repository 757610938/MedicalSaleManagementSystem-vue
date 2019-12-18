<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>出库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="outStockFrom">
        <el-form-item label="操作员工号:" prop="userNumber" class="from-inline">
          <el-input v-model="outStockFrom.userNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="出库类型：">
         <el-radio-group v-model="outStockFrom.outstockCategory">
           <el-radio label="销售出库"></el-radio>
            <el-radio label="采购出库"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出库备注:" prop="purRemark" class="from-inlines">
          <el-input v-model="outStockFrom.purRemark" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="text" class="from-inlines" @click="medicineDialog">选择出库药品</el-button>
      <el-table :data="outStockFrom.outstockDtlBOList" border stripe :row-key="outStockFrom.outstockDtlBOList.medicineId">
        <el-table-column label="药品编号" prop="medicineId"></el-table-column>
        <el-table-column label="药品名称" prop="medicineName"></el-table-column>
        <el-table-column label="出库数量">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.outstockAmount"
              controls-position="right"
              @change="handleChange"
              :min="1"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="出库仓库ID" prop="whseId" ></el-table-column>
        <el-table-column label="操作" width="80px" fixed="right">
          <template slot-scope="scope">
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
      <el-col :span="2">
      <el-button type="primary" @click="submitPur" v-loading.fullscreen.lock="fullscreenLoading">确认生成</el-button>
      </el-col>
      <el-col :span="2">
      <el-button type="primary" @click="gobcak">返回</el-button>
      </el-col>
    </el-card>
    <el-dialog title="添加出库药品" :visible.sync="medicineDialogTableVisible">
      <el-row :gutter="20">
        <el-col :span="4">
          <template>
            <el-select v-model="value" clearable placeholder="请选择" @change="searchChange">
              <el-option-group v-for="group in options" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </template>
        </el-col>
       <el-col :span="4">
          <template>
            <el-select v-model="stockValue" clearable placeholder="请选择" @change="stockChange">
              <el-option-group v-for="group in stockOptions" :key="group.label" :label="group.label">
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </template>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.keyword" clearable @clear="getList">
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
        </el-col>
      </el-row>
      <el-table :data="list" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
        <el-table-column label="药品名" prop="medicineName"></el-table-column>
        <el-table-column label="药品种类" prop="medicineCategory" ></el-table-column>
        <el-table-column label="药品仓库ID" prop="whseId" ></el-table-column>
        <el-table-column label="药品仓库名字" prop="whseName" ></el-table-column>
        <el-table-column label="药品库存量" prop="stockAmount" ></el-table-column>
        <el-table-column label="操作" width="130px" fixed="right">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="添加" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-thumb"
                size="mini"
                @click="addpurDtList(scope.row)"
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
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        keyword: '',
        searchType: 'SEARCH_ALL',
        warehouseBelong: 'string',
        offset: 1,
        limit: 5
      },
      outStockFrom: {
        outstockDtlBOList: []
      },
      list: [
        { medicineId: 1, medicineName: 'aaa' },
        { medicineId: 2, medicineName: 'bbb' },
        { medicineId: 3, medicineName: 'ccc' },
        { medicineId: 4, medicineName: 'ddd' }
      ],
      medicineDialogTableVisible: false,
      total: 0,
      options: [
        {
          label: '查询条件',
          options: [
            {
              value: 'SEARCH_BY_MEDICINE_ID',
              label: '根据药品ID'
            },
            {
              value: 'SEARCH_BY_MEDICINE_NAME',
              label: '根据药品名称'
            },
            {
              value: 'SEARCH_BY_MEDICINE_CATEGORY',
              label: '根据药品种类'
            },
            {
              value: 'SEARCH_ALL',
              label: '不限制'
            }
          ]
        }
      ],
      stockOptions: [
        {
          label: '单仓库查询',
          options: [
            {
              value: 'searchByMedicineId',
              label: '1号仓库'
            },
            {
              value: 'searchByMedicineName',
              label: '2号仓库'
            },
            {
              value: 'searchByMedicineCategory',
              label: '3号仓库'
            },
            {
              value: 'searchAll',
              label: '4号仓库'
            }
          ]
        }
      ],
      value: '',
      stockValue: '',
      fullscreenLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
    },
    handleChange(value) {
      console.log(value)
    },
    async getList() {
      const { data: res } = await this.$http.get('/stockManage/stock', { params: this.queryInfo })
      console.log(res)
      this.list = res.rows
      this.total = res.total
    },
    medicineDialog() {
      this.medicineDialogTableVisible = true
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.offset = newPage
      this.getList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    addpurDtList(row) {
      const index = this.outStockFrom.outstockDtlBOList.findIndex(item => {
        if (item.medicineId === '') {
          return false
        } else {
          if (item.medicineId === row.medicineId) {
            return true
          }
        }
      })
      if (index !== -1) {
        return this.$message({
          message: '不能添加已有的药品',
          type: 'error'
        })
      }
      this.outStockFrom.outstockDtlBOList.push(row)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    removeById(id) {
      const index = this.outStockFrom.outstockDtlBOList.findIndex(item => {
        if (item.medicineId === id) {
          return true
        }
      })
      this.outStockFrom.outstockDtlBOList.splice(index, 1)
    },
    async savePur() {
      const { data: res } = await this.$http.post('purchase', this.outStockFrom)
      console.log(res.message)
    },
    async submitPur() {
      const { data: res } = await this.$http.post(
        'outstockManage/outstockRecord',
        this.outStockFrom
      )
      this.fullscreenLoading = true
      this.$message({
        message: res.message,
        type: 'success'
      })
      setTimeout(() => {
        this.fullscreenLoading = false
        this.$router.push('/ostock')
        window.sessionStorage.setItem('activePath', 'ostock')
        location.reload()
      }, 500)
    },
    gobcak() {
      this.$router.push('/ostock')
      window.sessionStorage.setItem('activePath', 'ostock')
    },
    searchChange() {
      this.queryInfo.searchType = this.value
      console.log(this.value)
    },
    stockChange() {
      console.log(this.stockValue)
    }
  },
  computed: {
    'totalPrice': function() {
      var res = 0
      this.outStockFrom.outstockDtlBOList.forEach(function(val, index) {
        res += val.purDtlPrice * val.purDtlAmount
      })
      return parseFloat(res)
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
.btn {
  padding: 20px;
}
</style>
