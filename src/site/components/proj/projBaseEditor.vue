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
    <el-form-item label="项目编码: ">
      <el-input
        v-model="projModel.proj_code" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="所在区域: ">
      <el-input
        v-model="projModel.region" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="所在城市: ">
      <el-input
        v-model="projModel.city" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item label="所属分类: ">
      <el-input
        v-model="projModel.category" style="max-width: 300px">
      </el-input>
    </el-form-item>
    <el-form-item class="text-right">
      <el-button type="primary" @click="confirmUpdate()">确定</el-button>
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
        company: state => state.global.company,
      }),
    },

    data() {
      return {
        projModel: {},
        showLogoUploader: false,
        loading: false,
      }
    },

    methods: {
      ...mapActions(['updateProj', 'createProj', 'setCurrentProj']),

      confirmUpdate(){
        this.loading = true;
        this.projModel.company_id = this.company.id;
        let apiFunc = this.currentProj.id? this.updateProj : this.createProj;
        apiFunc(this.projModel).then(res=>{
          this.loading = false;
          this.$refs.logoUpload.submitUpload(res.data.id);
          this.onUpdate(this.projModel)
        })
      },
      showLogoUploaderHandle(){
        this.showLogoUploader = true;
      },
      reset(){
        this.$refs.logoUpload.clearFiles();
        this.projModel = JSON.parse(JSON.stringify(this.currentProj));
        this.showLogoUploader = false;
      }
    },

    mounted() {
      this.projModel = JSON.parse(JSON.stringify(this.currentProj));
      !this.projModel.id && this.showLogoUploaderHandle();
    }
  }
</script>
