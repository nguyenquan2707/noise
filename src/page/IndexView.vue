<template>
    <v-layout>
        <v-navigation-drawer rail-width="88" class="no-select" :color="colorSet.nav_bg" permanent rail>
            <v-row class="ma-0">
                <v-col class="text-center pa-0">
                    <v-avatar
                        class="my-2 user-card-avatar avatar included"
                        :image="user.avatar"
                        @click="show=!show"
                    >
                        <v-icon size="40" icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                    <v-avatar size="14" style="position:absolute;right:22px;top:32px;" :color="user.token ? 'green' : 'grey'">
                        <v-icon size="12" color="white" :icon="user.token ? 'mdi mdi-sync' : 'mdi mdi-sync-off'"></v-icon>
                    </v-avatar>
                </v-col>
                <v-divider></v-divider>
                <v-col v-for="item in items" :key="item.tab" class="py-2">
                    <div @click="activeTab(item)" class="d-flex flex-column align-center text-decoration-none">
                        <v-btn
                            :variant="active === item.tab ? 'tonal' : 'text'"
                            :class="active === item.tab ? colorSet.active_bg : ''"
                            block
                            density="compact"
                            size="large"
                            rounded="xl"
                            :icon="item.icon"
                            :color="colorSet.icon_color"
                        ></v-btn>
                        <div class="mt-1 text-subtitle-2 font-weight-regular">{{ item.tab }}</div>
                    </div>
                </v-col>
            </v-row>

            <v-card v-show="show" class="no-select user-card user-card_bg" v-click-outside="{ handler: onClickOutside, include }">
                <div class="user-card-name">{{ user.name}}</div>

                <div style="position:relative;">
                    <v-avatar
                        size="60"
                        class="my-2 user-card-avatar included"
                        :image="user.avatar"
                    >
                        <v-icon size="70" icon="mdi-account-circle"></v-icon>
                    </v-avatar>
                    <v-avatar size="16" style="position:absolute;right:0px;top:50px;" :color="user.token ? 'green' : 'grey'">
                        <v-icon size="14" color="white" :icon="user.token ? 'mdi mdi-sync' : 'mdi mdi-sync-off'"></v-icon>
                    </v-avatar>
                </div>

                <div class="pa-0 text-center d-flex flex-column text-body-2">
                    <template v-if="user.token">
                        <v-chip v-if="user.phone" class="mt-2" label text-color="white">
                            <v-icon start size="14" icon="mdi mdi-phone"></v-icon>
                            {{ user.phone }}
                        </v-chip>
                        <v-chip v-if="user.email" class="mt-2" label text-color="white">
                            <v-icon start size="16" icon="mdi mdi-email"></v-icon>
                            {{ user.email }}
                        </v-chip>
                    </template>
                    <span v-else>未登录</span>
                </div>

                <v-spacer></v-spacer>

                <v-card v-if="user.token" variant="text" class="w-100">
                    <v-list density="compact">
                        <v-list-item v-for="(item, i) in cardItems" :key="i" @click="onClick(item.action)">
                            <template v-slot:prepend>
                                <v-icon size="20" :icon="item.icon" class="mr-3"></v-icon>
                            </template>
                            <v-list-item-title class="text-body-2">{{ item.text }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-card>
                
                <template v-else>
                    <v-card variant="text">
                        <p class="text-body-2 text-grey-darken-3">登录后您将可以浏览更多内容</p>
                        <v-btn block class="my-4" size="small" variant="tonal" color="" @click="toLogin">立即登录</v-btn>
                    </v-card>
                    <v-spacer></v-spacer>
                </template>
            </v-card>
        </v-navigation-drawer>

        <v-main>
            <div id="app_main" class="pa-3">
                <RouterView />
            </div>
        </v-main>
    </v-layout>
</template>

<script>
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/userStore'


export default {
    data: () => ({
        show: false,
        active: 'Home',
        drawer: false,
        bar: false,
        items: [
            { tab: 'Home', icon: 'mdi mdi-material-design', url: '/home' },
            { tab: 'Music', icon: 'mdi mdi-music-box-multiple', url: '/music' },
            { tab: 'Video', icon: 'mdi mdi-video-box', url: '/video' },
            { tab: 'User', icon: 'mdi mdi-account-multiple', url: '/user' },
            { tab: 'Chat', icon: 'mdi mdi-forum', url: '/chat' },
        ],
        cardItems: [
            { text: '修改个人信息', action: 'info', icon: 'mdi mdi-square-edit-outline' },
            { text: '修改登录密码', action: 'password', icon: 'mdi mdi-lock' },
            { text: '退出登录', action:'logout', icon: 'mdi mdi-logout-variant' },
        ],
    }),

    computed: {
        colorSet() {
            const theme = useTheme()
            if (theme.global.name.value === 'dark') return {
                icon_color: 'grey-lighten-3',
                nav_bg: '#28292a',
                active_bg: 'bg-light-blue-darken-4',
            }
            return {
                icon_color: 'grey-darken-3',
                nav_bg: '#f8fafd',
                active_bg: 'bg-blue-lighten-4',
            }
        },
        user: () => useUserStore(),
    },

    created() {
        const path = '/' + this.$route.path.split('/')[1]
        const item = this.items.find(item => item.url === path)
        if (path) {
            this.active = item.tab
        }
    },

    methods: {
        toggleUser() {
            this.show = !this.show
        },
        onClickOutside() {
            this.show = false
        },
        include () {
            // 把含有 included 类的元素排除在外
            return [document.querySelector('.included')]
        },
        toLogin() {
            this.$router.replace('/login')
        },
        activeTab(item) {
            this.active = item.tab
            this.$router.replace(`${item.url}`)
        },
        onClick(action) {
            switch (action) {
                case 'info':
                    this.$router.push('/edituser')
                    break
                case 'password':
                    this.$router.push('/resetpassword')
                    break
                case 'logout':
                    (async () => {
                        localStorage.removeItem('token')
                        this.show = false
                        const userStore = useUserStore()
                        userStore.$reset()
                        this.$router.replace('/')
                    })()
            }
        },
        onResize() {
            if (window.innerWidth < 960) {
                this.bar = true
                this.drawer = false
            } else {
                this.bar = false
                this.drawer = true
            }
        }
    }
}
</script>