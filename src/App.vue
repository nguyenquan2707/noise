<template>
  <RouterView v-resize="onResize"></RouterView>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
import { useAppStore } from '@/stores/appStore'
const theme = useTheme()
const userStore = useUserStore()
const appStore = useAppStore()

onMounted(() => {
    userStore.initUser()
})

function onResize() {
    const isMobile = window.innerWidth < 960
    if (appStore.isMobile !== isMobile) {
        appStore.isMobile = isMobile
    }
}

onBeforeMount(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkModeQuery.matches) {
        theme.global.name.value = 'dark'
    } else {
        theme.global.name.value = 'light'
    }
    darkModeQuery.addEventListener('change', e => {
        theme.global.name.value = e.matches ? 'dark' : 'light'
    })
})
</script>