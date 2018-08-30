<template>
  <div>
    <el-menu v-if="projSelected"
             default-active="/worktable"
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
    <el-menu v-else
             :router="true"
             class="no-border m-t-1">
      <el-menu-item index="/proj">
        <i class="el-icon-menu"></i>
        <span slot="title">项目列表</span>
      </el-menu-item>
    </el-menu>
    <div style="position:fixed; left:0; bottom:0;width:200px;">
      <el-menu :router="true" class="no-border m-t-1 color-bg">
        <el-menu-item index="/mobile" class="text-center">
          <i class="fas fa-mobile-alt"></i>
          <span slot="title">手机客户端</span>
        </el-menu-item>
      </el-menu>
      <el-row>
        <el-col :span="12" class="text-center">
          <el-button type="text" class="color-text-hint" @click="showResetPswDialog = true"><i class="el-icon-setting" style="margin-right: 2px;"></i>设置</el-button>
        </el-col>
        <el-col :span="12" class="text-center">
          <el-button type="text" class="color-text-hint" @click="logout()"><i class="fas fa-sign-out-alt" style="margin-right: 2px;"></i>登出</el-button>
        </el-col>
        <el-dialog title="修改密码" :visible.sync="showResetPswDialog">
          <dialog-reset-password></dialog-reset-password>
        </el-dialog>
      </el-row>
    </div>
  </div>

</template>

<script>

  import { mapState } from 'vuex';
  import dialogResetPassword from '../dialog/dialogResetPassword.vue';

  export default {
    components: {dialogResetPassword},
    computed: {
      ...mapState({
        currentProj: state => state.global.current_proj,
      }),
    },
    methods: {
      logout(){
        this.$router.push({path: '/login'});
      },
    },

    data() {
        return {
          projSelected: false,
          showResetPswDialog: false
        }
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          if(val.name == 'proj' || !this.currentProj.id){
            this.projSelected = false;
          }else{
            this.projSelected = true;
          }
        },
        // 深度观察监听
        deep: true
      }
    },
    created(){
      this.projSelected = !!this.currentProj.id;
    }

  }
</script>
