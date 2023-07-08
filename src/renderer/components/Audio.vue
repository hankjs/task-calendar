<template>
  <div>
    <audio
      id="audio-long-break"
      ref="audioLongBreak"
      :src="audioLongBreakUrl"
    ></audio>
    <audio
      id="audio-short-break"
      ref="audioShortBreak"
      :src="audioShortBreakUrl"
    ></audio>
    <audio id="audio-work" ref="audioWork" :src="audioWorkUrl"></audio>
    <audio id="audio-tick" ref="audioTick" :src="audioTickUrl"></audio>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import audioLongBreakUrl from "@/assets/audio/alert-long-break.mp3";
import audioTickUrl from "@/assets/audio/alert-short-break.mp3";
import audioShortBreakUrl from "@/assets/audio/alert-work.mp3";
import audioWorkUrl from "@/assets/audio/tick.mp3";

const audioLongBreak = ref<HTMLAudioElement | null>(null);
const audioTick = ref<HTMLAudioElement | null>(null);
const audioShortBreak = ref<HTMLAudioElement | null>(null);
const audioWork = ref<HTMLAudioElement | null>(null);

// computed: {
//     // store getters
//     currentRound() {
//       return this.$store.getters.currentRound
//     },
//     tickSounds() {
//       return this.$store.getters.tickSounds
//     },
//     tickSoundsDuringBreak() {
//       return this.$store.getters.tickSoundsDuringBreak
//     },
//     volume() {
//       return this.$store.getters.volume * 0.01
//     }
//   },

onMounted(() => {
  // Volume attribute on audio is not supported
  // and must be set programmatically.
  // EventBus.$on('ready-long-break', () => {
  //   this.$refs['audio-long-break'].volume = this.volume
  //   this.$refs['audio-long-break'].play()
  // })
  // EventBus.$on('ready-short-break', () => {
  //   this.$refs['audio-short-break'].volume = this.volume
  //   this.$refs['audio-short-break'].play()
  // })
  // EventBus.$on('timer-tick', () => {
  //   this.$refs['audio-tick'].volume = this.volume
  //   const isBreak = this.currentRound === 'short-break' || this.currentRound === 'long-break'
  //   if (isBreak && !this.tickSoundsDuringBreak) return
  //   if (!isBreak && !this.tickSounds) return
  //   this.$refs['audio-tick'].play()
  // })
  // EventBus.$on('ready-work', () => {
  //   this.$refs['audio-work'].volume = this.volume
  //   this.$refs['audio-work'].play()
  // })
});
</script>
