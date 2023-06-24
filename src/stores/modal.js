import { defineStore } from 'pinia';

export default defineStore('modal', {
  state: () => ({
    isOpen: false,
    redirectPath: null
  }),
  actions: {
    show(path = null) {
      this.isOpen = true;
      if (path) {
        this.redirectPath = path;
      }
    },
    hide() {
      this.isOpen = false;
    }
  }
});
