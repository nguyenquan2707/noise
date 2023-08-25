<template>
    <div class="home">
        <div class="home-item bg-img-1 rounded-xl">
            <div class="card-wrap px-14">
                <div class="card">
                    <div class="text-center text-h3 font-weight-bold">观音 · 听时</div>
                    <div class="text-center text-h6 pt-6 pb-12 font-weight-regular">坂本龙一全球最大的作品回顾展</div>
                    <div class="hero no-select">
                        <v-sheet class="hero-item pa-6 rounded-xl h-100 bg-color-hover">
                            <div class="text-h5 font-weight-bold">坂本龙一是谁？</div>
                            <div>世界著名音乐家、电影配乐大师、世界著名音乐家</div>
                        </v-sheet>
                        <v-sheet v-ripple class="hero-item pa-6 rounded-xl h-100 bg-color-hover">
                            <div class="text-h5 font-weight-bold">坂本龙一是谁？</div>
                            <div>世界著名音乐家、电影配乐大师、社会活动家</div>
                        </v-sheet>

                        <v-sheet class="hero-item pa-6 rounded-xl h-100 bg-color-hover">
                            <div class="text-h5 font-weight-bold">坂本龙一是谁？</div>
                            <div>世界著名音乐家、电影配乐大师、社会活动家</div>
                        </v-sheet>
                        <v-sheet class="hero-item pa-6 rounded-xl h-100 bg-color-hover">
                            <div class="text-h5 font-weight-bold">坂本龙一是谁？</div>
                            <div>世界著名音乐家、电影配乐大师、社会活动家</div>
                        </v-sheet>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <v-col>
                列表
            </v-col>
            <v-col class="bg-img-2">

            </v-col>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            fileList: [],
        }
    },

    methods: {
        logout() {
            localStorage.removeItem('token')
            window.location.href = '#/login'
        },
        afterRead(file) {
            const format = new FormData()
            format.append('file', file.file)
            this.$http.post('/user/setAvatar', format)
        }
    }
}
</script>

<style scoped>
.card-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
    min-height: 30rem;
    max-width: 1200px;
    margin: 0 auto;
}
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.hero {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-gap: 8px;
    gap: 8px;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, 1fr);
}
.hero-item {
    grid-column: span 3;
    display: grid;
    grid-gap: 8px;
}
</style>