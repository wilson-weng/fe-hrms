<template>
  <div class="info-list-item">
    <div class="info-title">{{title}}:</div><div class="info-value">{{value}}</div>
  </div>
</template>

<script>
export default {
  props: ['title', 'value'],
}
</script>

<style scoped>
  .info-list-item {
    font-size: 14px;
    margin-bottom: 6px;
  }

  .info-title {
    width: 150px;
    text-align: right;
    display: inline-block;
    color: #999999;
    margin-right: 20px;
  }

  .info-value {
    display: inline-block;
  }
</style>
