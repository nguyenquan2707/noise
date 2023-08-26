<template>
    <v-container v-resize="onResize" fluid>
        <v-row no-gutters class="bg-img-1 rounded-xl no-select">
            <v-col>
                <v-row no-gutters justify="center" class="text-h3 mt-10 font-weight-bold">
                    观音 · 听时
                </v-row>

                <v-row no-gutters justify="center" class="text-h6 mt-10 pb-12 font-weight-regular">
                    全球最大的坂本龙一作品回顾展
                </v-row>

                <template v-if="!isColum">
                    <v-row no-gutters style="padding-bottom:164px;">
                        <v-col>
                            <v-row no-gutters justify="center">
                                <v-col class="cover-width">
                                    <v-sheet class="ma-2 px-6 py-5 cover-item">
                                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                                    </v-sheet>
                                </v-col>
                                
                                <v-col class="cover-width">
                                    <v-sheet class="ma-2 px-6 py-5 cover-item">
                                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                            <v-row no-gutters justify="center">
                                <v-col class="cover-width">
                                    <v-sheet class="ma-2 px-6 py-5 cover-item">
                                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                                    </v-sheet>
                                </v-col>
                                <v-col class="cover-width">
                                    <v-sheet class="ma-2 px-6 py-5 cover-item">
                                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>

        <template v-if="isColum">
            <v-row no-gutters class="mt-2">
                <v-col>
                    <v-sheet class="px-6 py-5 cover-item bg-colum">
                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
                <v-col>
                    <v-sheet class="px-6 py-5 cover-item bg-colum">
                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
                <v-col>
                    <v-sheet class="px-6 py-5 cover-item bg-colum">
                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
                <v-col>
                    <v-sheet class="px-6 py-5 cover-item bg-colum">
                        <v-row no-gutters class="text-h6">坂本龙一是谁？</v-row>
                        <v-row no-gutters class="text-body-1">世界著名音乐家、电影配乐大师、世界著名音乐家</v-row>
                    </v-sheet>
                </v-col>
            </v-row>
        </template>

        <v-row>
            <v-col>面熟</v-col>
            <v-col class="bg-img-8"></v-col>
        </v-row>

    </v-container>
</template>

<script>

export default {
    data() {
        return {
            dialog: false,
            fileList: [],
            isColum: false,
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
        },
        onResize() {
            this.isColum = window.innerWidth < 1160
        }
    }
}
</script>