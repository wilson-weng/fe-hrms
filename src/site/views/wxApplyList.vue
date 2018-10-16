<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <div slot="header" class="clearfix">
        <span style="margin-top: 5px; margin-right: 20px; float: left;">员工列表</span>
        <div >
          <el-input placeholder="输入员工姓名或手机搜索" v-model="searchKey" style="width: 250px" size="small"></el-input>
          <el-select v-model="status" placeholder="状态" size="small">
            <el-option
              v-for="item in sourceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button icon="el-icon-search" size="small" @click="onFilterClick()"></el-button>
          <el-button style="float: right;" size="small" @click="exportApplys()">导出名单</el-button>
          <a href="" :download="getDownloadFileName()" id="applyDownload"></a>

        </div>
      </div>
      <list-view v-if='reloadTable' :table-attrs="tableAttrs" :table-data="applyList" :pages="Math.ceil(applyQueryCount/10)" :on-page-change="onPageChange"></list-view>
      <el-dialog
        :visible.sync="showConfirmDeleteDialog"
        width="30%">
        <span>点击确认拒绝此人申请。</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDeleteDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete()">确定</el-button>
      </span>
      </el-dialog>
      <el-dialog
        :visible.sync="showConfirmDialog"
        width="50%" title="通过此人申请，并设定上岗日期">
        <el-form  label-position="right" label-width="100px" class="p-r-3">
          <el-form-item label="上岗日期: ">
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="选择日期">
              size="small">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showConfirmDialog = false">取消</el-button>
        <el-button type="primary" @click="confirmApply()">确定</el-button>
      </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import listView from '../components/listView.vue';
  import { downloadExcel } from '../utils/excel';

  export default {
    components: { listView },

    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
        applyList: state => state.apply.apply_list,
        applyTableDisplay: state => state.apply.apply_table_display,
        applyQueryCount: state => state.apply.apply_query_count,
        filters: function(){
          return {
            searchKey: this.searchKey,
            entry_status: this.status
          }
        },
      }),
    },
    data() {
      return {
        tableAttrs: [],
        showConfirmDeleteDialog: false,
        showConfirmDialog: false,
        currentRow: {},
        currentRowIndex: 0,
        searchKey: '',
        sourceOptions: [
          {value: 0, label: '待审核'},
          {value: 1, label: '审核通过'},
          {value: 2, label: '审核失败'},
        ],
        status: 0,
        page: 1,
        startDate: '',
        reloadTable: true
      }
    },
    created(){
      this.query(1, ()=>{
        this.getTableAttrs();
      })
    },
    methods: {
      ...mapActions(['getApplyRecords','exportApplyRecords', 'updateApplyRecords', 'setCurrentCrew']),
      onPageChange(page){
        this.page = page;
        this.query(page);
      },
      confirmApplyRecord(row){
        this.currentRow = row;
        this.showConfirmDialog = true;
      },
      confirmApply(){
        this.updateApplyRecords({proj_id: this.currentProj.id, apply_id: this.currentRow['申请id'], entry_status: 1, start_time: this.startDate?this.startDate.getTime()/1000:0}).then(()=>{
          this.showConfirmDialog = false;
          this.$message({message: '申请已确认，请在开工日期之前再次联系，以便确认是否上刚', type: 'success'})
          this.query(this.page)
        })
      },
      deleteApplyRecord(row){
        this.currentRow = row;
        this.showConfirmDeleteDialog = true;
      },
      confirmDelete(){
        this.updateApplyRecords({proj_id: this.currentProj.id, apply_id: this.currentRow['申请id'], entry_status: 2, start_time: 0}).then(()=>{
          this.showConfirmDeleteDialog = false;
          this.$message({message: '记录已撤销, 可以在人才库中搜索此人', type: 'success'})
          this.query(this.page)
        })
      },
      onFilterClick(){
        this.reloadTable = false;
        this.query(1, ()=>{
            this.getTableAttrs();
            this.reloadTable = true;
          });
      },
      viewApplyRecord(row){
        this.setCurrentCrew(row);
        this.$router.push({path: '/crew/detail'});
      },
      query(page, callback){
        this.getApplyRecords({page: page, proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(()=>{
          callback && callback()
        })
      },
      exportApplys(){
        this.exportApplyRecords({proj_id: this.currentProj.id, filters: JSON.stringify(this.filters)}).then(content=>{
          downloadExcel('申请明细', JSON.parse(content.result), 'xlsx', 'applyDownload')
        })
      },
      getDownloadFileName(){
        if(this.dateRange){
          return `申请明细${this.dateRange[0].toDateString()}-${this.dateRange[1].toDateString()}.xlsx`
        }else{
          return '申请明细（最新5000条）.xlsx'
        }
      },
      getTableAttrs(){
        let attrs = this.applyTableDisplay.split(',').map(item=>{
          return {prop: item, attrName: item}
        });
        attrs.push({prop: 'detail', attrName: '查看', buttons: [{
            onClick: this.viewApplyRecord, text: '详情'
          }]});
        if(this.status == 1){
          attrs.push({prop: '申请状态', attrName: '申请状态'});
          attrs.push({prop: '开工时间', attrName: '开工时间'});
        }else if(this.status == 2){
          attrs.push({prop: '申请状态', attrName: '申请状态'});
        }else{
          attrs.push({prop: 'modify', attrName: '操作', buttons: [{
              onClick: this.confirmApplyRecord, text: '通过'
            },{
              onClick: this.deleteApplyRecord, text: '拒绝'
            }]})
        }
        this.tableAttrs = attrs;
      }
    },
  }
</script>
