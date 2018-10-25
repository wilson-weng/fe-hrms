<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <el-row type="flex" class="p-a-1">
      <el-col>
        <div class="h2 m-b-tiny">结算导入
        </div>
        <div class="h4">导入结算数据, 自动按照结算规则算出员工工资，批量导入请使用excel模板填写员工信息</div>
      </el-col>
      <el-col class="text-right">
        <icon-button-vertical icon="el-icon-upload2" text="excel导入" class="inline-block" :on-click="triggerWageUpload"></icon-button-vertical>
        <icon-button-vertical icon="el-icon-document" text="excel模版" class="inline-block" :on-click="downloadWageTemplate"></icon-button-vertical>
        <input type="file" name="file" id="wageUpload" style="display:none" multiple="multiple" @change="selectUploadFile()">
        <a href="" download="结算数据导入模板.xlsx" id="wageTemplate"></a>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showExcelPreview" title="结算数据预览" :before-close="resetUpload" width="80%">
      <dialog-preview-table :columns="previewTableAttr" :preview-data="previewTableData" :on-close="closePreview" :on-upload="uploadWageData"></dialog-preview-table>
    </el-dialog>
    <el-dialog :visible.sync="showErrorDialog" width="80%">
      <dialog-upload-errors :errors="uploadErrors" :total-count="previewTableData.length"></dialog-upload-errors>
    </el-dialog>
  </el-card>
</template>

<script>
import iconButtonVertical from '../../../components/iconButtonVertical.vue';
import dialogUploadErrors from '../../../components/dialog/dialogUploadErrors.vue';
import dialogPreviewTable from '../../../components/dialog/dialogPreviewTable.vue';
import listView from '../../../components/listView.vue';
import { downloadExcel, uploadExcel, loadTemplate, loadFormatKeyToColumns, loadDataByFormat } from '../../../utils/excel';
import { mapState, mapActions } from 'vuex';

export default {
  components: { iconButtonVertical, listView, dialogUploadErrors, dialogPreviewTable },
  computed: {
    ...mapState({
      currentProj: state => state.global.current_proj,
    }),
  },
  data () {
    return {
      showExcelPreview: false,
      previewTableAttr: {},
      previewTableData: [],
      uploadButton: null,
      uploadButtonId: 'wageUpload',
      downloadButtonId: 'wageTemplate',
      uploadloading: false,
      showErrorDialog: false,
      uploadErrors: [],
      remoteConfig: {
        wageInputFormat: '',
        wageInputTemplate: ''
      }
    }
  },
  mounted(){
    this.uploadButton = document.getElementById('wageUpload')
  },
  methods: {
    ...mapActions(['createWageRawData']),
    triggerWageUpload(){
      this.uploadButton.click();
    },
    selectUploadFile(){
      uploadExcel(this.uploadButton).then(lines => {
        this.previewTableAttr = loadFormatKeyToColumns(this.remoteConfig.wageInputFormat);
        this.previewTableData = lines;
        console.log(this.previewTableAttr, this.previewTableData)
        this.showExcelPreview = true;
      });
    },
    uploadWageData(){
      this.uploadloading = true;
      let rawData = this.previewTableData;
      let data = loadDataByFormat(rawData, this.remoteConfig.wageInputFormat);
      this.createWageRawData({proj_id: this.currentProj.id, lines: JSON.stringify(data)}).then(result =>{
        this.showExcelPreview = false;
        this.resetUpload();
        if(result.status == 'ok'){
          if(result.data.errors.length == 0){
            this.$message({
              message: '上传成功！可前往结算查询栏目查看',
              type: 'success'
            });
          }else{
            this.uploadErrors = result.data.errors.map(item=>{
              item.content = rawData[item.line_index-1];
              return item;
            });
            this.showErrorDialog = true;
          }
        }else{
          this.$message({
            message: result.msg,
            type: 'error'
          });
        }
        this.uploadloading = false;
      })
    },
    closePreview(){
      this.resetUpload();
      this.showExcelPreview = false;
    },
    resetUpload(done){
      this.uploadButton.value = '';//虽然file的value不能设为有字符的值，但是可以设置为空值
      done && done();
    },
    downloadWageTemplate(){
      if(this.remoteConfig.wageInputTemplate) {
        downloadExcel('结算数据导入模板', [loadTemplate(this.remoteConfig.wageInputTemplate)], 'xlsx', 'wageTemplate')
      }
    },
  }
}
</script>
