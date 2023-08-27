<template>
    <v-container v-resize="onResize" fluid fill-height>
        <v-row no-gutters class="bg-img-1 rounded-xl no-select" align="center" :style="isColum ? '' : 'min-height:760px;'">
            <v-col cols="12">
                <v-row no-gutters justify="center" class="text-h3 mt-10 font-weight-bold"> 观音 · 听时 </v-row>

                <v-row no-gutters justify="center" class="text-h6 my-10 font-weight-regular"> 全球最大的坂本龙一作品回顾展 </v-row>

                <template v-if="!isColum">
                    <v-row no-gutters>
                        <v-col cols="6" v-for="i, index in coverList" :key="index" :class="index % 2 === 0 ? 'd-flex justify-end' : ''">
                            <v-sheet v-ripple class="ma-2 px-6 py-5 cover-item cover-inner" @click="scrollToA(index)">
                                <div no-gutters class="text-h6">{{ i.title }}</div>
                                <div no-gutters class="text-body-1">{{ i.desc }}</div>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>

        <template v-if="isColum">
            <v-row v-for="i,index in coverList" :key="index" no-gutters class="mt-2 no-select">
                <v-col>
                    <v-sheet class="px-6 py-5 cover-item bg-colum" @click="scrollToA(index)">
                        <v-row no-gutters class="text-h6">{{ i.title }}</v-row>
                        <v-row no-gutters class="text-body-1">{{ i.desc }}</v-row>
                    </v-sheet>
                </v-col>
            </v-row>
        </template>

        <v-row no-gutters v-scroll="onScroll">
            <v-col :cols="isMobile ? 12 : 6" class="pt-2">
                <v-sheet ref="cover_1" class="mr-4 mt-0 px-4 rounded-t-xl d-flex flex-column justify-space-around hv-100">
                    <div>
                        <h1 class="text-center">{{ config.PARA[0].title }}</h1>
                        <p class="mt-4">{{ config.PARA[0].desc }}</p>
                    </div>
                </v-sheet>

                <v-sheet ref="cover_2" class="mr-4 px-4 d-flex flex-column justify-space-around hv-100">
                    <div>
                        <h1 class="text-center">{{ config.PARA[1].title }}</h1>
                        <p class="mt-4">{{ config.PARA[1].desc }}</p>
                    </div>
                </v-sheet>

                <v-sheet ref="cover_3" class="mr-4 px-4 d-flex flex-column justify-space-around hv-100">
                    <div>
                        <h1 class="text-center">{{ config.PARA[2].title }}</h1>
                        <p class="mt-4">{{ config.PARA[2].desc }}</p>
                    </div>
                </v-sheet>

                <v-sheet ref="cover_4" class="mr-4 px-4 rounded-b-xl d-flex flex-column justify-space-around hv-100">
                    <div>
                        <h1 class="text-center">{{ config.PARA[3].title }}</h1>
                        <p class="mt-4">{{ config.PARA[3].desc }}</p>
                    </div>
                </v-sheet>
            </v-col>
            <v-col :cols="isMobile ? 12 : 6" class="pt-2">
                <div :class="activeImg" class="bg-img-2 rounded-xl"></div>
            </v-col>
        </v-row>

        <v-row style="min-height:160px;" align="end">
            <v-col>
                <v-footer class="mt-4 rounded-xl bg-indigo-lighten-1 text-center d-flex flex-column" >
                    <div>
                        <v-btn v-for="icon in icons" :key="icon" class="mx-4" :icon="icon" variant="text"></v-btn>
                    </div>

                    <div class="pt-0">
                        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </div>

                    <v-divider></v-divider>

                    <div> {{ new Date().getFullYear() }} — <strong>Noise</strong> </div>
                </v-footer>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import config from '@/config'
import { useAppStore } from '@/stores/appStore'

export default {
    data() {
        return {
            config,
            isColum: false,
            activeImg: 'cover-img-1',
            coverList: [
                {
                    title: '坂本龙一',
                    desc: '世界著名音乐家、电影配乐大师、世界著名音乐家',
                },
                {
                    title: '个人生活',
                    desc: '世界著名音乐家、电影配乐大师、世界著名音乐家',
                },
                {
                    title: '奖项和提名',
                    desc: '世界著名音乐家、电影配乐大师、世界著名音乐家',
                },
                {
                    title: '社会活动',
                    desc: '世界著名音乐家、电影配乐大师、世界著名音乐家',
                },
            ],
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
            ],
        }
    },

    computed: {
        isMobile() {
            return useAppStore().isMobile
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
        },
        onScroll(e) {
            const curTop = e.srcElement.scrollingElement.scrollTop
            const top2 = this.$refs.cover_2.$el.offsetTop - 65
            const top3 = this.$refs.cover_3.$el.offsetTop - 65
            const top4 = this.$refs.cover_4.$el.offsetTop - 65
            if (curTop < top2) {
                if (this.activeImg === 'cover-img-1') return
                this.activeImg = 'cover-img-1'
            }
            if (curTop > top2 && curTop < top3) {
                if (this.activeImg === 'cover-img-2') return
                this.activeImg = 'cover-img-2'
            }
            if (curTop > top3 && curTop < top4) {
                if (this.activeImg === 'cover-img-3') return
                this.activeImg = 'cover-img-3'
            }
            if (curTop > top4) {
                if (this.activeImg === 'cover-img-4') return
                this.activeImg = 'cover-img-4'
            }
        },
        scrollToA(index) {
            let offsetTop = this.$refs.cover_1.$el.offsetTop
            if (index === 1) {
                offsetTop = this.$refs.cover_2.$el.offsetTop
            }
            if (index === 2) {
                offsetTop = this.$refs.cover_3.$el.offsetTop
            }
            if (index === 3) {
                offsetTop = this.$refs.cover_4.$el.offsetTop
            }
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            })
        }
    }
}
</script>