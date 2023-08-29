<template>
    <v-layout class="mr-6 rounded-xl">
        <v-list :value="selectUid" mandatory class="bg-grey-lighten-3 pt-6 no-select" min-height="80vh" nav rounded-s min-width="250px">
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

		<v-container class="bg-grey-lighten-4 pa-4 d-flex flex-column">
            <v-row no-gutters>
                <v-col>
                    <v-row no-gutters class="mb-4">聊天内容</v-row>

                    <v-row no-gutters class="mt-2">
                        <v-col class="d-flex" cols="8">
                            <v-avatar rounded>
                                <v-img cover src="http://localhost:4000/upload/6ca1a0d098ff195f2a3e72601.png"></v-img>
                            </v-avatar>
                            <div class="bg-blue-grey-lighten-1 px-4 py-2 ml-2 rounded-lg text-body-2">在Vuetify中，v-row组件的高度是由其内容决定的，默认情况下，v-row会自动根据子元素的高度进行自适应。如果你想要控制 v-row 的高度，可以通过以下几种方式实现：使用min-height或max-height属性：将 v-row 包裹在一个父容器中，并为父容器设置 min-height 或 max-height 属性来限制 v-row 的高度。例如</div>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>

                    <v-row no-gutters class="mt-2 justify-end">
                        <v-col class="d-flex flex-row-reverse" cols="8">
                            <v-avatar rounded>
                                <v-img cover src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
                            </v-avatar>
                            <div class="bg-green-lighten-1 px-4 py-2 mx-2 rounded-lg text-body-2">在Vuetify中，v-row组件的高度是由其内容决定的，默认情况下，v-row会自动根据子元素的高度进行自适应。如果你想要控制 v-row 的高度，可以通过以下几种方式实现：使用min-height或max-height属性：将 v-row 包裹在一个父容器中，并为父容器设置 min-height 或 max-height 属性来限制 v-row 的高度。例如</div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row no-gutters class="align-end">
                <v-textarea hide-details variant="outlined" label="按回车键发送内容"></v-textarea>
            </v-row>
		</v-container>
    </v-layout>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
    data: () => ({
        selectUid: 1,
        friends: [
            {
                uid: 1,
                name: '坂本龙一',
                avatar: 'http://localhost:4000/upload/6ca1a0d098ff195f2a3e72601.png',
                message: '最近过得还好么，疫情结束了，大家都还好吧'
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
                message: '好久不见，我在北京呢'
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