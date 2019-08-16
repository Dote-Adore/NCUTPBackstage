<template>
  <div>
    <div class="background">
    <img  v-bind:style="toFix"  :src="backgroundSrc"/>
    </div>
    <div class="loginContain">
      <div>
        <img :style="[loginBG,{left:windowWidth*(-0.15)+'px'},{top:windowHeight*(-0.3)+'px'} ]"  :src="backgroundSrc"/>
      </div>
      <div class="title">
        南大咸鱼后台管理
      </div>
      <div class="inputbox">
        <img class='icon' src="../../assets/icon/user.png"/>
        <input class='inputArea' type="text" placeholder="请输入您的用户名" v-model="user"/>
      </div>
      <div class="inputbox">
        <img class='icon' src="../../assets/icon/password.png"/>
        <input class='inputArea' type="password" placeholder="请输入您的密码" v-model="password"/>
      </div>
      <el-button  type="primary" class="loginBtn" round @click="tologin" autofocus="true" :loading="isloading">登录</el-button>
    </div>
    <div class="bottomBar">

      <el-link href="https://github.com/Dote-Adore/" target="_blank">关于作者 |</el-link>
      <el-link href="http://www.beian.miit.gov.cn/" target="_blank">赣ICP备19008853号</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      windowWidth: document.body.offsetWidth,
      windowHeight: document.body.offsetHeight,
      toFix: {
        width: '100%'
      },
      loginBG: {
        position: 'absolute',
        width: this.windowWidth + 'px',
        left: 0,
        zIndex: '-2',
        opacity: 0.4,
        filter: 'blur(20px) saturate(170%) brightness(200%)'
      },
      user: '',
      password: '',
      isloading: false,
      backgroundSrc: 'https://ncutradingplatform.oss-cn-shanghai.aliyuncs.com/sucai/loginBackground.jpg'
    }
  },
  methods: {
    tologin () {
      if (this.user === '' || this.user === null) {
        this.$message.error('请输入用户名')
        return
      }
      if (this.password === '' || this.password === null) {
        this.$message.error('请输入密码')
        return
      }
      this.isloading = true
      this.$http(this.$api.login, {user: this.user, password: this.password}).then((res) => {
        if (res.success) {
          this.$message({
            message: '登录成功！',
            type: 'success'
          })
          // 创建session
          var ses = window.localStorage
          ses.setItem('data', res.session)
          this.$router.push('/overview')
        } else {
          this.$message.error('用户名或密码错误，请检查后重试！')
        }
        this.isloading = false
      })
    }
  },
  mounted () {
    // 监听屏幕变化并更改背景的适应方式
    window.onresize = () => {
      return (() => {
        var windowHeight = document.getElementsByClassName('background')[0].clientHeight
        var windowWidth = document.getElementsByClassName('background')[0].clientWidth
        this.windowWidth = windowWidth
        this.windowHeight = windowHeight
        if (windowHeight / 9 > windowWidth / 16) {
          this.toFix = {height: '100%'}
        } else {
          this.toFix = {width: '100%'}
        }
      })()
    }
  }
}
</script>

<style scoped>
  .background{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
    top:0;
    left: 0;
  }
  .loginContain{
    border-radius: 10px;
    top: 30%;
    width: 450px;
    height: 260px;
    left: 0;
    position: absolute;
    background-color: white;
    text-align: center;
    margin-left: 15%;
    z-index: 2;
    padding: 30px 20px 30px 20px ;
    box-shadow: 10px 10px 15px rgba(39, 39, 39, 0.24);
    overflow: hidden;
    background-color: white;
  }
  .title{
    margin: 20px;
    font-size: 30px;
    color: black;
    opacity: 0.5;
    font-weight: bold;
  }
  .icon{
    width: 20px;
  }
  .inputArea{
    border: none;
    font-size: 17px;
    margin-left: 10px;
  }
  .inputbox{
    margin: 10px 20% 10px 20%;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #EFEFEF;
    padding: 10px 0 10px 0;
  }
  input{
    background-color: white;
    opacity: 0.4;
  }
  .loginBtn{
    font-size: 17px;
    padding: 7px;
    border-radius: 5px;
    width: 200px;
    margin-top: 20px;
    transition: 0.3s;
  }
  .loginBtn:hover{
    transition: 0.3s;
  }
  .bottomBar {
    z-index: 3;
    text-align: center;
    padding: 10px 0 10px 0;
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 0;
    background-color: ghostwhite;
    opacity: 0.9;
  }
</style>
