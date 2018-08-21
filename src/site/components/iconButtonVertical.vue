<template>
  <el-button class="text-center">
    <i :class="icon" style="font-size: 28px;"></i>
    <div class="h4" style="margin-top: 8px">{{text}}</div>
  </el-button>
</template>

<script>
  export default {
    props: ['icon', 'text']
  }
</script>

