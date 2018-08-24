<template>
  <el-card class="m-a-1">
    <el-row :gutter="20" type="flex">
      <el-col>
        <img :src="currentProj.proj_thumbnail" class="image pull-left m-r-1">
        <div class="h2">{{currentProj.proj_name}}</div>
        <div class="subtitle">{{currentProj.proj_desc}}</div>
      </el-col>
      <el-col>
        <el-button class="pull-right" style="margin-top: 8px;" @click="backToProjList()" size="small">项目列表</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
      }),
    },
    methods: {
      backToProjList(){
        this.$router.push({path: '/proj'});
      }
    }

  }
</script>

