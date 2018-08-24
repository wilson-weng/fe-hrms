<template>
  <el-button class="text-center" @click="onClick()">
    <i :class="icon" style="font-size: 28px;"></i>
    <div class="h4" style="margin-top: 8px">{{text}}</div>
  </el-button>
</template>

<script>
  export default {
    props: ['icon', 'text', 'toPath'],
    methods: {
      onClick() {
        this.toPath && this.$router.push(this.toPath)
      }
    }
  }
</script>

