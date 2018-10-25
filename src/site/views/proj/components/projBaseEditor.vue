<template>
  <el-form label-position="right" label-width="100px" :model="projModel" v-loading="loading">
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
  import imgUploader from '../../../components/imgUploader.vue';
  import ImgSquare from "src/site/components/imgSquare";

  export default {
    components: {ImgSquare, imgUploader },
    props: ['onUpdate', 'projData'],
    data() {
      return {
        projModel: {},
        loading: false,
      }
    },

    methods: {
      ...mapActions(['updateProj', 'createProj', 'setCurrentProj']),

      confirmUpdate(){
        this.loading = true;
        let apiFunc = this.projData.id? this.updateProj : this.createProj;
        apiFunc(this.projModel).then(res=>{
          this.loading = false;
          this.onUpdate(this.projModel)
        })
      },
      reset(){
        this.$refs.logoUpload.clearFiles();
        this.projModel = JSON.parse(JSON.stringify(this.projData));
      }
    },

    mounted() {
      this.projModel = JSON.parse(JSON.stringify(this.projData));
    }
  }
</script>
