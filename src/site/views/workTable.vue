<template>
  <div>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <el-row type="flex" class="p-a-1">
        <el-col>
          <div class="h2 m-b-tiny">员工导入
            <span class="subtitle">当前员工100人（需求130人）</span>
          </div>
          <div class="h4">导入确认上岗的员工, 可选择单个导入或批量导入，批量导入请使用excel模板填写员工信息</div>
        </el-col>
        <el-col class="text-right">
          <icon-button-vertical icon="el-icon-upload2" text="excel导入" class="inline-block"></icon-button-vertical>
          <icon-button-vertical icon="el-icon-document" text="excel模版" class="inline-block"></icon-button-vertical>
        </el-col>
      </el-row>
    </el-card>
    <wage-work-table></wage-work-table>
    <fine-work-table></fine-work-table>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <el-row type="flex" class="p-a-1">
        <el-col>
          <div class="h2 m-b-tiny">网招报名
            <span class="subtitle">待确认人数：10人 </span>
          </div>
          <div class="h4">通过微信招聘报名的人员，请电话联系后确认申请人意向</div>
        </el-col>
        <el-col class="text-right">
          <icon-button-vertical icon="el-icon-picture-outline" text="文本编辑" class="inline-block" to-path="/recruit/editor"></icon-button-vertical>
          <el-popover
            style="margin-left: 6px; margin-right: 6px"
            placement="bottom"
            width="200"
            trigger="click">
            <div class="text-center m-t-1">手机扫码分享招聘文章</div>
            <img :src="recruitPage.qrcode_url"/>
            <icon-button-vertical slot="reference" icon="fas fa-qrcode" text="微信分享" class="inline-block"></icon-button-vertical>
          </el-popover>
          <icon-button-vertical icon="el-icon-tickets" text="查看列表" class="inline-block" to-path="/apply"></icon-button-vertical>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import iconButtonVertical from '../components/iconButtonVertical.vue';
import FineWorkTable from '../components/fine/FineWorkTable.vue';
import WageWorkTable from '../components/wage/WageWorkTable.vue';
import { mapState } from 'vuex';

export default {
  components: { iconButtonVertical, FineWorkTable, WageWorkTable },
  computed: {
    ...mapState({
      recruitPage: state => state.apply.recruit_page,
    }),
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {

  }
}
</script>
