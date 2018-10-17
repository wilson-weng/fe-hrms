<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <crew-record-list v-gear="'人员列表'"></crew-record-list>
    </el-card>
  </div>
</template>

<script>


  import CrewRecordList from "src/site/components/crew/crewRecordList";

  export default {
    components: {CrewRecordList },

    data() {
      return {
      }
    },
  }
</script>
