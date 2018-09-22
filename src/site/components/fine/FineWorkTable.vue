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
      <list-view :table-attrs="previewTableAttr" :table-data="previewTablePageData"  :pages="getTableTotalPage()" :on-page-change="getPreviewTableDataByPage" v-if="showExcelPreview"></list-view>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePreview()">取消</el-button>
        <el-button type="primary" @click="uploadFineData()">上传</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import iconButtonVertical from '../iconButtonVertical.vue';
import listView from '../listView.vue';
import { downloadExcel, uploadExcel, loadTemplateString, loadFormatString } from '../../utils/excel';
import { mapState, mapActions } from 'vuex';

export default {
  components: { iconButtonVertical, listView },
  computed: {
    ...mapState({
      currentProj: state => state.global.current_proj,
      fineInputFormat: state => state.fine.fine_input_format,
      fineInputTemplate: state => state.fine.fine_input_template,
    }),
  },
  data () {
    return {
      showExcelPreview: false,
      previewTableAttr: {},
      previewTableData: [],
      previewTablePageData: [],
      uploadButton: null,
      uploadButtonId: 'fineUpload',
      downloadButtonId: 'fineTemplate',
      tablePage: 1,
    }
  },
  mounted(){
    (!this.fineInputFormat || !this.fineInputTemplate) && this.getFineIoFormat(this.currentProj.id);
    this.uploadButton = document.getElementById('fineUpload')
  },
  methods: {
    ...mapActions(['getFineIoFormat', 'createFineRecords']),
    triggerFineUpload(){
      this.uploadButton.click();
    },
    selectUploadFile(){
      uploadExcel(this.uploadButton).then(lines => {
        this.previewTableAttr = loadFormatString(this.fineInputFormat);
        this.previewTableData = lines;
        this.getPreviewTableDataByPage(1);
        this.showExcelPreview = true;
      });
    },
    uploadFineData(){
      this.createFineRecords({proj_id: this.currentProj.id, lines: JSON.stringify(this.previewTableData)}).then(result =>{
        this.showExcelPreview = false;
        this.resetUpload();
        result.status == 'ok' && this.$message({
          message: '上传成功！可前往赔付查询栏目查看',
          type: 'success'
        });
        result.status != 'ok' && this.$message({
          message: result.message,
          type: 'error'
        });
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
    downloadFineTemplate(){
      if(this.fineInputTemplate) {
        downloadExcel('异常导入模板', [loadTemplateString(this.fineInputTemplate)], 'xlsx', 'fineTemplate')
      }
    },
  }
}
</script>
