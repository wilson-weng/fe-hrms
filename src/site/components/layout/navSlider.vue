<template>
    <el-menu
      default-active="/proj"
      :router="true"
      class="no-border">
      <el-menu-item index="/worktable">
        <i class="el-icon-menu"></i>
        <span slot="title">操作台</span>
      </el-menu-item>
      <el-menu-item index="/crew">
        <i class="el-icon-document"></i>
        <span slot="title">人员管理</span>
      </el-menu-item>
      <el-menu-item index="/wage">
        <i class="el-icon-search"></i>
        <span slot="title">结算查询</span>
      </el-menu-item>
      <el-menu-item index="/fine">
        <i class="el-icon-search"></i>
        <span slot="title">赔付查询</span>
      </el-menu-item>
      <el-menu-item index="/operation">
        <i class="el-icon-share"></i>
        <span slot="title">运营活动</span>
      </el-menu-item>
    </el-menu>
</template>

<script>

    export default {
        methods: {
        },

        data() {
            return {
            }
        },

        created() {

        }
    }
</script>
