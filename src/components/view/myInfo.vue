<template>
  <div>
    <div>
      <el-card class="table">
        <el-switch
          v-model="isReportRes"
          active-text="举报处理"
          inactive-text="违规处理"
          active-color="#409EFF"
          inactive-color="#409EFF"
          @change="switchChange"
          >
        </el-switch>
        <el-table v-if="isReportRes" v-loading="loading"
                  :data="tableData"
                  style="width: 100%">
          <el-table-column
            prop="informerusername"
            label="举报人"/>
          <el-table-column
            prop="reason"
            label="举报原因"/>
          <el-table-column
            prop="handleresult"
            label="处理结果"/>
            <el-table-column
              prop="remarkbystaff"
              label="处理原因"/>
          <el-table-column
            prop="handletime"
            label="处理时间"/>
        </el-table>
        <el-table v-else v-loading="loading"
                  :data="tableData"
                  style="width: 100%">
          <el-table-column
            prop="publishid"
            label="商品id"/>
          <el-table-column
            prop="publishcontent"
            label="商品简要"/>
          <el-table-column
            prop="violatingcontent"
            label="违规内容"/>
          <el-table-column
            prop="remark"
            label="管理员备注"/>
          <el-table-column
            prop="time"
            label="处理时间"/>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    name: "myInfo",
    data () {
      return {
          loading: false,
          page: 0,
          tableData:null,
          isReportRes:true
      }
    },
    methods: {
        getReportRes (page) {
            this.loading = true
            this.$http(this.$api.getReportRes, {adminName: this.$username, page: this.page}).then((res) => {
                this.loading = false
                this.tableData = res
            })
        },
        switchChange () {
            if (this.isReportRes) {
               this.getReportRes(0)
            }
            else{
                this.getViolationRes(0)
            }
        },
        getViolationRes (page) {
            this.loading = true
            this.$http(this.$api.getViolationRes, {adminName: this.$username, page: this.page}).then((res) => {
                this.loading = false
                this.tableData = res
            })
        }
    },
    created () {
        this.loading = true
        this.getReportRes(0)
    }
}
</script>

<style scoped>
.table{
  margin: 30px;
  margin-top: 90px;
}
</style>
