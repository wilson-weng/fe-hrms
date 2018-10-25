<template>
  <div class="m-a-1">
    <div>
      <span>选择导出文件：</span>
      <el-radio v-model="exportFile" label="wageDownload1" border><i class="far fa-file-alt m-r-tiny"></i>工作数据表</el-radio>
      <a href="" :download="getDownloadFileName('wageDownload1')" id="wageDownload1"></a>
      <el-radio v-model="exportFile" label="wageDownload2" border><i class="far fa-file-alt m-r-tiny"></i>员工结算表</el-radio>
      <a href="" :download="getDownloadFileName('wageDownload2')" id="wageDownload2"></a>
      <el-radio v-model="exportFile" label="wageDownload3" border><i class="far fa-file-alt m-r-tiny"></i>人员宽表</el-radio>
      <a href="" :download="getDownloadFileName('wageDownload3')" id="wageDownload3"></a>
      <el-button class="pull-right" size="small" @click="exportFines()">导出</el-button>
    </div>
  </div>
</template>

<script>
  import {downloadExcel, translateDataByFormat} from '../../../utils/excel';
import { mapState, mapActions } from 'vuex';

export default {
  props: ['filters'],
  data() {
    return {
      exportFile: 'wageDownload2',
      exportFormat: {
        'wageDownload1':'姓名,JD账号,生产日期,工作时长,拣货件数,复核件数,打包一体化单量,打包非一体化单量',
        'wageDownload2':'姓名,JD账号,生产日期,工作时长,拣货件数,复核件数,打包一体化单量,打包非一体化单量,当日收入',
        'wageDownload3':'姓名,JD账号,生产日期,当日收入,工作时长,拣货件数,拣货标准件数,拣货达标效率,复核件数,复核标准件数,复核达标效率,打包一体化单量,打包一体化标准单量,打包一体化达标效率,打包非一体化单量,打包非一体化标准单量,打包非一体化达标效率',
      },
      exportName: {
        'wageDownload1': '工作数据表',
        'wageDownload2': '员工结算表',
        'wageDownload3': '人员宽表',
      },
      remoteConfig: {
        'exportColumns': ''
      }
    }
  },
  methods:{
    ...mapActions(['getWageRecords']),
    exportFines(){
      let format = this.exportFormat[this.exportFile];
      let exportId = this.exportFile;
      this.filters.page = 1;
      this.filters.page_size = 5000;
      this.getWageRecords(this.filters).then(res=>{
        let datas = translateDataByFormat(res.data.datas, this.remoteConfig.exportColumns);
        let exportContent = datas.map(item => {
          let partial = {};
          for(let key of format.split(',')){
            partial[key] = item[key]
          }
          return partial
        });
        downloadExcel('结算数据', exportContent, 'xlsx', exportId)
      })
    },
    getDownloadFileName(id){
      let name = this.exportName[id];
      if(this.dateRange){
        return `${name}${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
      }else{
        return `${name}（最新5000条）.xlsx`
      }
    }
  }
}
</script>
