<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.nature"
        placeholder="项目性质"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.insuranceFee"
        placeholder="保险经纪佣金费"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <div v-show="isShow" id="isShow">
        <el-input
          v-model="listQuery.riskConsultingFee"
          placeholder="风险咨询费"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.evaluationFee"
          placeholder="承保公估评估费"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.insuranceEvaluationFee"
          placeholder="保险公估费"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.biddingConsultingFee"
          placeholder="投标咨询费"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-input
          v-model="listQuery.interolConsultingFee"
          placeholder="内控咨询费"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
      </div>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="showToggle"
      >
        显示 | 隐藏条件
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      max-height="40%"
      style="width: 100%;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        label="nature"
        prop="nature"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.nature }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="insuranceFee"
        prop="insuranceFee"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.insuranceFee }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="riskConsultingFee"
        prop="riskConsultingFee"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.riskConsultingFee }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="evaluationFee"
        prop="evaluationFee"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.evaluationFee }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="insuranceEvaluationFee"
        prop="insuranceEvaluationFee"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.insuranceEvaluationFee }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="biddingConsultingFee"
        prop="biddingConsultingFee"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.biddingConsultingFee }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="interolConsultingFee"
        prop="interolConsultingFee"
        sortable
        align="center"
        width="auto"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.interolConsultingFee }}</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="Actions"
        align="center"
        width="330"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button
            v-if="row.status!='published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'published')"
          >
            Publish
          </el-button>
          <el-button
            v-if="row.status!='draft'"
            size="mini"
            @click="handleModifyStatus(row,'draft')"
          >
            Draft
          </el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row,'deleted')"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.pageNo"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="项目性质"
          prop="nature"
          :rules="[
            { required: true, message: '项目性质', trigger: 'blur' },
            { min: 0, max: 50, message: '长度不能超过{50}位'}]"
        >
          <el-input v-model="temp.nature" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="保险经纪佣金费"
          prop="insuranceFee"
          :rules="[
            { required: true, message: '保险经纪佣金费不能为空'},
            { type: 'number', message: '必须为数字值,长度不能超过{21}位,小数点后精确到{2}位'} ]"
        >
          <el-input-number v-model="temp.insuranceFee" type="number" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="风险咨询费"
          prop="riskConsultingFee"
          :rules="[
            { required: true, message: '风险咨询费不能为空'},
            { type: 'number', message: '必须为数字值,长度不能超过{21}位,小数点后精确到{2}位'} ]"
        >
          <el-input-number v-model="temp.riskConsultingFee" type="number" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="承保公估评估费"
          prop="evaluationFee"
          :rules="[
            { required: true, message: '承保公估评估费不能为空'},
            { type: 'number', message: '必须为数字值,长度不能超过{21}位,小数点后精确到{2}位'} ]"
        >
          <el-input-number v-model="temp.evaluationFee" type="number" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="保险公估费"
          prop="insuranceEvaluationFee"
          :rules="[
            { required: true, message: '保险公估费不能为空'},
            { type: 'number', message: '必须为数字值,长度不能超过{21}位,小数点后精确到{2}位'} ]"
        >
          <el-input-number v-model="temp.insuranceEvaluationFee" type="number" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="投标咨询费"
          prop="biddingConsultingFee"
          :rules="[
            { required: true, message: '投标咨询费不能为空'},
            { type: 'number', message: '必须为数字值,长度不能超过{21}位,小数点后精确到{2}位'} ]"
        >
          <el-input-number v-model="temp.biddingConsultingFee" type="number" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="内控咨询费"
          prop="interolConsultingFee"
          :rules="[
            { required: true, message: '内控咨询费不能为空'},
            { type: 'number', message: '必须为数字值,长度不能超过{21}位,小数点后精确到{2}位'} ]"
        >
          <el-input-number v-model="temp.interolConsultingFee" type="number" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table__header tr,
  .el-table__header th {
      padding: 0;
      height: 20px;
      width: auto;
  }
  .el-table__body tr,
  .el-table__body td {
      padding: 0;
      height: 20px;
      width: auto;
  }
</style>
<script>
import { fetchList, createJeecgProjectNatureIncome, updateJeecgProjectNatureIncome } from '@/api/JeecgProjectNatureIncome'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, { })

export default {
  name: 'JeecgProjectNatureIncome',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      isShow: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, {
        label: 'ID Descending',
        key: '-id'
      }, { label: 'Title Ascending', key: '+title' }, { label: 'Title Descending', key: '-title' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // eslint-disable-next-line no-undef
      if (rowIndex % 2 === 0) {
        return 'success-row'
      }
      return ''
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.result.records
        this.total = response.result.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createJeecgProjectNatureIncome(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({ }, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({ }, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateJeecgProjectNatureIncome(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['nature', 'insuranceFee', 'riskConsultingFee', 'evaluationFee', 'insuranceEvaluationFee', 'biddingConsultingFee', 'interolConsultingFee']
          const filterVal = ['nature', 'insuranceFee', 'riskConsultingFee', 'evaluationFee', 'insuranceEvaluationFee', 'biddingConsultingFee', 'interolConsultingFee']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
          })
          this.downloadLoading = false
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    showToggle: function() {
      console.log(this.isShow)
      if (this.isShow) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>
