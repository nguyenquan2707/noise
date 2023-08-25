<template>
    <div class="no-select">
        <v-card class="mx-auto mt-12 pa-6" elevation="8" max-width="448" style="border:1px solid #E0E0E0" rounded="lg" >
            <div class="d-flex justify-center">
                <v-icon size="40" icon="mdi mdi-music"></v-icon>
                <span class="text-h4 ml-4">Noise Music</span>
            </div>
            <div class="text-center my-2 text-h5">登录</div>
            <v-form ref="form" @submit.prevent="login">
                <div class="text-subtitle-1 text-medium-emphasis">账号</div>
        
                <v-text-field
                    alidate-on="blur"
                    v-model="account"
                    density="compact"
                    placeholder="电子邮件或手机号码"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    :rules="rules.account"
                ></v-text-field>
        
                <div class="mt-1 text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    密码<a class="text-caption text-decoration-none text-blue-darken-4" href="#" rel="noopener noreferrer" target="_blank" > 忘记登录密码?</a>
                </div>
        
                <v-text-field
                    v-model="password"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="输入您的密码"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    :rules="rules.password"
                    @click:append-inner="visible = !visible"
                ></v-text-field>
        
                <v-card class="mb-12 mt-2" color="surface-variant" variant="tonal" >
                    <v-card-text class="text-medium-emphasis text-caption">
                        警告：连续3次登录失败后，您的账户将被暂时锁定三个小时。如果您必须立即登录，您还可以点击“忘记登录密码？”，重置登录密码。
                    </v-card-text>
                </v-card>
        
                <v-btn block class="mb-8" color="blue-darken-4" :loading="loading" size="large" variant="tonal" type="submit">登录</v-btn>
        
                <v-card-text class="d-flex justify-space-between">
                    <a class="text-blue-darken-4 text-decoration-none" href="/" rel="noopener noreferrer" >
                        <v-icon icon="mdi-chevron-left"></v-icon>返回主页
                    </a>
                    <a class="text-blue-darken-4 text-decoration-none" href="#/register" rel="noopener noreferrer" >
                        创建账号<v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-form>
        </v-card>
    </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256'
import config from '@/config/index'
import { useUserStore } from '@/stores/userStore'

export default {
    data: () => ({
        loading: false,
        visible: false,
        account: '17603074800',
        password: '12345',
        show: false,
        rules: {
            account: [
                v => !!v || '请输入手机号码或电子邮箱',
                v => config.phonePatt.test(v) || config.emailPatt.test(v) || '手机号码或电子邮箱格式不正确',
            ],
            password: [
                v => !!v || '请输入您的密码'
            ]
        }
    }),

    methods: {
        async login() {
            try {
                await this.$refs.form.validate()
            } catch {
                return
            }
            try {
                this.loading = true
                await this.$http.post('/user/login', {
                    account: this.account,
                    password: SHA256(this.password).toString()
                })
                this.loading = false
                useUserStore().initUser()
                this.$router.replace('/')
            } catch (e) {
                this.rules.password.push( () => e.message )
                await this.$refs.form.validate()
                this.rules.password.pop()
            }
        }
    }
}
</script>