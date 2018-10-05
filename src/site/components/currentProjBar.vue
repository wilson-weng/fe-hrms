<template>
  <el-card class="m-a-1">
    <el-row :gutter="10" type="flex">
      <el-col :span="3">
        <img :src="proj.logo_url" class="image inline-block m-r-1" style="max-width: 100%; max-height: 80px">
      </el-col>
      <el-col :span="15">
        <div class="inline-block">
          <div class="h2">{{proj.proj_name}}</div>
          <div class="m-t-1">
            <el-tag type="info" color="white" v-for="tag in proj.tags.split(',')" :key="tag" style="margin: 5px">{{tag}}</el-tag>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="pull-right text-right">
          <el-button @click="backToProjList()">项目列表</el-button>
          <div class="m-t-1">收入范围：<span class="h2" style="color: #F56C6C">{{proj.wage_range}}</span></div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        proj: state => state.global.current_proj,
      }),
    },
    methods: {
      backToProjList(){
        this.$router.push({path: '/proj'});
      }
    }

  }
</script>

