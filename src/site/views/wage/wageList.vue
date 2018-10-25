<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <div slot="header" class="clearfix">
        <span style="margin-top: 5px; margin-right: 20px;">结算规则</span>
        <span class="subtitle">每小时14元，上限每天12小时，工作件数超过1000件后，额外每件0.001元，总收入上限不超过240元每日</span>
      </div>
    </el-card>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <wage-record-list v-gear="'结算列表'"></wage-record-list>
    </el-card>
  </div>
</template>

<script>
  import WageRecordList from "src/site/views/wage/components/wageRecordList";

  export default {
    components: { WageRecordList },
  }
</script>
