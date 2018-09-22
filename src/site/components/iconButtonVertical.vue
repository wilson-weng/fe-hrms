<template>
  <el-button class="text-center" style="padding: 12px;" @click="onClickHandle()">
    <i :class="icon" style="font-size: 18px;"></i>
    <div class="subtitle" style="margin-top: 8px">{{text}}</div>
  </el-button>
</template>

<script>
  export default {
    props: ['icon', 'text', 'toPath', 'onClick'],
    methods: {
      onClickHandle() {
        this.toPath && this.$router.push(this.toPath);
        this.onClick && this.onClick();
      }
    }
  }
</script>

