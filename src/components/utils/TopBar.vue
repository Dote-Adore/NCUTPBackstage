<template>
  <div>
  <div class='topbar'>
    <a class='name'>南大咸鱼后台</a>
    <a class='btns' @click='issignOut'> 退出登录</a>
  </div>
    <el-dialog
      title="提示"
      :visible.sync="signOutDialog"
      width="30%"
      :before-close="handleClose">
      <span>确定要登出吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="signOutDialog = false">取 消</el-button>
    <el-button type="primary" @click="signOut()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default{
  name: 'TopBar',
  data () {
    return {
      signOutDialog: false
    }
  },
  methods: {
    signOut () {
      this.signOutDialog = false
      window.localStorage.removeItem('data')
      this.$message({
        message: '登出成功！',
        type: 'success'
      })
      this.$router.push('/login')
    },
    issignOut () {
      this.signOutDialog = true
    }
  }
}
</script>

<style>
  .topbar{
    position: fixed;
    height: 60px;
    background-color: white;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    box-shadow: 5px 5px 5px rgba(180, 180, 180, 0.43);
  }
  .name{
    margin-left: 20px;
    color: white;
    float: left;
    line-height: 60px;
    font-size: 20px;
  }
  .btns{
    padding: 0 20px 0 10px;
    float: right;
    color: black;
    line-height: 60px;
  }
  .btns:hover{
    cursor: pointer;
  }
</style>
