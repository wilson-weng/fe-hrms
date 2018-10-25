<template>
  <div>
    <el-alert
      class="m-t-1"
      title="建议分为： 薪资待遇，住宿餐饮，工作说明，招聘要求，入职材料，企业介绍六个部分"
      type="warning" :closable="false">
    </el-alert>
    <draggable v-model="projContent.detail" @update="onDragItemHandle()">
      <el-card  v-for="item in projContent.detail" :key="item.id" class="m-t-1">
        <div slot="header">{{item.title}}
          <span class="pull-right">
        <el-button icon="el-icon-edit" circle size="small" @click="showEditorHandler(item)"></el-button>
        <el-button icon="el-icon-delete" circle size="small" @click="showDeleteHandler(item)"></el-button>
      </span>
        </div>
        <div v-html="item.rich_text"></div>
      </el-card>
    </draggable>

    <div class="text-right m-t-1">

      <div class="subtitle pull-left" style="margin: 6px">小提示： 拖拽方框可以调整顺序</div>
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
    <el-dialog
      :visible.sync="showConfirmDeleteDialog" :before-close="beforeCloseEditor"
      width="30%">
      <span>点击确认删除该条目。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  import RichTextEditor from "src/site/components/richTextEditor";
  import { mapState, mapActions } from 'vuex';
  import draggable from 'vuedraggable'

  export default {
    name: "projContentEditor",
    props: ['onUpdate'],
    components: { RichTextEditor, draggable},
    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
      }),
    },

    data() {
      return {
        richtext: {},
        showEditor: false,
        projContent: {},
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
          text_type: 'proj_recruit_detail',
          proj_id: this.currentProj.id,
        };

        if(this.richtext.id){
          params.rich_text_id = this.richtext.id;
          params.sequence = this.richtext.sequence;
        }else{
          let title = this.richtext.title;
          let duplicateItem = this.projContent.detail.find(item => item.title === title);
          if(duplicateItem){
            this.showTitleError = true;
            return;
          }
        }
        this.createRichText(params).then(()=>{
          this.getProjContent(this.currentProj.id).then(result=>{
            this.projContent = result;
            this.$message({message: '更新成功！', type: 'success'});
            this.onUpdate(params)
          });
          this.showEditor = false;
        })
      },
      showEditorHandler(item){
        this.richtext = JSON.parse(JSON.stringify(item));
        this.showEditor = true;
      },
      showDeleteHandler(item){
        this.richtext = item;
        this.showConfirmDeleteDialog = true;
      },
      confirmDelete(){
        this.deleteRichText(this.richtext.id).then(()=>{
          this.getProjContent(this.currentProj.id).then(result=>{
            this.projContent = result;
            this.$message({message: '已删除！', type: 'success'});
            this.showConfirmDeleteDialog = false;
          });
        })
      },
      onDragItemHandle(){
        this.projContent.detail.map((item, index)=>{
          item.sequence = index;
          item.rich_text_id = item.id;
          this.createRichText(item);
        })
      },
      beforeCloseEditor(done){
        this.richtext = {};
        done();
      }
    },

    mounted() {
    }
  }
</script>

<style scoped>

</style>
