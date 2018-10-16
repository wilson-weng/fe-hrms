<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <fine-record-list v-gear="'赔付列表'"></fine-record-list>
    </el-card>
  </div>
</template>

<script>


  import FineRecordList from "src/site/components/fine/fineRecordList";

  export default {
    components: {FineRecordList },

    data() {
      return {
      }
    },
  }
</script>
