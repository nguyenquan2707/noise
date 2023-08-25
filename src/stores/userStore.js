import { defineStore } from 'pinia'
import http from '@/utils/http'

export const useUserStore = defineStore('user', {
    state: () => ({
        token: null,
        uid: null,
        name: null,
        avatar: null,
        phone: null,
        email: null,
        birthday: null,
        gender: null,
    }),
    
    actions: {
        // 刷新access_token时使用
        setToken(token = null) {
            if (token !== this.token) {
                this.token = token
                localStorage.setItem('token', token)
            }
        },

        // 刷新页面时，store的数据会被清除，所以需要请求后台，初始化store
        async initUser() {
            this.token = localStorage.getItem('token') || null
            if (this.token) {
                const user = await http.get('/user/getUser')
                this.uid = user.uid
                this.name = user.name
                this.avatar = user.avatar
                this.phone = user.phone
                this.email = user.email
                this.birthday = user.birthday
                this.gender = user.gender
            }
        },

        // 修改用户数据，同时post给后台
        async setUser({ name, avatar, phone, email, birthday, gender }) {
            if (name) this.name = name
            if (avatar) this.avatar = avatar
            if (phone) this.phone = phone
            if (email) this.email = email
            if (birthday) this.birthday = birthday
            if (gender) this.gender = gender
            if (name || phone || email || birthday || gender) {
                await http.post('/user/setUser', {
                    name,
                    phone,
                    email,
                    birthday,
                    gender,
                })
            }
        },
    }
})
