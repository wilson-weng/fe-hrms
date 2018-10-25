<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <fine-record-list></fine-record-list>
    </el-card>
  </div>
</template>

<script>


  import FineRecordList from "src/site/views/fine/components/fineRecordList";

  export default {
    components: {FineRecordList },

    data() {
      return {
      }
    },
  }
</script>
