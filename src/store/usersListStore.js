import { defineStore } from "pinia";

export const useUsersListStore = defineStore("users-list", {
    state: () => ({
        usersList: Array.from({ length: 46 }).map((_, index) => ({
            id: index,
            name: `Edward King ${index}`,
            role: `Super Admin ${index}`,
            coach: `Coach ${index}`,
            email: `test${index}@test.com`,
        })),
    }),
    getters: {},
    actions: {
        deleteUsers(data) {
            this.usersList = this.usersList.filter((user) => !data.includes(user.id));
        },
    },
});
