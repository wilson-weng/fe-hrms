<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <proj-record-list></proj-record-list>
  </el-card>
</template>

<script>
  import ProjRecordList from "src/site/views/proj/components/projRecordList";

  export default {
    components: {ProjRecordList,  },
  }
</script>

