<template>
  <div>
    <el-button type="text" class="m-l-1 m-t-1" icon="el-icon-d-arrow-left" style="margin: -10px 0" @click="back()">返回</el-button>
    <el-card class="m-a-1">
      <div slot="header">基础信息</div>
      <crew-detail-base-info></crew-detail-base-info>
    </el-card>
    <wage-record-list :crew-id="currentCrew.id"></wage-record-list>
    <fine-record-list :crew-id="currentCrew.id"></fine-record-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import crewDetailBaseInfo from './components/crewDetailBaseInfo.vue';
import FineRecordList from "src/site/views/fine/components/fineRecordList";
import WageRecordList from "src/site/views/wage/components/wageRecordList";

export default {
  components: {WageRecordList, FineRecordList, crewDetailBaseInfo, },
  computed: {
    ...mapState({
      currentCrew: state => state.crew.current_crew,
    }),
  },
  methods: {
    back(){
      history.back(-1);
    }
  }
}

</script>
