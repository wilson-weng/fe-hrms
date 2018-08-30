<template>
  <div>
    <el-card class="m-a-1" v-for="proj in projList" :body-style="{padding: '10px'}" :key="proj.id">
      <div slot="header" class="clearfix">
        <img :src="proj.proj_thumbnail" class="image inline-block m-r-1">
        <div class="inline-block">
          <div class="h2">{{proj.proj_name}}</div>
          <div class="subtitle">{{proj.proj_desc}}</div>
        </div>
        <el-button class="pull-right" style="margin-top: 8px;" @click="enterProj(proj)" size="small">进入项目</el-button>
      </div>
      <div>
        <el-tag type="info" color="white">项目人数： {{proj.crew_num}}/{{proj.current_crew_num}}人</el-tag>
        <el-tag type="info" color="white">本月收入： {{proj.month_cumulate_revenue}}元</el-tag>
        <el-tag type="info" color="white">网招消息： {{proj.proj_msg_num}}条新消息</el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import statsCard from '../components/statsCard.vue';

  export default {
    components: { statsCard },
    computed: {
      ...mapState({
        projList: state => state.proj.proj_list,
      }),
    },
    methods: {
      ...mapActions(['setCurrentProj']),
      enterProj(proj){
        this.setCurrentProj(proj);
        this.$router.push({path: 'worktable'});
      }
    },
    created(){
      this.setCurrentProj({});
    }

  }
</script>

