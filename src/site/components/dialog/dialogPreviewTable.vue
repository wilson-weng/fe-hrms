<template>
  <div>
    <list-view :columns="columns" :table-data="tableData"  :pages="getTableTotalPage()" :on-page-change="getPreviewTableDataByPage" :page-size="5"></list-view>
    <div class="el-dialog__footer dialog-footer">
      <el-button @click="onCloseHandle()">取消</el-button>
      <el-button type="primary" @click="onUploadHandle()">上传</el-button>
    </div>
  </div>
</template>

<script>
  import listView from '../listView.vue';

  export default {
  name: "dialogPreviewTable",
  components: { listView },

  props: ['columns', 'previewData', 'onUpload', 'onClose'],
  computed: {
    tableData: function(){
      return this.previewData.slice((this.page-1)*5, this.page*5)
    },
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    getPreviewTableDataByPage(page){
      this.page = page;
    },
    getTableTotalPage(){
      return Math.ceil(this.previewData.length / 5)
    },
    onCloseHandle(){
      this.onClose && this.onClose()
    },
    onUploadHandle(){
      this.onUpload && this.onUpload()
    },
  }

}
</script>

