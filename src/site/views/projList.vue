<template>
  <div>
    <el-card class="m-a-1 p-a-1" v-for="proj in projList" :body-style="{padding: '10px'}" :key="proj.id">
      <el-row :gutter="10">
        <el-col :span="4">
          <img :src="proj.logo_url" class="image inline-block m-r-1" style="max-width: 100%; max-height: 80px">
        </el-col>
        <el-col :span="14">
          <div class="inline-block">
            <div class="h2">{{proj.proj_name}}</div>
            <div class="m-t-1">
              <el-tag type="info" color="white" v-for="tag in proj.tags.split(',')" :key="tag" style="margin: 5px">{{tag}}</el-tag>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="pull-right text-right">
            <el-button @click="enterProj(proj)">进入项目</el-button>
            <div class="m-t-1">收入范围：<span class="h2" style="color: #F56C6C">{{proj.wage_range}}</span></div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-pagination v-if="projTotalPage > 1"
      layout="prev, pager, next"
      :total="projTotalPage * 10"
      @current-change="onCurrentPageChange()"
    >
    </el-pagination>
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
        projTotalPage: state => state.proj.proj_total_page,
      }),
    },
    data(){
      return {
        page: 1
      }
    },
    methods: {
      ...mapActions(['setCurrentProj', 'getProjs']),
      enterProj(proj){
        this.setCurrentProj(proj);
        this.$router.push({path: 'worktable'});
      },
      onCurrentPageChange(page){
        this.getProjs({company_id: 1, page: page})
      }
    },
    created(){
      this.setCurrentProj({});
      this.getProjs({company_id: 1, page: 1})
    }

  }
</script>

