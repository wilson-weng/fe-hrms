<template>
  <el-form label-position="right" label-width="100px" :model="projModel" v-loading="loading">
    <el-form-item label="项目logo: ">
      <img-square :url="projModel.logo_url" :on-remove="showLogoUploaderHandle" v-show="!showLogoUploader"></img-square>
      <img-uploader ref="logoUpload" img-type="logo" v-show="showLogoUploader"></img-uploader>
    </el-form-item>
    <el-form-item label="项目名称: ">
      <el-input
        v-model="projModel.proj_name" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="项目地址: ">
      <el-input
        v-model="projModel.address" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="需求人数: ">
      <el-input
        v-model="projModel.crew_num" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="收入范围: ">
      <el-input
        v-model="projModel.wage_range" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="项目标签: ">
      <el-tag
        :key="tag"
        v-for="tag in tags"
        closable
        :disable-transitions="false"
        @close="handleRemoveTag(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputTagValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增标签</el-button>
    </el-form-item>
    <el-form-item label="介绍图片: ">
      <div style="display: flex;">
        <img-square v-for='item in projModel.intro_pic_list' :key="item.id" :url="item.url" :meta="item" :on-remove="removeIntroImgHandle" class="inline-block"></img-square>
        <img-uploader :limit="10" :multiple="true" ref="introImgUpload" img-type="intro" class="inline-block"></img-uploader>
      </div>

    </el-form-item>
    <el-form-item class="text-right">
      <el-button type="primary" @click="confirmUpdate()">保存</el-button>
      <el-button @click="reset()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import imgUploader from '../imgUploader.vue';
  import ImgSquare from "src/site/components/imgSquare";

  export default {
    components: {ImgSquare, imgUploader },
    props: ['onUpdate'],
    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
      }),
    },

    data() {
      return {
        projModel: {},
        inputVisible: false,
        inputTagValue: '',
        tags: [],
        showLogoUploader: false,
        loading: false,
        introImgRemoveList: []
      }
    },

    methods: {
      ...mapActions(['updateProjBasicInfo', 'deletProjPic']),
      handleRemoveTag(tag){
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      handleInputConfirm(){
        let inputValue = this.inputTagValue;
        if (inputValue) {
          this.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputTagValue = '';
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      confirmUpdate(){
        this.loading = true;
        this.$refs.logoUpload.submitUpload();
        this.$refs.introImgUpload.submitUpload();
        this.introImgRemoveList.map(id=>{
          this.deletProjPic(id);
        });
        setTimeout(()=>{
          this.projModel.tags = this.tags.join(',');
          this.updateProjBasicInfo(this.projModel).then(()=>{
            this.loading = false;
            this.onUpdate(this.projModel)
          })
        }, 1000)
      },
      showLogoUploaderHandle(){
        this.showLogoUploader = true;
      },
      removeIntroImgHandle(url, item){
        let index = this.projModel.intro_pic_list.indexOf(url);
        this.projModel.intro_pic_list.splice(index, 1);
        this.introImgRemoveList.push(item.id)
      },
      reset(){
        this.$refs.logoUpload.clearFiles();
        this.$refs.introImgUpload.clearFiles();
        this.projModel = JSON.parse(JSON.stringify(this.currentProj));
        this.showLogoUploader = false;
        this.introImgRemoveList = [];
      }
    },

    mounted() {
      this.projModel = JSON.parse(JSON.stringify(this.currentProj));
      this.tags = this.projModel.tags? this.projModel.tags.split(',') : [];
    }
  }
</script>

<style scoped>
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
