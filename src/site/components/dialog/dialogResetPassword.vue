<template>
  <el-form :model="activeForm" ref="activeForm" label-width="80px" class="demo-dynamic" :rules="rules">
    <el-form-item label="姓名" prop="username">
      <el-input type="text" v-model="cur_account_username" auto-complete="off" disabled></el-input>
    </el-form-item>
    <br>
    <el-form-item label="新密码" prop="password">
      <el-input type="password" v-model="activeForm.password" auto-complete="off"></el-input>
    </el-form-item>
    <br>
    <el-form-item label="确认密码" prop="check">
      <el-input type="password" v-model="activeForm.check" auto-complete="off"></el-input>
    </el-form-item>
    <br>
    <el-form-item class="text-right">
      <el-button type="primary" @click="submitForm('activeForm')">提交</el-button>
      <el-button type="info" @click="resetForm('activeForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions(['setPasswordChange']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {"account_id": this.cur_account_id, "password": this.activeForm.password};
            this.setPasswordChange(params).then(result => {
              if(result.status == 'ok') {
                this.$alert(result.msg, '消息提示', {confirmButtonText: '确定'});
              }
              this.$router.go(0);
            });
          }
          else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    },

    computed: {
      ...mapState({
        cur_account_id :state => state.global.current_user.id,
        cur_account_username: state => state.global.current_user.real_name
      }),
    },

    data() {
      var validatePass = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入密码!'));
        }
        else {
          if (this.activeForm.check != '') {
            this.$refs.activeForm.validateField('check');
          }
          callback();
        }
      };
      var validateCheck = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请确认密码!'));
        }
        else if (value != this.activeForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeForm: {
          password: '',
          check: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          check: [
            { validator: validateCheck, trigger: 'blur' }
          ]
        }
      }
      return {

      }
    },
  };
</script>
