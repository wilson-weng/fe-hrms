<template>
  <div>
    <el-row>
      <el-col  v-for='item in Object.keys(current_crew)'>
        <info-list-item :title="item" :value="current_crew[item]" :key="item"></info-list-item>
      </el-col>
    </el-row>
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

