<template>
  <div>
    <span>导入{{totalCount}}条数据，成功{{successCount}}条，失败{{errorCount}}条，失败记录如下：</span>
    <list-view :columns="tableAttr" :table-data="tablePageData"  :pages="getTableTotalPage()" :on-page-change="getPreviewTableDataByPage"></list-view>
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
      tablePageData: [],
      tableAttr: [{
        field: 'line_index',
        title: '第几行',
        width: '100'
      }, {
        field: 'message',
        title: '错误信息',
        width: '200'
      }, {
        field: 'content',
        title: '内容',
        width: '500'
      }]
    }
  },
  created(){
    this.tablePageData = this.errors.slice(0, 5);
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

