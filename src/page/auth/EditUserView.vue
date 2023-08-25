<template>
    <v-card variant="text" max-width="900" class="mx-auto mt-10">
        <div class="text-h5 text-center font-weight-bold">
            <v-btn variant="text" prepend-icon="mdi mdi-arrow-left" style="float:left" @click="$router.back()">主页</v-btn>
            个人信息
        </div>
        <div class="text-grey text-center mt-4">您在各种 Noise Music 服务中的个人信息和偏好设置</div>

        <v-row class="mt-10">
            <v-col cols="7">
                <p class="text-h5">您在 Noise Music 服务中的个人资料信息</p>
                <p class="text-grey mt-2">个人信息以及用于管理这些信息的选项。您可以向他人公开部分信息（例如您的详细联系信息），以方便他们与您联系。您还可以查看您的个人资料的摘要。</p>
            </v-col>
            <v-col>
                <figure class="HJOYV HJOYVc10 oMEk9d" aria-hidden="true"><img class="YPzqGd" src="https://www.gstatic.com/identity/boq/accountsettingsmobile/profile_scene_visible_360x128_18500c161aac04e9279fbb234b7de818.png" alt="" aria-hidden="true" srcset="https://www.gstatic.com/identity/boq/accountsettingsmobile/profile_scene_visible_720x256_ee5ae234eb96dc206b79c851f41a6f69.png 2x, https://www.gstatic.com/identity/boq/accountsettingsmobile/profile_scene_visible_1080x384_3289b9d30bfeff97d2fb2f9908c6d1bc.png 3x, https://www.gstatic.com/identity/boq/accountsettingsmobile/profile_scene_visible_1440x512_4c58af6a8ee2d08211a85df20b862d43.png 4x" data-iml="824720.6999999881"></figure>
            </v-col>
        </v-row>

        <v-list style="background: none;">
            <v-card variant="outlined" style="border:1px solid #E0E0E0">
                <v-card-title>基本信息</v-card-title>
                <v-card-subtitle>使用 Noise Music 服务的其他用户可能会看到部分信息。</v-card-subtitle>

                <v-list-item @click="setAvatar" prepend-icon="mdi mdi-image-filter-center-focus-strong" subtitle="">
                    <template #title>
                        <span class="c-list-title text-body-2">个人资料头像</span>
                        <span class="text-grey text-body-2">更换个人资料头像可帮助您个性化您的账号</span>
                    </template>
                    <template #append>
                        <v-avatar size="60" :image="avatar">
                            <v-icon size="70" icon="mdi-account-circle"></v-icon>
                        </v-avatar>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="setUserDialog('name')" prepend-icon="mdi mdi-ticket-account" append-icon="mdi mdi-chevron-right">
                    <template #title>
                        <span class="c-list-title text-body-2">用户名</span>
                        <span>{{ name }}</span>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="setUserDialog('birthday')" prepend-icon="mdi mdi-cake" append-icon="mdi mdi-chevron-right">
                    <template #title>
                        <span class="c-list-title text-body-2">生日</span>
                        <span>{{ birthday}}</span>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="setUserDialog('gender')" prepend-icon="mdi mdi-gender-male-female" append-icon="mdi mdi-chevron-right">
                    <template #title>
                        <span class="c-list-title text-body-2">性别</span>
                        <span>{{ config.GENDER_STR[gender] || '未设置'}}</span>
                    </template>
                </v-list-item>
            </v-card>

            <v-card variant="outlined" class="mt-10" style="border:1px solid #E0E0E0">
                <v-card-title>联系信息</v-card-title>
                <v-list-item @click="setUserDialog('phone')" prepend-icon="mdi mdi-phone" append-icon="mdi mdi-chevron-right">
                    <template #title>
                        <span class="c-list-title text-body-2">手机号码</span>
                        <span>{{ phone || '未绑定' }}</span>
                    </template>
                </v-list-item>

                <v-divider></v-divider>

                <v-list-item @click="setUserDialog('email')" prepend-icon="mdi mdi-email" append-icon="mdi mdi-chevron-right">
                    <template #title>
                        <span class="c-list-title text-body-2">电子邮箱</span>
                        <span>{{ email || '未绑定'}}</span>
                    </template>
                </v-list-item>
            </v-card>
        </v-list>
        
        <input type="file" ref="upload" class="w-0" style="opacity:0" accept=".jpg, .jpeg, .png" multiple @change="changeImg">

        <v-dialog v-model="isPickDate" width="50%">
            <div class="mx-auto">
                <v-date-picker
                    v-model="new_birthday"
                    @click:save="pickDateOk"
                    @click:cancel="pickDateCancel"
                    locale="zh-cn"
                ></v-date-picker>
            </div>
        </v-dialog>

        <v-dialog v-model="isEdit" width="900">
            <v-card>
                <v-card-title>设置</v-card-title>
                <v-card-text>
                    <v-text-field v-if="edit_type === 'name'" v-model="new_name" label="用户名称" variant="outlined" :rules="rules.name" />
                    <v-text-field v-if="edit_type === 'phone'" v-model="new_phone" label="手机号码" variant="outlined" :rules="rules.phone" />
                    <v-text-field v-if="edit_type === 'email'" v-model="new_email" label="邮箱地址" variant="outlined" :rules="rules.email" />
                    <v-select v-if="edit_type === 'gender'" v-model="new_gender" label="性别" variant="outlined" :items="config.GENDER_OPT" :rules="rules.gender" />
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn @click="isEdit = false">取消</v-btn>
                    <v-btn @click="saveEdit(edit_type)">确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { useUserStore } from '@/stores/userStore'
import { mapState } from 'pinia'
import config from '@/config';
import dayjs from 'dayjs'

export default {
    data: () => ({
        config,
        isEdit: false,
        isPickDate: false,
        edit_type: '',
        new_name: null,
        new_gender: null,
        new_birthday: null,
        new_email: null,
        new_phone: null,
        new_password: null,
        confirm_password: null,
        rules: {
            phone: [
                v => !!v || '请输入电话号码',
                v => config.phonePatt.test(v) || '电话号码格式不正确'
            ],
            email: [
                v => !!v || '请输入电话号码',
                v => config.emailPatt.test(v) || '邮箱地址格式不正确'
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
        }
    }),

    computed: {
        ...mapState(useUserStore, ['name', 'phone', 'email', 'gender', 'avatar']),
        ...mapState(useUserStore, {
            birthday: (store) => store.birthday ? dayjs(store.birthday).format('YYYY-MM-DD') : '未设置'
        }),
    },

    methods: {
        setAvatar() {
            this.$refs.upload.click()
        },

        async changeImg(data) {
            const file = data.target.files[0]
            const format = new FormData()
            format.append('file', file)
            const { filepath } = await this.$http.post('/user/setAvatar', format)
            useUserStore().setUser({
                avatar: filepath
            })
        },

        setUserDialog(type) {
            this.edit_type = type
            if (type === 'birthday') {
                this.isPickDate = true
            } else {
                this.isEdit = true
            }
        },

        saveEdit(type) {
            const setObj = {}
            if (type === 'name') {
                setObj['name'] = this.new_name
            }
            if (type === 'phone') {
                setObj['phone'] = this.new_phone
            }
            if (type === 'email') {
                setObj['email'] = this.new_email
            }
            if (type === 'gender') {
                setObj['gender'] = this.new_gender
            }
            useUserStore().setUser(setObj)
            this.isEdit = false
        },

        pickDateOk() {
            useUserStore().setUser({ birthday: this.new_birthday })
            this.isPickDate = false
        },

        pickDateCancel() {
            this.isPickDate = false
        },
    }
}
</script>