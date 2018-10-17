<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <proj-record-list v-gear="'项目列表'"></proj-record-list>
  </el-card>
</template>

<script>
  import ProjRecordList from "src/site/components/proj/projRecordList";

  export default {
    components: {ProjRecordList,  },
  }
</script>

