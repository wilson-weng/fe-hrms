<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <el-row type="flex" class="p-a-1">
      <el-col>
        <div class="h2 m-b-tiny">赔付导入
        </div>
        <div class="h4">导入赔付明细, 批量导入请使用excel模板填写员工信息</div>
      </el-col>
      <el-col class="text-right">
        <icon-button-vertical icon="el-icon-upload2" text="excel导入" class="inline-block" :on-click="triggerFineUpload"></icon-button-vertical>
        <icon-button-vertical icon="el-icon-document" text="excel模版" class="inline-block" :on-click="downloadFineTemplate"></icon-button-vertical>
        <input type="file" name="file" id="fineUpload" style="display:none" multiple="multiple" @change="selectUploadFile()">
        <a href="" download="异常结算表模板.xlsx" id="fineTemplate"></a>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showExcelPreview" title="异常上传预览" :before-close="resetUpload" width="80%">
      <dialog-preview-table :columns="previewTableAttr" :preview-data="previewTableData" :on-close="closePreview" :on-upload="uploadFineData"></dialog-preview-table>
    </el-dialog>
    <el-dialog :visible.sync="showErrorDialog" width="80%">
      <dialog-upload-errors :errors="uploadErrors" :total-count="previewTableData.length"></dialog-upload-errors>
    </el-dialog>
  </el-card>
</template>

<script>
import iconButtonVertical from '../iconButtonVertical.vue';
import dialogUploadErrors from '../dialog/dialogUploadErrors.vue';
import listView from '../listView.vue';
import { downloadExcel, uploadExcel, loadTemplate, loadDataByFormat, loadFormatKeyToColumns } from '../../utils/excel';
import { mapState, mapActions } from 'vuex';
import DialogPreviewTable from "src/site/components/dialog/dialogPreviewTable";

export default {
  components: {DialogPreviewTable, iconButtonVertical, listView, dialogUploadErrors },
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
      uploadButtonId: 'fineUpload',
      downloadButtonId: 'fineTemplate',
      showErrorDialog: false,
      uploadErrors: [],
      remoteConfig: {
        fineInputFormat: '',
        fineInputTemplate: ''
      }
    }
  },
  mounted(){
    this.uploadButton = document.getElementById('fineUpload')
  },
  methods: {
    ...mapActions(['createFineRecords']),
    triggerFineUpload(){
      this.uploadButton.click();
    },
    selectUploadFile(){
      uploadExcel(this.uploadButton).then(lines => {
        this.previewTableAttr = loadFormatKeyToColumns(this.remoteConfig.fineInputFormat);
        this.previewTableData = lines;
        this.showExcelPreview = true;
      });
    },
    uploadFineData(){
      let rawData = this.previewTableData;
      let data = loadDataByFormat(rawData, this.remoteConfig.fineInputFormat);
      this.createFineRecords({proj_id: this.currentProj.id, lines: JSON.stringify(data)}).then(result =>{
        this.showExcelPreview = false;
        this.resetUpload();
        if(result.status == 'ok'){
          if(result.data.errors.length == 0){
            this.$message({
              message: '上传成功！可前往赔付查询栏目查看',
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
    downloadFineTemplate(){
      if(this.remoteConfig.fineInputTemplate) {
        downloadExcel('异常导入模板', [loadTemplate(this.remoteConfig.fineInputTemplate)], 'xlsx', 'fineTemplate')
      }
    },
  }
}
</script>
