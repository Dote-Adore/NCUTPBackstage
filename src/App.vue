<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
import TopBar from './components/utils/TopBar.vue'
import SideBar from './components/utils/SideBar.vue'

export default {
  name: 'app',
  components: {
    TopBar,
    SideBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
  body{
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
