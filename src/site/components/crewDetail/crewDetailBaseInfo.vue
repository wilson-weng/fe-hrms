<template>
  <div>
    <info-list-item title="员工姓名" :value="current_crew.real_name"></info-list-item>
    <info-list-item title="手机号" :value="current_crew.phone"></info-list-item>
    <info-list-item title="身份证号" :value="current_crew.id_card_num"></info-list-item>
    <info-list-item title="当前项目" :value="current_crew.enrolled_proj"></info-list-item>
    <info-list-item title="入职时间" :value="current_crew.enrolled_time"></info-list-item>
    <info-list-item title="累计工作" :value="current_crew.work_days"></info-list-item>
    <info-list-item title="状态" :value="current_crew.status"></info-list-item>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import infoListItem from '../infoListItem';

export default {
  components: {infoListItem},
  computed: {
    ...mapState({
      current_crew: state => state.crew.current_crew,
    }),
  },
}
</script>

