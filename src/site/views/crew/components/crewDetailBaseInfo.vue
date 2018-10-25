<template>
  <div>
    <el-row>
      <el-col :span="12"  v-for='item in detailList' :key="item.field">
        <info-list-item :title="item.title" :value="currentCrew[item.field]"></info-list-item>
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
      width="400px"
      title="修改员工信息">
      <el-form label-position="right" label-width="100px" :model="updatedCrew">
        <el-form-item v-for="item in inputList" :label="item.title + ': '" :key="item.field">
          <el-input style="width: 200px"
            v-model="updatedCrew[item.field]">
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
import { crewDetailList, crewUploadDataList } from '../../../constants/constants'

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
      inputList: crewUploadDataList,
      updatedCrew: {},
      detailList: crewDetailList
    }
  },
  created(){
    for(let item of crewUploadDataList){
      this.updatedCrew[item.field] = this.currentCrew[item.field];
    }
  },
  methods: {
    ...mapActions(['deleteCrewRecords','updateCrewRecords', 'getCrewById', 'setCurrentCrew']),
    showUpdateDialogHandle(){
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
  }
}
</script>

