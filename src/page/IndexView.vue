<template>
    <v-layout>
        <v-app-bar class="px-3" density="comfortable" elevation="0">
            <template #prepend>
                <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
                <v-app-bar-title class="ml-5">
                    <v-btn prepend-icon="mdi mdi-material-design" @click="home">NOISE</v-btn>
                </v-app-bar-title>
            </template>
            <template #append>
                <v-avatar class="my-2 avatar included" :image="userStore.avatar" @click="show=!show" >
                    <v-icon size="40" icon="mdi-account-circle"></v-icon>
                </v-avatar>
                <v-avatar size="14" style="position:absolute;right:12px;top:34px;" :color="userStore.token ? 'green' : 'grey'">
                    <v-icon size="12" color="white" :icon="userStore.token ? 'mdi mdi-sync' : 'mdi mdi-sync-off'"></v-icon>
                </v-avatar>
            </template>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" rail-width="90" style="border:none" class="no-select" :disable-resize-watcher="false" permanent rail>
            <v-row class="ma-0">
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
                        <div class="mt-1 text-subtitle-2 font-weight-regular">{{ item.title }}</div>
                    </div>
                </v-col>
            </v-row>
        </v-navigation-drawer>

        <v-card v-show="show" class="no-select user-card" v-click-outside="{ handler: onClickOutside, include }">
            <div class="user-card-name">{{ userStore.name}}</div>

            <div style="position:relative;">
                <v-avatar size="60" class="my-2 avatar included" :image="userStore.avatar" >
                    <v-icon size="70" icon="mdi-account-circle"></v-icon>
                </v-avatar>
                <v-avatar size="16" style="position:absolute;right:0px;top:50px;" :color="userStore.token ? 'green' : 'grey'">
                    <v-icon size="14" color="white" :icon="userStore.token ? 'mdi mdi-sync' : 'mdi mdi-sync-off'"></v-icon>
                </v-avatar>
            </div>

            <div class="pa-0 text-center d-flex flex-column text-body-2">
                <template v-if="userStore.token">
                    <v-chip v-if="userStore.phone" class="mt-2" label text-color="white">
                        <v-icon start size="14" icon="mdi mdi-phone"></v-icon>
                        {{ userStore.phone }}
                    </v-chip>
                    <v-chip v-if="userStore.email" class="mt-2" label text-color="white">
                        <v-icon start size="16" icon="mdi mdi-email"></v-icon>
                        {{ userStore.email }}
                    </v-chip>
                </template>
                <span v-else>未登录</span>
            </div>

            <v-spacer></v-spacer>

            <v-card v-if="userStore.token" variant="text" class="w-100 mt-8">
                <v-divider></v-divider>
                <v-list density="compact">
                    <v-list-item v-for="(item, i) in cardItems" :key="i" @click="onClick(item.action)">
                        <v-list-item-title class="text-body-2">
                            <v-icon size="20" class="mr-2" :icon="item.icon"></v-icon>
                            {{ item.text }}
                        </v-list-item-title>
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

        <v-main>
            <RouterView />
        </v-main>
    </v-layout>
</template>

<script>
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'

export default {
    data: () => ({
        show: false,
        active: 'Home',
        drawer: true,
        items: [
            { tab: 'Home', title: '首页', icon: 'mdi mdi-material-design', url: '/home' },
            { tab: 'Music', title: '音乐', icon: 'mdi mdi-music-box-multiple', url: '/music' },
            { tab: 'Video', title: '视频', icon: 'mdi mdi-video-box', url: '/video' },
            { tab: 'User', title: '用户', icon: 'mdi mdi-account-multiple', url: '/user' },
            { tab: 'Chat', title: '聊天', icon: 'mdi mdi-forum', url: '/chat' },
        ],
        cardItems: [
            { text: '修改个人信息', action: 'info', icon: 'mdi mdi-square-edit-outline' },
            { text: '修改登录密码', action: 'password', icon: 'mdi mdi-key-change' },
            { text: '退出登录', action:'logout', icon: 'mdi mdi-logout-variant' },
        ],
    }),

    computed: {
        colorSet() {
            const theme = useTheme()
            if (theme.global.name.value === 'dark') return {
                active_bg: 'bg-light-blue-darken-4',
            }
            return {
                active_bg: 'bg-blue-lighten-4',
            }
        },

        userStore: () => useUserStore(),

        appStore: () => useAppStore(),
    },

    watch: {
        'appStore.isMobile'(newVal) {
            this.drawer = !newVal
        }
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
        home() {
            this.$router.replace('/')
            this.active = 'Home'
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
    }
}
</script>