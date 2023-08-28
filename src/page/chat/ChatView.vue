<template>
    <v-layout class="mr-6 rounded-xl">
        <v-list class="bg-grey-lighten-3 pt-6 no-select" height="80vh" nav rounded width="250px" >
            <v-list-item
                v-for="item in friends"
                :key="item.uid"
                :title="item.name"
                :value="item.uid"
                :subtitle="item.message"
				:active-class="colorSet.active_bg"
				:color="colorSet.icon_color"
				class="py-2"
            >
                <template #prepend>
                    <v-avatar rounded>
						<v-img v-if="item.avatar" cover :src="item.avatar"></v-img>
                        <v-icon v-else icon="mdi-alarm"></v-icon>
                    </v-avatar>
                </template>
            </v-list-item>
        </v-list>
		<v-main class="bg-grey-lighten-4 pa-6">
			聊天内容
		</v-main>
    </v-layout>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
    data: () => ({
        friends: [
            {
                uid: 1,
                name: '坂本龙一',
                avatar: 'http://localhost:4000/upload/6ca1a0d098ff195f2a3e72601.png',
                message: '最近过得还好么'
            },
            {
                uid: 2,
                name: '高谷史郎',
                avatar: 'https://cdn.vuetifyjs.com/images/cards/server-room.jpg',
                message: '还行，你呢'
            },
            {
                uid: 3,
                name: '张有待',
                avatar: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg',
                message: '还行，你呢'
            },
            {
                uid: 4,
                name: '王菲',
                avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                message: '还行，你呢'
            },
        ]
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