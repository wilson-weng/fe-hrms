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
import { mapState, mapActions } from 'vuex';
import crewDetailBaseInfo from '../components/crewDetail/crewDetailBaseInfo.vue';
import crewDetailWageTable from '../components/crewDetail/crewDetailWageTable.vue';
import crewDetailFineTable from '../components/crewDetail/crewDetailFineTable.vue';

export default {
  components: { crewDetailBaseInfo, crewDetailWageTable, crewDetailFineTable},

  data () {
    return {}
  },
  computed: {
    ...mapState({
      current_crew: state => state.crew.current_crew,
    }),
  },
  created(){
    console.log(this.current_crew)
  }
}
</script>
