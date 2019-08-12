<template>
  <div>
  <el-dialog
    :visible.sync="dialogVisible"
    title="详情"
    width="70%"
    >
    <div>
      <el-avatar class="avatar" :size="80" :src="detailsData.avatar"></el-avatar>
      <span class="username">{{detailsData.username}}</span>
    </div>
    <div class="container">
      <span class="price">￥{{detailsData.price}}</span>
      <span class="intro" v-html="detailsData.introduction"></span>
      <el-image class="image" fit="contain" v-for="(item, index) of images.src" :src="item" v-bind:key="index" :preview-src-list="images.src"></el-image>
      <!--评论区-->
      <div class="comments">
        <div class="comentitem" v-for="(item) of comments" v-bind:key="item.id">
          <el-avatar :size="60" :src="item.useravatar" class="commentAva"></el-avatar>
          <div>
          <span class="commentUser">{{item.username}}</span>
          <span class="commenttime">{{item.time}}</span>
          </div>
          <div class="commentcontent">{{item.content}}</div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="deletePublish">删除</el-button>
    </span>
  </el-dialog>
      <el-dialog
        :visible.sync="deleteDialogVisible"
        title="请填写违规内容"
        width="30%"
        class="deleteDialog"
        append-to-body
      >
        <el-form label-position="top" :model="form" ref="form" class="deleteform" label-width="80px">
          <el-form-item label="违规性质">
            <el-checkbox-group  @change="handleChange" v-model="form.violatingcontent">
              <el-checkbox label="图片涉嫌传播不当内容"></el-checkbox>
              <el-checkbox label="商品介绍涉嫌违法"></el-checkbox>
              <el-checkbox label="禁止发布的商品类型"></el-checkbox>
              <el-checkbox label="评论区涉嫌谩骂"></el-checkbox>
              <el-checkbox label="重复发布相同内容"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-alert
            title="请选择至少一条违规性质"
            type="warning"
            effect="dark"
            :closable="false"
            show-icon
            :style="VCWarningShow">
          </el-alert>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" @input="inputRemark"></el-input>
          </el-form-item>
          <el-alert
            title="请填写备注"
            type="warning"
            effect="dark"
            :closable="false"
            show-icon
            :style="RWarningShow">
          </el-alert>
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm2Delete" :loading="commitloading">提交</el-button>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'publishDetails',
  props: ['detailsData', 'dialogVisible', 'images', 'comments'],
  data () {
    return {
      deleteDialogVisible: false,
      form: {
        remark: '',
        violatingcontent: [],
        processingstaff: '',
        publishcontent: '',
        userid: 0,
        publishid: 0,
        imagesrc: ''
      },
      VCWarningShow: {
        display: 'none'
      },
      RWarningShow: {
        display: 'none'
      },
      hideEle: {
        display: 'none'
      },
      commitloading: false
    }
  },
  methods: {
    deletePublish () {
      console.log('delete')
      this.deleteDialogVisible = true
    },
    handleChange () {
      if (this.form.violatingcontent[0]) {
        console.log(this.form.violatingcontent)
        this.VCWarningShow = this.hideEle
      } else {
        this.VCWarningShow = ''
      }
    },
    inputRemark () {
      if (this.form.remark === '') {
        this.RWarningShow = ''
      } else {
        this.RWarningShow = this.hideEle
      }
    },
    confirm2Delete () {
      if (!this.form.violatingcontent[0] || this.form.remark === '') {
        this.handleChange()
        this.inputRemark()
        return
      }
      this.commitloading = true
      this.form.publishcontent = this.detailsData.introduction
      this.form.processingstaff = this.$username
      this.form.violatingcontent = this.form.violatingcontent.join(';')
      this.form.userid = this.detailsData.userid
      this.form.publishid = this.detailsData.id
      this.form.imagesrc = this.detailsData.mainimgsrc
      console.log(this.form)
      this.$http(this.$api.deletepublish, this.form).then((res) => {
        if (res.success) {
          this.$message({
            message: '处理成功！',
            type: 'success'
          })
          this.deleteDialogVisible = false
          this.dialogVisible = false
          this.form = {
            remark: '',
            violatingcontent: [],
            processingstaff: '',
            publishcontent: '',
            userid: 0,
            publishid: 0,
            imagesrc: ''
          }
          this.commitloading = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .price{
    color: orangered;
    font-size: 24px;
  }
  .avatar{
    position: absolute;
    top: -40px;
    left:20px;
  }
  .username{
    position: absolute;
    top: 10px;
    left: 100px;
    font-size: 20px;
  }
  .intro{
    display: block;
    font-size: 17px;
    text-align: left;
    margin-bottom: 20px;
  }
  .image{
    width: 40%;
    margin: 10px;
    box-shadow: 5px 5px 10px lightgrey;
  }
  .deleteDialog{
    min-width: 200px;
  }
  .commentAva{
    float: left;
  }
  .comments{

  }
  .comentitem{
    overflow: auto;
    padding: 10px;
    position: relative;
    border: 0px #dedede solid;
    border-width: 0 0 1px 0;
  }
  .commentUser{
    float: left;
    margin: 7px;
    font-size: 17px;
    font-weight: bold;
  }
  .commenttime{
    float: left;
    margin: 7px;
    font-size: 17px;
    color: #8c939d;
  }
  .commentcontent{
    display: block;
    text-align: left;
    top: 50px;
    left: 80px;
    font-size: 17px;
    margin: 40px 0 0 70px;
    padding-bottom: 10px;
  }
</style>
