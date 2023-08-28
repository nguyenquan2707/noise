<template>
    <v-layout class="mr-6 rounded-xl">
		<v-main class="bg-grey-lighten-4 pa-6">
			黑板内容
		</v-main>
    </v-layout>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
    data: () => ({
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
	}
}
</script>