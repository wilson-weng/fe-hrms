<template>
    <div id="login" class="login-container">
        <div class="flex-item">
            <div class="flex height-100 flex-center">
                <div class="flex-item"></div>
                <div class="flex-item">
                    <el-card class="login-card" v-loading="loading">
                        <div class="card-title">欢迎使用员工管理系统（演示版）</div>
                        <el-form :model="loginForm" ref="loginForm" class="p-a-2">
                            <el-form-item
                                prop="account"
                                :rules="[{ required: true, message: '请输入账户', trigger: 'blur'}]"
                                class="login-input m-b-2"
                            >
                                <el-input
                                    v-model="loginForm.account"
                                    placeholder="请输入手机号"
                                    prefix-icon="el-icon-message"
                                    clearable
                                >
                        <span slot="suffix" v-if="error" class="color-error f-s-mini">
                            <span class="input-suffix-text">{{warning}}</span>
                            <i class="el-input__icon el-icon-warning"></i>
                        </span>
                                </el-input>
                            </el-form-item>
                            <el-form-item
                                prop="pass"
                                :rules="[{ required: true, message: '请输入密码', trigger: 'blur' },]"
                                class="login-input m-b-2"
                                v-if="loginStatus === 'login'"
                            >
                                <el-input
                                    type="password"
                                    v-model="loginForm.pass"
                                    auto-complete="off"
                                    placeholder="请输入密码"
                                    prefix-icon="el-icon-goods"
                                    clearable
                                ></el-input>
                            </el-form-item>
                            <div v-if="loginStatus === 'login'">
                                <el-button
                                    type="primary"
                                    @click="submitForm('loginForm')"
                                    style="display: block;width: 100%;margin-top: 20px"
                                    v-if="loginStatus === 'login'"
                                >登录</el-button>
                            </div>
                            <div v-if="loginStatus === 'reset'">
                                <el-form-item class="login-input" v-if="loginStatus === 'reset'">
                        <span class="remember-me">
                            已有账号,
                            <span class="color-link" @click="changeFormStatus" style="cursor: pointer">马上登录</span>
                        </span>
                                </el-form-item>
                                <el-button
                                    type="primary"
                                    @click="passwordReset('loginForm')"
                                    style="display: block;width: 100%;margin-top: 40px"
                                        v-if="loginStatus === 'reset'"
                                >确认重置</el-button>
                            </div>
                        </el-form>
                    </el-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        methods: {
          submitForm(formName) {
            console.log(formName);
            this.$router.push({path: '/logined'});
          },
        },
        data() {
            return {
                loginForm: {
                    account: '',
                    pass: '',
                },
                loginStatus: 'login',       // login, reset 两种状态
                remember: true,
                warning: '',
                error: false,
                cur_account_id: 0,
                pre_account: '',
                loading: false,
            }
        },
        created() {
            console.log(this.loginForm.account);
        }
    }
</script>
