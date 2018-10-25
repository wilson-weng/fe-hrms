<template>
  <div>
    <el-card class="m-a-1 inline-block" style="width: 55%; vertical-align: top;">
      <el-tabs v-model="activePanel">
        <el-tab-pane label="项目介绍" name="1"></el-tab-pane>
        <el-tab-pane label="项目亮点" name="2"></el-tab-pane>
        <el-tab-pane label="工作详情" name="3"></el-tab-pane>
        <el-tab-pane label="分享设置" name="4"></el-tab-pane>
        <div v-if="activePanel == '1'">
          <proj-info-editor :onUpdate="reloadSimulator"></proj-info-editor>
        </div>
        <div v-if="activePanel == '2'">
          <proj-highlight-editor :onUpdate="reloadSimulator"></proj-highlight-editor>
        </div>
        <div v-if="activePanel == '3'">
          <proj-content-editor :onUpdate="reloadSimulator"></proj-content-editor>
        </div>
      </el-tabs>
    </el-card>
    <el-card class="m-a-1 inline-block text-center" style="width: 40%; vertical-align: top;">
      <h4>页面预览</h4>
      <iframe :src="simulatorUrl" class="simulator-container" frameborder="0" id="simulator"></iframe>
    </el-card>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ProjInfoEditor from "src/site/views/proj/components/projInfoEditor";
  import ProjContentEditor from "src/site/views/proj/components/projContentEditor";
  import ProjHighlightEditor from "src/site/views/proj/components/projHighlightEditor";


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
        simulatorUrl: 'http://localhost:5000/h5#/recruit/post?proj_id=1'
      }
    },
    methods: {
      reloadSimulator(){
        this.simulatorUrl = `http://localhost:5000/h5?timetamp=${Date.parse(new Date())}#/recruit/post?proj_id=1&`
      }
    }

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
