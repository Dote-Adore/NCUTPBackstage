<template>
  <div>
    <el-menu  default-active="overview" class="el-menu-vertical-demo menu"  background-color="#545c64"
              text-color="#fff" router>
      <div class="title">
        <span>二手咸鱼后台</span>
      </div>
        <el-menu-item index="overview">
          <i class="el-icon-menu"></i>
          <span slot="title">总览</span>
        </el-menu-item>
        <el-menu-item index="allPublish">
          <i class="el-icon-document"></i>
          <span slot="title">全部发布</span>
        </el-menu-item>
        <el-menu-item index="myInfo">
          <i class="el-icon-user"></i>
          <span slot="title">我的处理</span>
        </el-menu-item>
      <el-menu-item index="report">
        <i class="el-icon-message"></i>
        <span slot="title">举报消息</span>
      </el-menu-item>
      </el-menu>
  </div>
</template>
<script>

export default{
  name: 'SideBar',
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
  }
}
</script>

<style>
  .title{
    color: white;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    text-align: center;
  }
  .menu{
    margin: 0;
    height: 100%;
    width: 100%;
  }

</style>
