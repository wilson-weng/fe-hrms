<template>
  <div>
    <el-table :data="tableData" :header-cell-style="headerCellStyle" :cell-style="cellStyle">
      <el-table-column v-for="attr in tableAttrs" :key="attr.prop" v-if="attr.buttons" :width="attr.width"
        :label="attr.attrName">
        <template slot-scope="scope">
          <el-button @click="btn.onClick(scope.row, scope.$index)" type="text" size="small" v-for="btn in attr.buttons" :key="btn.text">{{btn.text}}</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else :prop="attr.prop" :label="attr.attrName" :width="attr.width">
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="pages * (this.pageSize? this.pageSize : 10)" @current-change="onCurrentPageChange()">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['tableAttrs', 'tableData', 'pages', 'onPageChange', 'pageSize'],
    created() {
    },
    data() {
      return {
        currentPage: 1
      }
    },
    methods: {
      cellStyle({row, column, rowIndex, columnIndex}){
        if(columnIndex == 0){
          return {paddingLeft: '12px'}
        }
      },
      headerCellStyle({row, column, rowIndex, columnIndex}){
        if(columnIndex == 0){
          return {background:'#F9FBFD', paddingLeft: '12px'}
        }else {
          return {background:'#F9FBFD'};
        }
      },
      onCurrentPageChange(){
        this.onPageChange(this.currentPage);
      }
    }
  }
</script>

