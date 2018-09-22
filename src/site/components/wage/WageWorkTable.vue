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
      <list-view  v-loading="uploadloading"  :table-attrs="previewTableAttr" :table-data="previewTablePageData"  :pages="getTableTotalPage()" :on-page-change="getPreviewTableDataByPage" v-if="showExcelPreview"></list-view>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePreview()">取消</el-button>
        <el-button type="primary" @click="uploadWageData()">上传</el-button>
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
      wageInputFormat: state => state.wage.wage_input_format,
      wageInputTemplate: state => state.wage.wage_input_template,
    }),
  },
  data () {
    return {
      showExcelPreview: false,
      previewTableAttr: {},
      previewTableData: [],
      previewTablePageData: [],
      uploadButton: null,
      uploadButtonId: 'wageUpload',
      downloadButtonId: 'wageTemplate',
      tablePage: 1,
      uploadloading: false
    }
  },
  mounted(){
    (!this.wageInputFormat || !this.wageInputTemplate) && this.getWageIoFormat(this.currentProj.id);
    this.uploadButton = document.getElementById('wageUpload')
  },
  methods: {
    ...mapActions(['getWageIoFormat', 'createWageRawData']),
    triggerWageUpload(){
      this.uploadButton.click();
    },
    selectUploadFile(){
      uploadExcel(this.uploadButton).then(lines => {
        this.previewTableAttr = loadFormatString(this.wageInputFormat);
        this.previewTableData = lines;
        console.log(this.previewTableAttr, this.previewTableData, lines)
        this.getPreviewTableDataByPage(1);
        this.showExcelPreview = true;
      });
    },
    uploadWageData(){
      this.uploadloading = true;
      this.createWageRawData({proj_id: this.currentProj.id, lines: JSON.stringify(this.previewTableData)}).then(result =>{
        this.showExcelPreview = false;
        console.log(result);
        this.resetUpload();
        result.status == 'ok' && this.$message({
          message: '上传成功！可前往结算查询栏目查看',
          type: 'success'
        });
        result.status != 'ok' && this.$message({
          message: result.message,
          type: 'error'
        });
        this.uploadloading = false;
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
    downloadWageTemplate(){
      if(this.wageInputTemplate) {
        downloadExcel('结算数据导入模板', [loadTemplateString(this.wageInputTemplate)], 'xlsx', 'wageTemplate')
      }
    },
  }
}
</script>
