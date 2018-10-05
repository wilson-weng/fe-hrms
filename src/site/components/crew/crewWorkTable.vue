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
      <list-view :table-attrs="previewTableAttr" :table-data="previewTablePageData"  :pages="getTableTotalPage()" :on-page-change="getPreviewTableDataByPage" :page-size="5" v-if="showExcelPreview"></list-view>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePreview()">取消</el-button>
        <el-button type="primary" @click="uploadCrewData()">上传</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="showErrorDialog" width="80%">
      <dialog-upload-errors :errors="uploadErrors" :total-count="totalUploadCount"></dialog-upload-errors>
    </el-dialog>
  </el-card>
</template>

<script>
import iconButtonVertical from '../iconButtonVertical.vue';
import dialogUploadErrors from '../dialog/dialogUploadErrors.vue';
import listView from '../listView.vue';
import { downloadExcel, uploadExcel, loadTemplateString, loadFormatString } from '../../utils/excel';
import { mapState, mapActions } from 'vuex';

export default {
  components: { iconButtonVertical, listView, dialogUploadErrors },
  computed: {
    ...mapState({
      currentProj: state => state.global.current_proj,
      crewInputFormat: state => state.crew.crew_input_format,
      crewInputTemplate: state => state.crew.crew_input_template,
    }),
  },
  data () {
    return {
      showExcelPreview: false,
      previewTableAttr: {},
      previewTableData: [],
      previewTablePageData: [],
      uploadButton: null,
      uploadButtonId: 'crewUpload',
      downloadButtonId: 'crewTemplate',
      tablePage: 1,
      showErrorDialog: false,
      uploadErrors: [],
      totalUploadCount: 0
    }
  },
  mounted(){
    (!this.crewInputFormat || !this.crewInputTemplate) && this.getCrewIoFormat(this.currentProj.id);
    this.uploadButton = document.getElementById('crewUpload')
  },
  methods: {
    ...mapActions(['getCrewIoFormat', 'createCrewRecords']),
    triggerCrewUpload(){
      this.uploadButton.click();
    },
    selectUploadFile(){
      uploadExcel(this.uploadButton).then(lines => {
        this.previewTableAttr = loadFormatString(this.crewInputFormat);
        this.previewTableData = lines;
        this.getPreviewTableDataByPage(1);
        this.showExcelPreview = true;
      });
    },
    uploadCrewData(){
      this.createCrewRecords({proj_id: this.currentProj.id, lines: JSON.stringify(this.previewTableData)}).then(result =>{
        this.showExcelPreview = false;
        this.resetUpload();
        if(result.status == 'ok'){
          if(result.data.errors.length == 0){
            this.$message({
              message: '上传成功！可前往员工查询栏目查看',
              type: 'success'
            });
          }else{
            this.uploadErrors = result.data.errors;
            this.totalUploadCount = result.data.lines.length;
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
    getPreviewTableDataByPage(page){
      this.previewTablePageData = this.previewTableData.slice((page-1)*5, page*5)
    },
    getTableTotalPage(){
      return Math.ceil(this.previewTableData.length / 5)
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
      if(this.crewInputTemplate) {
        downloadExcel('人员导入模板', [loadTemplateString(this.crewInputTemplate)], 'xlsx', 'crewTemplate')
      }
    },
  }
}
</script>
