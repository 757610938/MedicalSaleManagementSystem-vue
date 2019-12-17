<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      <el-breadcrumb-item>库存管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
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
          <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
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
                @click="showDialog(scope.row.whseId)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="removeById(scope.row.whseId)"
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
        <el-form-item label="药品名" prop="medicineName">
          <el-input v-model="addForm.medicineName"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" prop="medicineCategory">
          <el-input v-model="addForm.medicineCategory"></el-input>
        </el-form-item>
        <el-form-item label="药品仓库ID" prop="whseId">
          <el-input v-model="addForm.whseId"></el-input>
        </el-form-item>
        <el-form-item label="药品仓库名字" prop="whseName">
          <el-input v-model="addForm.whseName"></el-input>
        </el-form-item>
        <el-form-item label="药品库存量" prop="stockAmount">
          <el-input v-model="addForm.medicineManufacturer"></el-input>
        </el-form-item>
        <!--        <el-form-item label="药品供应商名" prop="supplierName">-->
        <!--          <el-input v-model="addForm.supplierName" disabled></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="药品库存量" prop="stockAmount">-->
        <!--          <el-input v-model="addForm.stockAmount" disabled></el-input>-->
        <!--        </el-form-item>-->
        <!--        <el-form-item label="药品存放仓库" prop="whseName">-->
        <!--          <el-input v-model="addForm.whseName" disabled></el-input>-->
        <!--        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMedicline">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改信息"
      :visible.sync="wStockDialogVisible"
      width="45%"
      @close="wStockDialogClose"
    >
      <el-form
        :model="wStockFrom"
        :rules="wStockFromRules"
        ref="wStockFromRef"
        label-width="110px"
      >
        <el-form-item label="药品名" prop="medicineName">
          <el-input v-model="wStockFrom.medicineName"></el-input>
        </el-form-item>
        <el-form-item label="药品种类" prop="medicineCategory">
          <el-input v-model="wStockFrom.medicineCategory"></el-input>
        </el-form-item>
        <el-form-item label="药品仓库ID" prop="whseId">
          <el-input v-model="wStockFrom.whseId"></el-input>
        </el-form-item>
        <el-form-item label="药品仓库名字" prop="whseName">
          <el-input v-model="wStockFrom.whseName"></el-input>
        </el-form-item>
        <el-form-item label="药品库存量" prop="stockAmount">
          <el-input v-model="wStockFrom.stockAmount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="wStockDialogVisible = false">取 消</el-button>
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
        keyword: '',
        searchType: 'SEARCH_ALL',
        warehouseBelong: 'string',
        offset: 1,
        limit: 5
      },
      list: [{ supplierName: '122154' }],
      total: 0,
      addDialogVisible: false,
      addForm: {
        medicineName: '',
        medicineCategory: '',
        whseId: '',
        whseName: '',
        stockAmount: ''
      },
      addFormRules: {},
      wStockDialogVisible: false,
      wStockFrom: {},
      wStockFromRules: {},
      multipleSelection: [],
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
      stockValue: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data: res } = await this.$http.get('/stockManage/stock', { params: this.queryInfo })
      this.list = res.rows
      this.total = res.total
      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.limit = newSize
      this.getList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.offset = newPage
      this.getList()
    },
    addDialogClose() {
      setTimeout(() => {
        this.$refs.addFormRef.resetFields()
      }, 500)
    },
    addMedicline() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写真缺的用户信息')
        // //发送请求完成添加用户的操作
        // const { data: res } = await this.$http.post('users', this.addForm)
        // //判断如果添加失败，就做提示
        // if (res.meta.status !== 200) return this.$message.error('添加用户失败')
        // //添加成功的提示
        this.$http
          .post('medicine', this.addForm)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success('添加用户成功')
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
        .get('medicine/' + id)
        .then(
          function(response) {
            if (response.data.status !== '200') return this.$message.error(response.data.message)
            this.wStockFrom = response.data.data.medicineVO
            console.log(id)
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error)
        })
      this.wStockDialogVisible = true
    },
    wStockDialogClose() {
      setTimeout(() => {
        this.$refs.wStockFromRef.resetFields()
      }, 500)
    },
    Info() {
      const res = this.wStockFrom
      this.$refs.wStockFromRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整用户信息')
        // const { data: res } = await this.$http.put(
        //   'users/' + this.editForm.id,
        //   this.editForm
        // )
        // if (res.meta.status !== 200) return this.$message.error('修改用户失败')
        this.$http
          .put('medicine', res)
          .then(
            function(response) {
              if (response.data.status !== '200') return this.$message.error(response.data.message)
              this.$message.success('修改信息成功')
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error)
          })
        this.wStockDialogVisible = false
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
      const { data: res } = await this.$http.delete('stockManage/stock/' + id)
      this.$message.success(res.message)
      console.log(confirmResult)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    searchChange() {
      this.queryInfo.searchType = this.value
      console.log(this.value)
    },
    stockChange() {
      console.log(this.stockValue)
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
