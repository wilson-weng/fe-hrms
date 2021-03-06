<template>
  <el-card class="m-a-1" :body-style="{padding: 0}">
    <el-row type="flex" class="p-a-1">
      <el-col>
        <div class="h2 m-b-tiny">员工导入
        </div>
        <div class="h4">导入人员信息, 批量导入请使用excel模板填写员工信息</div>
      </el-col>
      <el-col class="text-right">
        <icon-button-vertical icon="el-icon-upload2" text="excel导入" class="inline-block" :on-click="triggerCrewUpload"></icon-button-vertical>
        <icon-button-vertical icon="el-icon-document" text="excel模版" class="inline-block" :on-click="downloadCrewTemplate"></icon-button-vertical>
        <input type="file" name="file" id="crewUpload" style="display:none" multiple="multiple" @change="selectUploadFile()">
        <a href="" download="员工导入模板.xlsx" id="crewTemplate"></a>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showExcelPreview" title="员工导入预览" :before-close="resetUpload" width="80%">
      <dialog-preview-table :columns="previewTableAttr" :preview-data="previewTableData" :on-close="closePreview" :on-upload="uploadCrewData"></dialog-preview-table>
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
import { downloadExcel, uploadExcel, loadDataByFormat, loadTemplate, loadPreviewColumns } from '../../../utils/excel';
import { crewUploadDataList } from '../../../constants/constants';
import { mapState, mapActions } from 'vuex';

export default {
  name: "crewWorkTable",
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
      uploadButtonId: 'crewUpload',
      downloadButtonId: 'crewTemplate',
      showErrorDialog: false,
      uploadErrors: [],
      uploadDataList: crewUploadDataList,
    }
  },
  mounted(){
    this.uploadButton = document.getElementById('crewUpload')
  },
  methods: {
    ...mapActions(['createCrewRecords']),
    triggerCrewUpload(){
      this.uploadButton.click();
    },
    selectUploadFile(){
      uploadExcel(this.uploadButton).then(lines => {
        this.previewTableAttr = loadPreviewColumns(this.uploadDataList);
        this.previewTableData = lines;
        this.showExcelPreview = true;
      });
    },
    uploadCrewData(){
      let rawData = this.previewTableData;
      let data = loadDataByFormat(rawData, this.uploadDataList);
      this.createCrewRecords({proj_id: this.currentProj.id, lines: JSON.stringify(data)}).then(result =>{
        this.showExcelPreview = false;
        this.resetUpload();
        if(result.status == 'ok'){
          if(result.data.errors.length == 0){
            this.$message({
              message: '上传成功！可前往员工查询栏目查看',
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
    downloadCrewTemplate(){
      downloadExcel('人员导入模板', [loadTemplate(this.uploadDataList)], 'xlsx', 'crewTemplate')
    },
  }
}
</script>
