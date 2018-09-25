<template>
  <div>
    <el-card class="m-a-1">
      <div slot="header">基础信息</div>
      <crew-detail-base-info></crew-detail-base-info>
    </el-card>
    <el-card class="m-a-1">
      <div slot="header">收入信息</div>
      <crew-detail-wage-table></crew-detail-wage-table>
    </el-card>
    <el-card class="m-a-1">
      <div slot="header">赔付信息</div>
      <crew-detail-fine-table></crew-detail-fine-table>
    </el-card>
  </div>
</template>

<script>



import crewDetailBaseInfo from '../components/crew/crewDetailBaseInfo.vue';
import crewDetailWageTable from '../components/crew/crewDetailWageTable.vue';
import crewDetailFineTable from '../components/crew/crewDetailFineTable.vue';

export default {
  components: {crewDetailBaseInfo, crewDetailWageTable, crewDetailFineTable},
}

</script>
