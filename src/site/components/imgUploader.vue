<template>
  <div>
    <el-upload
      :action="action"
      ref="upload"
      list-type="picture-card"
      :multiple="multiple"
      :auto-upload="autoUpload"
      :limit="limit"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :data="uploadData"
      :on-preview="handlePictureCardPreview">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { IMG_UPLOAD } from "src/site/constants/urls";
  import { IMG_PREFIX } from 'src/site/constants/urls'

  export default {
    props: {
      action: {
        default: IMG_UPLOAD,
      },
      autoUpload: {
        type: Boolean,
        default: false,         // 是否选取文件之后自动上传，false时候会出现确认上传的button
      },
      fileSize: {
        type: Number,
        default: 5
      },
      imgType: {                 // 上传的文件列表显示类型 包括picture，text等
        default: ''
      },
      multiple: {                   // 是否支持同时选取多个文件
        type: Boolean,
        default: false,
      },
      limit: {                        // 上传文件数量限制
        default: 1,
      },
      onSuccess: {},
      onRemove: {},
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        uploadData: {img_type: this.imgType, prefix: IMG_PREFIX, override: this.limit === 1}
      };
    },
    methods: {
      submitUpload(bus_type, bus_id) {
        this.uploadData.bus_type = bus_type;
        this.uploadData.bus_id = bus_id;
        return this.$refs.upload.submit();       //  这里会触发覆盖的上传接口
      },
      beforeUpload(file) {
        const isPIC = file.type === 'image/jpeg' || file.type === 'image/png';
        const isOverSize = this.fileSize > 0 && (file.size / 1024 / 1024 > this.fileSize);

        if (!isPIC) {
          // this.$message.error('只能上传图片文件!');
          this.$alert('只能上传图片文件！', '消息提示', {confirmButtonText: '确定'});
          return false;
        }
        if (isOverSize) {
          this.$alert(`上传文件大小不能超过${this.fileSize}MB`, '消息提示', {confirmButtonText: '确定'});
          return false;
        }
        return true;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      clearFiles(){
        this.$refs.upload.clearFiles();
      }
    },
  }
</script>
