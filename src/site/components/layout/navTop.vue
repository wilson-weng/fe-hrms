<template>
  <div>
    <div class="company-logo pull-left">
      <i class="el-icon-star-on" style="color: #2c7be5; font-size: 24px;"></i>
      您公司的Logo
    </div>
    <div class="pull-right subtitle" style="margin-top: 20px;">
      劳务加管理系统 欢迎您，{{currentUser.real_name}}
    </div>
  </div>
</template>

<script>

  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        currentUser: state => state.global.current_user,
      }),
    },
  }
</script>
