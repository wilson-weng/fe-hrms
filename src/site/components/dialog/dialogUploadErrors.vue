<template>
  <div>
    <span>导入{{totalCount}}条数据，成功{{successCount}}条，失败{{errorCount}}条，失败记录如下：</span>
    <list-view :table-attrs="tableAttr" :table-data="tablePageData"  :pages="getTableTotalPage()" :on-page-change="getPreviewTableDataByPage"></list-view>
  </div>
</template>

<script>
  import listView from '../listView.vue';

  export default {
  name: "dialogUploadErrors",
  components: { listView },

  props: ['errors', 'totalCount'],
  computed: {
    errorCount: function(){
      return this.errors.length;
    },
    successCount: function(){
      return this.totalCount - this.errors.length;
    },
  },
  data() {
    return {
      currentPage: 1,
      tablePageData: this.errors.slice(0, 5),
      tableAttr: [{
        prop: 'line_index',
        attrName: '第几行',
        width: 100
      }, {
        prop: 'content_shortcut',
        attrName: '内容'
      }, {
        prop: 'message',
        attrName: '错误信息'
      }]
    }
  },
  methods: {
    getPreviewTableDataByPage(page){
      this.tablePageData = this.errors.slice((page-1)*5, page*5)
    },
    getTableTotalPage(){
      return Math.ceil(this.errors.length / 5)
    },
  }

}
</script>

