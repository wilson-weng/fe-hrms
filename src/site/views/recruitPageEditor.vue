<template>
  <el-card class="m-a-1">
    <div class="clearfix" slot="header">
      <span>招募贴编辑</span>
      <el-button class="pull-right color-text-hint" type="text" style="padding: 7px;" @click="goBack()">关闭</el-button>
    </div>
    <el-row>
      <el-col :span="12">
        <label>分享标题:</label>
        <el-input v-model="title" style="width: 220px;" placeholder="请设置分享标题"></el-input>
      </el-col>
      <el-col :span="12">
        <upLoad style="display: inline-block;" autoUpload :fileType="'pic'" @uploadSuccess="uploadSuccess"></upLoad> <span v-if="!imgShow">（建议图片尺寸：700*390）</span><a :href="mainUrl" style="text-decoration: none;" target="_blank" v-if="imgShow">查看图片</a>
      </el-col>
    </el-row>
    <div class="m-t-1">
      <div id="editor-menu" style="border: 1px solid #ccc; margin-bottom: -1px;"></div>
      <div id="editor-content" style="border: 1px solid #ccc; height: 600px;"></div>
    </div>
    <div class="m-t-1 text-right">
      <el-button type="primary" @click="submit()">提交</el-button>
      <el-button type="warning" @click="goBack()">取消</el-button>
    </div>
  </el-card>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import E from 'wangeditor';
  import upLoad from '../components/upload.vue';


  export default {
    components: { upLoad },

    computed: {
      ...mapState({
      }),
    },

    methods: {
      ...mapActions([]),
      uploadSuccess(url) {
        this.mainUrl = url;
        this.imgShow = true;
      },
      goBack(){
        window.history.back();
      }
    },

    data() {
      return {
        loading: false,
        tableData: [],
        curPage: 1,
        count: 10,
        curMode: '',
        curIndex: '',
        curActivity: {},
        title: '',
        mainUrl: '',
        imgShow: false,
        editorShow: false,
        editor: null,
        editorContent: '',
      }
    },

    mounted() {
      this.$nextTick(() => {
        this.editor = new E('#editor-menu', '#editor-content');
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html;
          console.log(this.editorContent);
        };
        this.editor.create();
        this.editor.txt.html(this.editorContent);
      });
    }
  }
</script>
