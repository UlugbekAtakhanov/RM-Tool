import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        user: "super-super-admin",
        isAuth: false,
    }),
    getters: {},
    actions: {
        setUser(data) {
            this.user = data;
        },
    },
});
