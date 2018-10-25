<template>
  <div>
    <el-alert
      class="m-t-1"
      title="项目亮点介绍，如返费，提成，绩效奖励机制,会在页面突出展示"
      type="warning" :closable="false">
    </el-alert>
    <el-card class="m-t-1" v-if="highlight">
      <div slot="header">{{highlight.title}}
        <span class="pull-right">
            <el-button icon="el-icon-edit" circle size="small" @click="showEditorHandler(highlight)"></el-button>
          </span>
      </div>
      <div v-html="highlight.rich_text"></div>
    </el-card>
    <div class="text-right m-t-1" v-else>
      <el-button type="primary" @click="showEditorHandler({})">+ 新增</el-button>
    </div>
    <el-dialog :visible.sync="showEditor" width="50%" :title="richtext.id? '修改条目':'新增条目'">
      <el-form  label-position="right" label-width="100px" :model="richtext" class="p-r-3">
        <el-form-item label="标题: ">
          <el-input
            v-model="richtext.title" style="max-width: 300px">
          </el-input>
          <el-alert
            class="m-t-1"
            title="该标题已存在，请到对应的条目修改"
            type="error" show-icon v-show="showTitleError" :closable="false">
          </el-alert>
        </el-form-item>
        <el-form-item label="内容: ">
          <rich-text-editor ref="richtext" :content="richtext.rich_text"></rich-text-editor>
          <div class="text-right m-t-1">
            <el-button type="primary" @click="saveRichtext()">保存</el-button>
            <el-button @click="showEditor=false">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import RichTextEditor from "src/site/components/richTextEditor";
  import { mapState, mapActions } from 'vuex';

  export default {
    name: "projHighlightEditor",
    props: ['onUpdate'],
    components: { RichTextEditor},
    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
      }),
    },

    data() {
      return {
        richtext: {},
        showEditor: false,
        highlight: {},
        showTitleError: false,
        showConfirmDeleteDialog: false
      }
    },
    methods: {
      ...mapActions(['createRichText', 'getProjContent', 'deleteRichText']),
      saveRichtext(){
        let html = this.$refs.richtext.getRichText();
        let params = {
          title: this.richtext.title,
          rich_text: html,
          text_type: 'proj_highlight',
          proj_id: this.currentProj.id,
          sequence: 1
        };
        if(this.highlight){
          params.rich_text_id = this.highlight.id;
        }
        this.createRichText(params).then(()=>{
          this.getProjContent(this.currentProj.id).then(result=>{
            this.highlight = result.highlight;
            this.$message({message: '更新成功！', type: 'success'});
            this.onUpdate(this.highlight);
          });
          this.showEditor = false;
        })
      },
      showEditorHandler(item){
        this.richtext = item;
        this.showEditor = true;
      },
    },

    mounted() {
    }
  }
</script>

<style scoped>

</style>
