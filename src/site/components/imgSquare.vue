<template>
    <ul class="el-upload-list el-upload-list--picture-card">
      <li class="el-upload-list__item">
        <img :src="url" class="el-upload-list__item-thumbnail" alt/>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in" @click="dialogVisible = true"></i>
          </span>
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete" @click="onRemove(url, meta)"></i>
          </span>
        </span>
      </li>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="url" alt="">
      </el-dialog>
    </ul>
</template>

<script>
  export default {
    props: ['url', 'onRemove', 'meta'],
    data() {
      return {
        dialogVisible: false,
      };
    },

  }
</script>

