<template>
  <el-card class="m-a-1">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-tabs v-model="activePanel">
          <el-tab-pane label="项目介绍" name="1"></el-tab-pane>
          <el-tab-pane label="项目亮点" name="2"></el-tab-pane>
          <el-tab-pane label="工作详情" name="3"></el-tab-pane>
          <el-tab-pane label="分享设置" name="4"></el-tab-pane>
          <div v-if="activePanel == '1'">
            <proj-info-editor></proj-info-editor>
          </div>
          <div v-if="activePanel == '2'">
            <proj-highlight-editor></proj-highlight-editor>
          </div>
          <div v-if="activePanel == '3'">
            <proj-content-editor></proj-content-editor>
          </div>
        </el-tabs>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ProjInfoEditor from "src/site/components/recruit/projInfoEditor";
  import ProjContentEditor from "src/site/components/recruit/projContentEditor";
  import ProjHighlightEditor from "src/site/components/recruit/projHighlightEditor";


  export default {
    components: {ProjHighlightEditor, ProjContentEditor, ProjInfoEditor },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
      }),
    },

    data() {
      return {
        activePanel: '1',
      }
    },


  }
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
