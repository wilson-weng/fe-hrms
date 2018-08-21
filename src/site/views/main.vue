<template>
    <el-container class="height-100">
      <el-header class="layout-header">
        <nav-top></nav-top>
      </el-header>
      <el-container class="height-100">
          <el-aside width="200px">
            <nav-slider></nav-slider>
          </el-aside>
          <div style="background-color: #F9FBFD;" class="width-100">
            <current-proj-bar v-if="showProjBar"></current-proj-bar>
            <router-view class="router-view"></router-view>
          </div>
      </el-container>
    </el-container>
</template>


<script>
  import navTop from '../components/layout/navTop.vue';
  import navSlider from '../components/layout/navSlider.vue';
  import currentProjBar from '../components/currentProjBar.vue';

  export default {
    components: { navTop, navSlider, currentProjBar},

    data() {
      return {
        showProjBar: false
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name == 'proj'){
            this.showProjBar = false;
          }else{
            this.showProjBar = true;
          }
        },
        // 深度观察监听
        deep: true
      }
    },
  }
</script>
