<template>
  <div v-loading="loading" :lock="true" v-infinite-scroll="loadMore" :style="allpublishstyle">
     <el-card  body-style="padding: 0" class="publishitem" v-for="item of datas" v-bind:key="item.id">
       <div @click="toDetails(item)" style="overflow: hidden"><el-image :src="item.mainimgsrc" fit="cover" class="image"/></div>
       <el-avatar class="avatar" :size="65" :src="item.avatar"></el-avatar>
       <div style="padding: 14px;">
         <span class="price">￥{{item.price}}</span>
         <span class="intro" v-html="item.introduction"></span>
         <div class="bottom clearfix">
           <time class="time">{{item.publishtime}}</time>
         </div>
       </div>
     </el-card>
    <!--加载更多-->
    <div v-if="showMoreLoading" v-loading="showMoreLoading" style="height: 100px; width: 100%"></div>
    <div v-if="noMore" style="height: 100px; line-height: 100px; font-size: 17px; color: #8c939d">再找也没有啦~~</div>
    <!--二手详情-->
    <PublishDetails :detailsData="detailsData" :dialogVisible="dialogVisible" :images="images" :comments="comments"/>
    <!--刷新按钮-->
    <div class="rightBtns" @click="refresh">
      <i class="el-icon-refresh"></i>
    </div>
    <!--回到顶部按钮-->
    <el-backtop target=".myscroll">
      <div class="backToTop">
        <i class="el-icon-caret-top"></i>
    </div>

    </el-backtop>
  </div>
</template>

<script>
import TopBar from '../utils/TopBar.vue'
import SideBar from '../utils/SideBar.vue'
import PublishDetails from './model/publishDetails.vue'
export default {
  name: 'allPublish',
  components: {
    PublishDetails,
    TopBar,
    SideBar
  },
  data () {
    return {
      detailsData: {id: 2, name: 4},
      dialogVisible: false,
      page: 0,
      datas: [],
      images: [],
      comments: [],
      loading: false,
      count: 5,
      canloadmore: false,
      showMoreLoading: false,
      noMore: false,
      allpublishstyle: {
        overflow: 'auto',
        height: (document.documentElement.clientHeight - 65) + 'px',
        'text-align': 'center'
      }
    }
  },
  methods: {
    getPublishData () {
      this.dialogVisible = false
      this.canloadmore = false
      this.$http(this.$api.get, {page: this.page}).then((res) => {
        this.loading = false
        console.log(res)
        if (res[0] != null) {
          for (let i = 0; i < res.length; i++) {
            this.datas.push(res[i])
            this.warp()
          }
        } else {
          this.page = this.page - 1
          this.noMore = true
        }
        this.canloadmore = true
        this.showMoreLoading = false
      })
    },
    toDetails (item) {
      var that = this
      this.dialogVisible = false
      this.$http(this.$api.getDetailsImgs, {id: item.id}).then((res) => {
        console.log(res)
        that.images = res
      })
      this.$http(this.$api.getcomments, {publishid: item.id}).then((res) => {
        that.comments = res
      })
      this.detailsData = item
      this.dialogVisible = true
    },
    warp () {
      for (let i = 0; i < this.datas.length; i++) {
        this.datas[i].introduction = this.datas[i].introduction.replace(/\n/g, '</br>')
      }
    },
    // 显示下一页内容,
    loadMore () {
      if (this.canloadmore && !this.noMore) {
        this.showMoreLoading = true
        console.log('showMore')
        this.page = this.page + 1
        this.getPublishData(true)
      }
    },
    refresh () {
      this.page = 0
      this.datas = []
      this.getPublishData()
      this.loading = true
      this.noMore = false
    }
  },
  created: function () {
    // `this` 指向 vm 实例
    this.loading = true
    this.getPublishData()
  },
  mounted () {
    // 监听屏幕变化并更改背景的适应方式
    window.onresize = () => {
      this.allpublishstyle.height = (document.documentElement.clientHeight - 65) + 'px'
    }
  }

}
</script>

<style scoped>
  .price{
    color: orangered;
    display: block;
    text-align: left;
  }
  .avatar{
    position: absolute;
    right: 10px;
    top: 190px;
  }
  .publishitem{
    width: 250px;
    border-radius: 10px;
    height: 360px;
    margin: 20px;
    position: relative;
    display: inline-block;
    transition: 0.3s;
  }
  .image{
    width:100%;
    top: 0;
    left: 0;
    height: 220px;
    transition: 0.3s;
    overflow-y: hidden;
  }
  .image:hover{
    cursor:pointer;
    transition: 0.3s;
    -webkit-filter:saturate(120%) brightness(120%);
    transform: scale(1.03);
  }
  .intro{
    margin-top: 10px;
    font-size: 15px;
    overflow-y: hidden;
    display: block;
    height: 55px;
    text-align: left;
    margin-bottom: 10px;
  }
  .time{
    text-align: right;
    display: block;
    color: #8c939d;
    font-size: 14px;
  }
  .rightBtns{
    position: fixed;
    height:40px;
    width: 40px;
    right: 40px;
    top: calc(85%);
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    font-size: 30px;
    color: #409EFF;
    line-height: 40px;
  }
  .backToTop{
    height: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 0 0 6px rgba(0,0,0, .12);
    text-align: center;
    line-height: 40px;
    color: #409EFF;
  }
</style>
