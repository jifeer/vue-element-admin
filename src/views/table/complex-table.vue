<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.dictName"
        placeholder="字典名称"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.dictCode"
        placeholder="字典编码"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.description"
        placeholder="描述"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.delFlag"
        placeholder="删除状态"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        Add
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >
        reviewer
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      max-height="40%"
      style="width: 80%;"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        label="dictName"
        prop="dictName"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dictName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="dictCode"
        prop="dictCode"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dictCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="description"
        prop="description"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="delFlag"
        prop="delFlag"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.delFlag }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="createBy"
        prop="createBy"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createBy }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="createTime"
        width="150px"
        align="center"
        prop="createTime"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="updateBy"
        prop="updateBy"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateBy }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="updateTime"
        width="150px"
        align="left"
        prop="updateTime"
        sortable
      >
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="type"
        prop="type"
        sortable
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
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
          label="字典名称"
          :rules="[
            { required: true, message: '字典名称', trigger: 'blur' },
            { min: 0, max: 100, message: '长度不能超过{100}位'}]"
        >
          <el-input v-model="temp.dictName" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="字典编码"
          :rules="[
            { required: true, message: '字典编码', trigger: 'blur' },
            { min: 0, max: 100, message: '长度不能超过{100}位'}]"
        >
          <el-input v-model="temp.dictCode" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="描述"
          :rules="[
            { required: true, message: '描述', trigger: 'blur' },
            { min: 0, max: 255, message: '长度不能超过{255}位'}]"
        >
          <el-input v-model="temp.description" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="删除状态"
          :rules="[
            { required: true, message: '删除状态不能为空'},
            { min: 0, max: 1, message: '长度不能超过{1}位'},
            { type: 'integer', message: '必须是类型number和整数'} ]"
        >
          <el-input v-model="temp.delFlag" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item
          label="创建人"
          :rules="[
            { required: true, message: '创建人', trigger: 'blur' },
            { min: 0, max: 32, message: '长度不能超过{32}位'}]"
        >
          <el-input v-model="temp.createBy" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-col :span="11">
            <el-date-picker
              v-model="temp.createTime"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="更新人"
          :rules="[
            { required: true, message: '更新人', trigger: 'blur' },
            { min: 0, max: 32, message: '长度不能超过{32}位'}]"
        >
          <el-input v-model="temp.updateBy" type="textarea" placeholder="Please input" />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-col :span="11">
            <el-date-picker
              v-model="temp.updateTime"
              type="date"
              placeholder="选择日期"
              style="width: 100%;"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="字典类型0为string,1为number"
          :rules="[
            { required: true, message: '字典类型0为string,1为number不能为空'},
            { min: 0, max: 1, message: '长度不能超过{1}位'},
            { type: 'integer', message: '必须是类型number和整数'} ]"
        >
          <el-input v-model="temp.type" type="textarea" placeholder="Please input" />
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
</style>
<script>
import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
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
  name: 'ComplexTable',
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
          createArticle(this.temp).then(() => {
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
          updateArticle(tempData).then(() => {
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
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
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
    }
  }
}

</script>
