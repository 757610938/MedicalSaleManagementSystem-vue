<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>采购管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加采购单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="采购员工号:" prop="userNumber" class="from-inline">
          <el-input v-model="purFrom.userNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="建单日期:" prop="purDate" class="from-inlines">
          <el-date-picker v-model="purFrom.purDate" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="采购单备注:" prop="purRemark" class="from-inlines">
          <el-input v-model="purFrom.purRemark"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="purFrom">
        <el-form-item label="采购单名称:" prop="purName" class="from-inline">
          <el-input v-model="purFrom.purName" clearable></el-input>
        </el-form-item>
        <el-form-item label="供应商编号:" prop="supplierId" class="from-inlines">
          <el-input v-model="purFrom.supplierId" clearable></el-input>
        </el-form-item>
        <el-form-item label="总金额:" class="from-inlines" label-width="70px">
          <el-input v-model="totalPrice" clearable disabled></el-input>
        </el-form-item>
      </el-form>
      <el-button type="text" class="from-inlines" @click="medicineDialog">添加药品</el-button>
      <el-table :data="purFrom.purDtlList" border stripe :row-key="purFrom.purDtlList.medicineId">
        <el-table-column label="药品编号" prop="medicineId" width="300px"></el-table-column>
        <el-table-column label="药品名称" prop="medicineName" width="200px"></el-table-column>
        <el-table-column label="采购单价" width="200px">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.purDtlPrice"
              :controls="medicineDialogTableVisible"
              @change="handleChange"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" width="200px">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.purDtlAmount"
              controls-position="right"
              @change="handleChange"
              :min="1"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="采购项备注" width="500px">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.purDtlRemark" @change="handleChange"></el-input>
          </template>
        </el-table-column>
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
      <el-button type="primary" class="el-card" @click="savePur">保存</el-button>
      <el-button type="primary" @click="submitPur">提交审核</el-button>
    </el-card>
    <el-dialog title="添加药品" :visible.sync="medicineDialogTableVisible">
      <el-input placeholder="请输入内容" v-model="queryInfo.name" clearable @clear="getMedicineList">
        <el-button slot="append" icon="el-icon-search" @click="getMedicineList"></el-button>
      </el-input>
      <el-table :data="medicineList" border stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" fixed label="序号" width="55"></el-table-column>
        <el-table-column label="编号" prop="medicineId" width="150"></el-table-column>
        <el-table-column label="药品名" prop="medicineName" width="200"></el-table-column>
        <el-table-column label="药品英文名称" prop="medicineEnglishName" width="200"></el-table-column>
        <el-table-column label="零售价" prop="medicineRetailPrice" width="150"></el-table-column>
        <el-table-column label="进货价" prop="medicinePurchasePrice" width="150"></el-table-column>
        <el-table-column label="批发价" prop="medicineWholesalePrice" width="150"></el-table-column>
        <el-table-column label="药品库存量" prop="stochAmount" width="150"></el-table-column>
        <el-table-column label="药品存放仓库" prop="whseName" width="200"></el-table-column>
        <el-table-column label="药品供应商名" prop="supplierName" width="200"></el-table-column>
        <el-table-column label="批准文号" prop="medicineApprovalNumber" width="300"></el-table-column>
        <el-table-column label="剂型种类" prop="medicineDosageformCategory" width="150"></el-table-column>
        <el-table-column label="生产单位" prop="medicineManufacturer" width="250"></el-table-column>
        <el-table-column label="生产单位地址" width="500" prop="medicineManufacturingAddress"></el-table-column>
        <el-table-column label="规格" width="150" prop="medicineSpecification"></el-table-column>
        <el-table-column label="药品种类" prop="medicineCategory" width="150"></el-table-column>
        <el-table-column label="批准日期" prop="medicineApprovaldate" width="200" :formatter="dataFormat"></el-table-column>
        <el-table-column label="原批准文号" width="300" prop="medicineOriginalApprovalNumber"></el-table-column>
        <el-table-column label="国产药/进口药" prop="medicineCountry" width="150"></el-table-column>
        <el-table-column label="操作" width="70px" fixed="right">
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
        name: '',
        pageNum: 1,
        pageSize: 10
      },
      purFrom: {
        purDtlList: []
      },
      medicineList: [
        { medicineId: 1, medicineName: 'aaa' },
        { medicineId: 2, medicineName: 'bbb' },
        { medicineId: 3, medicineName: 'ccc' },
        { medicineId: 4, medicineName: 'ddd' }
      ],
      medicineDialogTableVisible: false,
      total: 0
    }
  },
  created() {
    this.getMedicineList()
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
    async getMedicineList() {
      const { data: res } = await this.$http.get(
        'medicines/' +
          this.queryInfo.pageNum +
          '/' +
          this.queryInfo.pageSize +
          '/' +
          this.queryInfo.name
      )
      this.medicineList = res.data.list
      this.total = res.data.total
    },
    medicineDialog() {
      this.medicineDialogTableVisible = true
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getMedicineList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getMedicineList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    addpurDtList(row) {
      const index = this.purFrom.purDtlList.findIndex(item => {
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
      this.purFrom.purDtlList.push(row)
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },
    removeById(id) {
      const index = this.purFrom.purDtlList.findIndex(item => {
        if (item.medicineId === id) {
          return true
        }
      })
      this.purFrom.purDtlList.splice(index, 1)
    },
    async savePur() {
      const { data: res } = await this.$http.post('purchase', this.purFrom)
      console.log(res.message)
    },
    async submitPur() {
      const { data: res } = await this.$http.post(
        'purchase/submitPur',
        this.purFrom
      )
      console.log(res.message)
    }
  },
  computed: {
    'totalPrice': function() {
      var res = 0
      this.purFrom.purDtlList.forEach(function(val, index) {
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
</style>
