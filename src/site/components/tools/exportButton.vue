<template>
  <div>
    <el-button :size="size" :type="type" @click="exportFines()">
      导出明细
    </el-button>
    <a href="" :download="fileTitle" :id="fileId"></a>
  </div>
</template>

<script>
import { downloadExcel } from '../../utils/excel';
import { translateDataByFormat } from '../../utils/excel';

export default {
  name: "exportButton",
  props: ['size', 'getter', 'type', 'fileTitle', 'fileId', 'filters'],
  data(){
    return{
      remoteConfig: {
        exportColumns: ''
      }
    }
  },
  methods: {
    exportFines() {
      this.filters.page = 1;
      this.filters.page_size = 5000;
      this.getter(this.filters).then(res => {
        downloadExcel('sheet1', translateDataByFormat(res.data.datas, this.remoteConfig.exportColumns), 'xlsx', this.fileId)
      })
    },
  }
}
</script>
