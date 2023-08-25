<template>
    <div class="mt-6 no-select">
        <v-card class="mx-auto pa-10 pb-8" :loading="loading" max-width="480" style="border:1px solid #E0E0E0" variant="outlined" rounded="lg" >
            <div class="text-center text-h5">创建Noise Music账号</div>

            <v-card-subtitle class="text-center mt-3 mb-6">{{ titleMap[step] }}</v-card-subtitle>

            <v-form ref="form">
                <v-text-field v-if="step === 1" v-model="account" label="电子邮件或电话号码" variant="outlined" :rules="rules.account"/>

                <template v-if="step === 2">
                    <v-text-field v-model="name" label="用户名称" variant="outlined" :rules="rules.name" />

                    <v-select v-model="gender" class="mt-2" label="性别" variant="outlined" :items="config.GENDER_OPT" :rules="rules.gender" />

                    <v-text-field v-model="birthday" class="mt-2" id="menu-activator" variant="outlined" label="生日" readonly :rules="rules.birthday" ></v-text-field>

                    <v-menu
                        class="ma-0"
                        ref="menu"
                        v-model="menuActive"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        activator="#menu-activator"
                    >
                        <v-date-picker
                        
                            v-model="pickDate"
                            @click:save="pickDateOk"
                            @click:cancel="pickDateCancel"
                        ></v-date-picker>
                    </v-menu>
                </template>

                <v-text-field v-if="step === 3" v-model="password" :type="visible ? 'text' : 'password'" label="密码" variant="outlined" :rules="rules.password" />

                <v-text-field v-if="step === 3" v-model="confirm_password" class="mt-2" :type="visible ? 'text' : 'password'" label="确认" variant="outlined" :rules="rules.confirm_password" />

                <v-card-actions class="d-flex justify-space-between">
                    <v-btn v-if="step === 1" color="blue-darken-4" @click="$router.back()">取消</v-btn>
                    <v-btn v-else color="blue-darken-4" @click="step--">上一步</v-btn>
                    <div class="d-flex justify-end">
                        <v-btn color="blue-darken-4 px-3" variant="tonal" @click="next">{{ step === 3 ? '注册': '下一步' }}</v-btn>
                    </div>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
  </template>

<script>
import config from '@/config/index'
import SHA256 from 'crypto-js/sha256'
import { useUserStore } from '@/stores/userStore'

export default {
    data: () => ({
        visible: false,
        account: '',
        name: '',
        password: '',
        confirm_password: '',
        loading: false,
        step: 1,
        psOk: false,
        birthday: null,
        pickDate: null,
        menuActive: false,
        gender: null,
        config,
        rules: {
            account: [
                v => !!v || '请输入邮箱地址或电话号码',
                v => config.phonePatt.test(v) || config.emailPatt.test(v) || '邮箱地址或电话号码格式不正确'
            ],
            name: [
                v => !!v || '请输入用户名称',
            ],
            gender: [
                v => !!v || '请输入性别'
            ],
            birthday: [
                v => !!v || '请输入生日'
            ],
            password: [
                v => !!v || '请输入密码'
            ],
            confirm_password: [
                v => !!v || '请输入确认密码',
            ]
        },
        titleMap: {
            1: '请输入您的手机号码或电子邮箱',
            2: '请输入您的用户名称',
            3: '设置安全系数高的密码（使用字母、数字和符号的组合）',
        }
    }),
    methods: {
        async next() {
            const { valid } = await this.$refs.form.validate()
            if (!valid) return
            this.loading = true
            if (this.step === 1) {
                try {
                    await this.$http.post('/user/checkAccount', { account: this.account })
                } catch (e) {
                    this.rules.account.push( () => e.message )
                    this.loading = false
                    await this.$refs.form.validate()
                    this.rules.account.pop()
                    return
                }
            }
            if (this.step === 3) {
                this.rules.confirm_password.push(() => this.password === this.confirm_password || '密码不一致，请重新输入')
                const { valid } = await this.$refs.form.validate()
                if (!valid) {
                    this.loading = false
                    return
                }
                await this.$http.post('/user/register', {
                    account: this.account,
                    name: this.name,
                    gender: this.gender,
                    birthday: this.birthday,
                    password: SHA256(this.password).toString(),
                })
                await this.$http.post('/user/login', {
                    account: this.account,
                    password: SHA256(this.password).toString()
                })
                this.loading = false
                useUserStore().initUser()
                this.$router.replace('/')
            }
            this.step ++
            this.loading = false
        },

        pickDateCancel() {
            this.menuActive = false
        },

        pickDateOk() {
            this.birthday = new Date(this.pickDate).toLocaleDateString()
            this.menuActive = false
        },
    }
}
</script>