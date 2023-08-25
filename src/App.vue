<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onBeforeMount, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/userStore'
const theme = useTheme()

onMounted(() => {
  const userStore = useUserStore()
  userStore.initUser()
})

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