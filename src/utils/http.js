import axios from "axios"
import { useUserStore } from '@/stores/userStore'

const service = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.DEV ? '/api' : '',
})

service.interceptors.request.use(config => {
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers['Authorization'] = 'Bearer ' + userStore.token
    }
    return config
})

service.interceptors.response.use(
    response => {
        if (response.headers.authorization) {
            const token = response.headers.authorization.split(' ')[1]
            const userStore = useUserStore()
            userStore.setToken(token)
        }
        if (response.data.errcode) {
            return Promise.reject(response.data)
        }
        return response.data
    }, error => {
        switch (error.status) {
            case 401:
                window.location.href = '#/'
                break
            case 403:
                window.location.href = '#/403'
                break
            case 404:
                window.location.href = '#/404'
                break
            default: 
                return Promise.reject(error.response.data)
        }
    }
)

export default service