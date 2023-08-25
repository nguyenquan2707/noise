import { useUserStore } from '@/stores/userStore'
import { reactive  } from 'vue'

const ws = new WebSocket('ws://localhost:80/ws', useUserStore().token)

ws.msgs = reactive([])

ws.onopen = () => {
    console.log('链接成功')
}

ws.onmessage = msg => {
    msg = JSON.parse(msg.data)
    ws.msgs.push(msg)
}

ws.onerror = (e) => {
    console.log(e)
}

ws.sendMsg = (msg) => {
    ws.send(JSON.stringify(msg))
}

export default ws