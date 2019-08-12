<template>
  <div>
    <el-card class="table">
      <el-table v-loading="loading"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="publishid"
          label="举报发布id"
          width="150">
        </el-table-column>
        <el-table-column
          prop="informername"
          label="举报人">
        </el-table-column>
        <el-table-column
          prop="reason"
          width="300"
          label="举报原因">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="300">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="举报时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small" @click="toDetails(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <ReportDetails :reportDetails='reportDetails' :dialogVisible="dialogVisible" v-on:listenToChildEvent='showMsgFromChild' v-on:refreshTable="refresh"></ReportDetails>
  </div>
</template>

<script>
import ReportDetails from './model/reportDetails.vue'
export default {
  components: {
    ReportDetails
  },
  name: 'report',
  data () {
    return {
      tableData: [],
      loading: false,
      reportDetails: '',
      dialogVisible: false,
    }
  },
  created: function () {
    this.getreport('getall', 0)
  },
  methods: {
    getreport (method, page) {
      this.loading = true
      this.$http(this.$api.getreport, {method: method, page: page}).then((res) => {
        this.tableData = res
        this.loading = false
      })
    },
    toDetails (e) {
      this.reportDetails = e
      this.dialogVisible = true
    },
    showMsgFromChild (e) {
      this.dialogVisible = false
    },
    refresh () {
      this.getreport('getall', 0)
    }
  }
}
</script>

<style scoped>
  .table {
    margin: 30px;
    margin-top: 90px;
  }
</style>
