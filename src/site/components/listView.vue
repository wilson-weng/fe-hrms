<template>
  <div>
    <v-table
      is-horizontal-resize
      style="width:100%"
      :columns="tableColumns"
      title-align="center"
      column-align="center"
      :row-height="50"
      :title-row-height="50"
      :show-vertical-border="false"
      :show-horizontal-border="false"
      :table-data="tableData"
      title-bg-color="#F9FBFD"
      row-hover-color="#f5f5f5"
      row-click-color="#edf7ff"
      @on-custom-comp="onCustomCompHandle"
    ></v-table>
    <div class="pagination-container">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="pages * (pageSize? pageSize : 10)" @current-change="onCurrentPageChange()">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['columns', 'tableData', 'pages', 'onPageChange', 'pageSize', 'onCustomComp'],

    computed: {
      tableColumns: function(){
        return this.columns.map((item,index)=>{
          !item.isResize && (item.isResize = true);
          !item.width && (item.width = 100);
          return item;
        })
      }
    },
    data() {
      return {
        currentPage: 1,
      }
    },
    methods:{
      onCurrentPageChange(){
        this.onPageChange(this.currentPage);
      },
      onCustomCompHandle(val){
        this.onCustomComp && this.onCustomComp(val)
      }
    }
  }
</script>

<style scoped>
  .v-table-class {
    border: none;
    color: #666;
  }

</style>
