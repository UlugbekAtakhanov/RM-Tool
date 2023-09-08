import { defineStore } from "pinia";

export const useShowModalStore = defineStore("modal", {
    state: () => ({
        showModal: false,
    }),

    getters: {},

    actions: {
        closeModal() {
            this.showModal = false;
        },
        openModal() {
            this.showModal = true;
        },
    },
});
