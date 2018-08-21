<template>
  <div>
    <el-menu v-if="projSelected"
             default-active="/proj"
             :router="true"
             class="no-border m-t-1">
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
      <el-menu-item index="/apply">
        <i class="el-icon-share"></i>
        <span slot="title">微信招聘</span>
      </el-menu-item>
    </el-menu>
    <div v-else class="subtitle text-center m-t-2">请选择一个项目查看</div>
    <el-row style="position:fixed; left:0; bottom:0;width:200px;">
      <el-col :span="12" class="text-center">
        <el-button type="text" class="color-text-hint"><i class="el-icon-setting"></i>设置</el-button>
      </el-col>
      <el-col :span="12" class="text-center">
        <el-button type="text" class="color-text-hint"><i class="fas fa-sign-out-alt"></i>登出</el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>

    export default {
        methods: {
        },

        data() {
            return {
              projSelected: false,
            }
        },
      watch: {
        $route: {
          handler: function(val, oldVal){
            if(val.name == 'proj'){
              this.projSelected = false;
            }else{
              this.projSelected = true;
            }
          },
          // 深度观察监听
          deep: true
        }
      },
    }
</script>
