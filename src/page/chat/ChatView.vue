<template>
	<p>在线人数: {{ online_num }}</p>

	<v-chip-group mandatory selected-class="text-primary" v-model="select_uid">
		<v-chip v-for="item in online_users" :value="item.uid">{{ item.phone || item.email }}</v-chip>
	</v-chip-group>

	<v-text-field v-model="text"></v-text-field>

	<v-btn @click="send">发送</v-btn>

	<p v-for="i in chats" :key="i.index">{{ i }}</p>
</template>

<script>
import ws from '@/utils/socket'
export default {
	data: () => ({
		text: '',
		select_uid: '',
	}),

	computed: {
		online_num() {
			return Object.values(ws.msgs).find(i => i.type === 'online')?.data.num
		},
		online_users() {
			return Object.values(ws.msgs).find(i => i.type === 'online')?.data.users
		},
		chats() {
			return Object.values(ws.msgs).filter(i => i.type === 'message').map(i => i.data)
		}
	},

	methods: {
		send() {
			ws.sendMsg({
				type: 'message',
				to: this.select_uid,
				data: this.text,
			})
		}
	}
}
</script>