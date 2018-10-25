<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <crew-record-list></crew-record-list>
    </el-card>
  </div>
</template>

<script>


  import CrewRecordList from "src/site/views/crew/components/crewRecordList";

  export default {
    components: {CrewRecordList },

    data() {
      return {
      }
    },
  }
</script>
