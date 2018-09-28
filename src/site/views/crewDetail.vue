<template>
  <div>
    <el-button type="text" class="m-l-1" icon="el-icon-d-arrow-left" style="margin: -10px 0" @click="back()">返回</el-button>
    <el-card class="m-a-1">
      <div slot="header">基础信息</div>
      <crew-detail-base-info></crew-detail-base-info>
    </el-card>
    <crew-detail-wage-table></crew-detail-wage-table>
    <crew-detail-fine-table></crew-detail-fine-table>
  </div>
</template>

<script>



import crewDetailBaseInfo from '../components/crew/crewDetailBaseInfo.vue';
import crewDetailWageTable from '../components/crew/crewDetailWageTable.vue';
import crewDetailFineTable from '../components/crew/crewDetailFineTable.vue';

export default {
  components: {crewDetailBaseInfo, crewDetailWageTable, crewDetailFineTable},
  methods: {
    back(){
      history.back(-1);
    }
  }
}

</script>
