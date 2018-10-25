<template>
  <div>
    <el-row>
      <el-col :span="12"  v-for='item in getDetailList()' :key="item">
        <info-list-item :title="item" :value="currentCrew[item]" :key="item"></info-list-item>
      </el-col>
    </el-row>
    <div class="text-right">
      <el-button type="primary" plain @click="showUpdateDialogHandle()">修改</el-button>
      <el-button type="danger" plain @click="showConfirmDeleteDialog = true">移除</el-button>
    </div>
    <el-dialog
      :visible.sync="showConfirmDeleteDialog"
      width="30%">
      <span>点击确认从人才库移除该名员工，如需恢复，可在工作台再次添加此人信息。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showUpdateDialog"
      width="30%"
      title="修改员工信息">
      <el-form label-position="right" label-width="100px" :model="updatedCrew">
        <el-form-item v-for="item in updateInputList" :label="item + ': '" :key="item">
          <el-input
            v-model="updatedCrew[item]">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUpdateDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmUpdate()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import infoListItem from '../../../components/infoListItem';
import { loadFormatKeys, translateDataByFormat } from '../../../utils/excel';

export default {
  components: {infoListItem},
  computed: {
    ...mapState({
      currentCrew: state => state.crew.current_crew,
      currentProj: state => state.global.current_proj,
    }),
  },
  data() {
    return {
      showConfirmDeleteDialog: false,
      showUpdateDialog: false,
      updateInputList: [],
      updatedCrew: {},
      remoteConfig: {
        crewInfoFormat: '',
      }
    }
  },
  methods: {
    ...mapActions(['deleteCrewRecords','updateCrewRecords', 'getCrewById', 'setCurrentCrew']),
    showUpdateDialogHandle(){
      this.updateInputList = loadFormatKeys(this.remoteConfig.crewInfoFormat);
      this.updateInputList.map(item => {
        this.updatedCrew[item] = this.currentCrew[item];
      });
      this.showUpdateDialog = true;
    },
    confirmUpdate(){
      this.updateCrewRecords({proj_id: this.currentProj.id, crew_id: this.currentCrew.id, content: JSON.stringify(this.updatedCrew)}).then(()=>{
        this.showUpdateDialog = false;
        this.$message({message: '修改成功', type: 'success'})
        this.getCrewById({crew_id: this.currentCrew.id}).then(res=>{
          this.setCurrentCrew(res.data);
        })
      })
    },
    confirmDelete(){
      this.deleteCrewRecords({proj_id: this.currentProj.id, crew_id: this.currentCrew.id}).then(()=>{
        this.showConfirmDeleteDialog = false;
        this.$message({message: '移除成功', type: 'success'});
        setTimeout(()=>{
          history.back(-1);
        }, 2000)
      })
    },
    getDetailList(){
      return translateDataByFormat([this.currentCrew], this.remoteConfig.crewInfoFormat)[0]
    }
  }
}
</script>

