import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import IndexView from '@/page/IndexView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: 'home',
            component: IndexView,
        },

        {
            path: '/home',
            component: IndexView,
            children: [
                {
                    path: '',
                    component: () => import('@/page/home/HomeView.vue')
                }
            ]
        },

        {
            path: '/music',
            component: IndexView,
            children: [
                {
                    path: '',
                    component: () => import('@/page/music/MusicView.vue'),
                    meta: { requireAuth: true },
                },
            ]
        },

        {
            path: '/video',
            component: IndexView,
            children: [
                {
                    path: '',
                    component: () => import('@/page/video/VideoView.vue'),
                    meta: { requireAuth: true },
                },
            ]
        },

        {
            path: '/user',
            component: IndexView,
            children: [
                {
                    path: '',
                    component: () => import('@/page/user/UserListView.vue'),
                    meta: { requireAuth: true },
                },
                {
                    path: 'info',
                    component: () => import('@/page/user/UserInfoView.vue'),
                    meta: { requireAuth: true },
                },
            ]
        },

        {
            path: '/chat',
            component: IndexView,
            children: [
                {
                    path: '',
                    component: () => import('@/page/chat/ChatView.vue'),
                    meta: { requireAuth: true },
                },
            ]
        },

        {
            path: '/board',
            component: IndexView,
            children: [
                {
                    path: '',
                    component: () => import('@/page/board/BoardView.vue'),
                    meta: { requireAuth: true },
                },
            ]
        },

        {
            path: '/register',
            component: () => import('@/page/auth/RegisterView.vue')
        },

        {
            path: '/login',
            component: () => import('@/page/auth/LoginView.vue')
        },

        {
            path: '/resetpassword',
            component: () => import('@/page/auth/ResetPasswordView.vue')
        },

        {
            path: '/edituser',
            component: () => import('@/page/auth/EditUserView.vue')
        },

        {
            path: '/403',
            name: '403',
            component: () => import('@/page/error/403View.vue')
        },

        {
            path: '/404',
            name: '404',
            component: () => import('@/page/error/404View.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {
    let userStore = useUserStore()
    if (to.matched.some(route => route.meta.requireAuth) && !userStore.token) {
        next({
            path: '/login',
            replace: true,
        })
    } else {
        next()
    }
})

export default router
