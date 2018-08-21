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
          <icon-button-vertical icon="el-icon-edit-outline" text="单个导入" class="inline-block m-r-tiny"></icon-button-vertical>
          <icon-button-vertical icon="el-icon-upload2" text="批量导入" class="inline-block m-r-tiny"></icon-button-vertical>
          <icon-button-vertical icon="el-icon-document" text="批量模版" class="inline-block m-r-tiny"></icon-button-vertical>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <el-row type="flex" class="p-a-1">
        <el-col>
          <div class="h2 m-b-tiny">结算导入
            <span class="subtitle">上一次导入时间： 3天前</span>
          </div>
          <div class="h4">导入结算数据, 自动按照结算规则算出员工工资，批量导入请使用excel模板填写员工信息</div>
        </el-col>
        <el-col class="text-right">
          <icon-button-vertical icon="el-icon-upload2" text="批量导入" class="inline-block m-r-tiny"></icon-button-vertical>
          <icon-button-vertical icon="el-icon-document" text="批量模版" class="inline-block m-r-tiny"></icon-button-vertical>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <el-row type="flex" class="p-a-1">
        <el-col>
          <div class="h2 m-b-tiny">赔付导入
            <span class="subtitle">上一次导入时间： 3天前</span>
          </div>
          <div class="h4">导入赔付明细, 批量导入请使用excel模板填写员工信息</div>
        </el-col>
        <el-col class="text-right">
          <icon-button-vertical icon="el-icon-upload2" text="批量导入" class="inline-block m-r-tiny"></icon-button-vertical>
          <icon-button-vertical icon="el-icon-document" text="批量模版" class="inline-block m-r-tiny"></icon-button-vertical>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="m-a-1" :body-style="{padding: 0}">
      <el-row type="flex" class="p-a-1">
        <el-col>
          <div class="h2 m-b-tiny">网招报名
            <span class="subtitle">待确认人数：10人 </span>
          </div>
          <div class="h4">通过微信招聘报名的人员，请电话联系后确认申请人意向</div>
        </el-col>
        <el-col class="text-right">
          <icon-button-vertical icon="el-icon-picture-outline" text="文本编辑" class="inline-block m-r-tiny"></icon-button-vertical>
          <el-popover
            placement="bottom"
            width="200"
            trigger="click">
            <div class="text-center m-t-1">手机扫码分享招聘文章</div>
            <img :src="recruitPage.qrcode_url"/>
            <icon-button-vertical slot="reference" icon="fas fa-qrcode" text="微信分享" class="inline-block m-r-tiny"></icon-button-vertical>
          </el-popover>
          <icon-button-vertical icon="el-icon-tickets" text="查看列表" class="inline-block m-r-tiny"></icon-button-vertical>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import iconButtonVertical from '../components/iconButtonVertical.vue';
import { mapState } from 'vuex';

export default {
  components: { iconButtonVertical},
  computed: {
    ...mapState({
      recruitPage: state => state.apply.recruit_page,
    }),
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>
