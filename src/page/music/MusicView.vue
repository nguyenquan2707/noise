<template>
    <v-sheet>
        <v-card color="#000" theme="dark" >
            <div class="d-flex flex-no-wrap justify-space-between">
                <v-avatar class="ma-3" size="125" rounded="0" >
                    <v-img src="src/assets/image/5.png"></v-img>
                </v-avatar>
                <div>
                    <v-card-title class="text-h5">Merry Christmas Mr.Lawrence</v-card-title>

                    <v-card-subtitle>Ryuichi Sakamoto</v-card-subtitle>

                    <v-card-actions>
                        <v-btn class="ms-2" :icon="playing ? 'mdi mdi-play-pause' : 'mdi-play'" variant="text" @click="play" ></v-btn>
                    </v-card-actions>
                </div>
            </div>
        </v-card>
    </v-sheet>

    <audio ref="audio">
        <source src="@/assets/audio/MerryChristmasMrLawrence.mp3" type="audio/mp3">
    </audio>
</template>

<script>
export default {
    data() {
        return {
            playing: false,
        }
    },

    methods: {
        play() {
            this.playing = !this.playing
            if (this.playing) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
            
        }
    }
}
</script>