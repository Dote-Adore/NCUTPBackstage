<template>
  <div style="text-align: center">
    <!--数据总览-->
    <div class="statistics">
    <el-card class="box">
      <div class="text">今日全部发布</div>
        <i class="el-icon-s-promotion boxicon" ></i>
      <div class="info">{{publishnum}}条</div>
    </el-card>
    <el-card class="box">
      <div class="text">今日访问次数</div>
        <i class="el-icon-s-custom boxicon" ></i>
      <div class="info">{{seennum}}次</div>
    </el-card>
    <el-card class="box">
      <div class="text">成功交易</div>
      <i class="el-icon-s-finance boxicon" ></i>
      <div class="info">{{sellednum}}次</div>
    </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'overview',
  data () {
    return {
      publishnum: 20,
      seennum: 165,
      sellednum: 30
    }
  }

}
</script>
<style scoped>
  .boxicon{
    float: left;
    transform: scale(4.5);
    margin: 20px 0 0 20px;
  }
  .box{
    width: 25%;
    float: left;
    margin: 4%;
    transition: 0.5s;
  }
  .statistics{
    overflow: hidden;
  }
  .text{
    font-size: 20px;
  }
  .info{
    font-size: 35px;
    margin: 20px;
  }
</style>
