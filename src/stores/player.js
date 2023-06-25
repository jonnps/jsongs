import { defineStore } from 'pinia';
import { Howl } from 'howler';

import helpers from '@/includes/helpers';

export default defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
    rate: 1,
    muted: false
  }),
  actions: {
    async newSong(song) {
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

      this.currentSong = song;

      this.sound = new Howl({
        src: [song.url],
        html5: true
      });

      this.sound.play();

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress);
      });
    },
    async toggleAudio() {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.playing()) {
        this.sound.pause();
      } else {
        this.sound.play();
      }
    },
    progress() {
      this.seek = helpers.formatTime(this.sound.seek());
      this.duration = helpers.formatTime(this.sound.duration());

      this.playerProgress = ((this.sound.seek() / this.sound.duration()) * 100 || 0) + '%';

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress);
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) {
        return;
      }

      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - x;

      const percent = clickX / width;
      const seekTime = percent * this.sound.duration();

      this.sound.seek(seekTime);
      this.sound.once('seek', this.progress);
    },
    changeSeek(seconds) {
      if (!this.sound.playing) {
        return;
      }

      if (this.sound.seek() + seconds < 0 || this.sound.seek() + seconds > this.sound.duration()) {
        return;
      }

      this.sound.seek(this.sound.seek() + seconds);
      this.sound.once('seek', this.progress);
    },
    toggleMute() {
      if (!this.sound.playing) {
        return;
      }
      this.muted = !this.muted;
      this.sound.mute(!this.sound.mute());
    },
    changeRate() {
      if (!this.sound.playing) {
        return;
      }

      if (this.rate === 1) {
        this.rate = 1.5;
      } else if (this.rate === 1.5) {
        this.rate = 2;
      } else {
        this.rate = 1;
      }

      this.sound.rate(this.rate);
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }

      return false;
    }
  }
});
