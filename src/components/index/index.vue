<template>
  <div>
    <top-bar></top-bar>
    <SideBar class="sidebar"></SideBar>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import TopBar from '../utils/TopBar.vue'
import SideBar from '../utils/SideBar.vue'
export default {
  name: 'index',
  components: {
    TopBar,
    SideBar
  }
}
</script>

<style scoped>
  .view{
    margin-left: 220px;
    margin-top: 60px;
    min-height: calc(90vh);
  }
  .sidebar{
    position: fixed;
    width: 220px;
    height: 100%;
    z-index: 20;
    top: 0;
  }
</style>
