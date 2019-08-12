<template>
  <div>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="70%"
      @open="getPublishDetails">
      <div class="item">举报人：{{reportDetails.informername}}</div>
      <div class="item">举报时间：{{reportDetails.createtime}}</div>
      <div class="item">举报内容：{{reportDetails.reason}}</div>
      <div class="item">备注:{{reportDetails.remark}}</div>
      <div class="item">被举报商品详情:</div>
      <div class="publishdetails">
        <div class="item">{{publishDetails.introduction}}</div>
        <div class="item">价格：{{publishDetails.price}}</div>
        <el-image fit="cover" class="image" v-for="(item, index) of images.src" :src="item" v-bind:key="index"
                  :preview-src-list="images.src"></el-image>
        <div class="item">发布者：{{publishDetails.username}}</div>
        <div class="item">发布时间：{{publishDetails.publishtime}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="openHandleReportDialog">处理</el-button>
    </span>
    </el-dialog>
    <el-dialog
      :visible.sync="HandleDialogVisible"
      title="处理举报内容"
      width="30%"
      class="handleReport"
      append-to-body
    >
      <el-form label-position="top">
        <el-form-item label="举报结果">
          <el-switch
            style="display: block"
            v-model="successReport"
            active-color="#13ce66"
            inactive-color="#409EFF"
            active-text="举报成功"
            inactive-text="举报失败">
          </el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input maxlength="150" type="textarea" v-model="remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="HandleDialogVisible=false">取 消</el-button>
      <el-button type="primary" @click='handle' :loading="handleLoading">发送</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['reportDetails', 'dialogVisible'],
  data () {
    return {
      publishDetails: '',
      images: [],
      HandleDialogVisible: false,
      successReport: false,
      remark: '',
      handleLoading: false
    }
  },
  name: 'reportDetails',
  methods: {
    handleClose: function () {
      this.$emit('listenToChildEvent', false)
      this.dialogVisible = false
    },
    handleRefresh: function () {
      this.$emit('refreshTable')
    },
    getPublishDetails: function () {
      this.$http(this.$api.getPublishById, {id: this.reportDetails.publishid}).then((res) => {
        if (res.id) {
          this.publishDetails = res
        } else {
          this.$message.error('未找到，请检查网络后重试')
        }
      })
      this.$http(this.$api.getDetailsImgs, {id: this.reportDetails.publishid}).then((res) => {
        console.log(res)
        this.images = res
      })
    },
    openHandleReportDialog () {
      this.HandleDialogVisible = true
    },
    handle () {
      this.handleLoading = true
      this.$http(this.$api.handleReport, {
        publishdetails: JSON.stringify(this.publishDetails),
        report: JSON.stringify(this.reportDetails),
        successreport: this.successReport,
        remark: this.remark,
        staff: this.$username
      }).then((res) => {
        if (res.success) {
          this.$message.success('处理成功！')
        } else {
          this.$message.error('处理失败！')
        }
        this.handleLoading = false
        this.HandleDialogVisible = false
        this.remark = ''
        this.handleClose()
        this.handleRefresh()
      })
    }
  }
}
</script>

<style scoped>
  .image {
    width: 20vw;
    height: 20vw;
    margin: 0.5vw;
  }

  .item{
    margin-bottom: 10px;
    font-size: 17px;
  }

  .publishdetails {
    margin-left: 20px;
  }
</style>
