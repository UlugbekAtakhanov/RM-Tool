import axios from "axios";
import { defineStore } from "pinia";
import { getFromLS } from "../utils/localStorage";

const addUserUrl = "/api/v1/user/register";
const getUsersUrlAll = "/api/v1/user/all";
const getUsersUrl = "/api/v1/user";
const deleteUserUrl = "/api/v1/user";

const getResourcesUrl = "/api/v1/resource";
const addResourceUrl = "/api/v1/resource";

export const useUsersListStore = defineStore("users-list", {
    state: () => ({
        usersIsLoading: false,
        usersList: [],
        resourceList: [],
    }),

    getters: {},

    actions: {
        async getUsers({ message, loadingBar }) {
            const user = getFromLS("user");
            const url = user.includes("SUPER_SUPER_ADMIN") ? getUsersUrlAll : getUsersUrl;
            this.usersIsLoading = true;
            try {
                const resp = await axios.get(url);
                this.usersList = resp.data.data.data;
                loadingBar.finish();
            } catch (error) {
                console.log(error);
                loadingBar.error();
                message.error(error.message);
            } finally {
                this.usersIsLoading = false;
            }
        },

        async addNewUser({ data, message, loadingBar, closeModal }) {
            this.usersIsLoading = true;
            try {
                const resp = await axios.post(addUserUrl, data);
                if (resp.status === 201) {
                    this.usersList.push(resp.data.data);
                }
                closeModal();
                loadingBar.finish();
                message.success("User is created.");
            } catch (error) {
                console.log(error);
                if (error.response.status === 409) {
                    message.error("Email is already exist.");
                }
                loadingBar.error();
            } finally {
                this.usersIsLoading = false;
            }
        },

        async getResources({ message, loadingBar }) {
            this.usersIsLoading = true;
            try {
                const resp = await axios.get(getResourcesUrl);
                // console.log(resp.data.data.data);
                this.resourceList = resp.data.data.data;
                loadingBar.finish();
            } catch (error) {
                console.log(error);
                loadingBar.error();
                message.error(error.message);
            } finally {
                this.usersIsLoading = false;
            }
        },

        async addNewResource({ data, message, loadingBar, closeModal }) {
            this.usersIsLoading = true;
            try {
                const resp = await axios.post(addResourceUrl, data);
                // console.log(resp.data.data);
                if (resp.status === 201) {
                    this.resourceList.push(resp.data.data);
                }
                closeModal();
                loadingBar.finish();
                message.success("Resource is created.");
            } catch (error) {
                console.log(error);
                if (error.response.status === 409) {
                    message.error("Email is already used.");
                }
                loadingBar.error();
            } finally {
                this.usersIsLoading = false;
            }
        },

        deleteUsers({ userIdList, message, loadingBar }) {
            userIdList.forEach(async (userId) => {
                try {
                    await axios.delete(deleteUserUrl + `?userId=${userId}`);
                    const userName = this.usersList.find((user) => user.id === userId);
                    this.usersList = this.usersList.filter((user) => user.id !== userId);
                    loadingBar.finish();
                    message.success(`${userName.firstName} ${userName.lastName} is deleted.`);
                } catch (error) {
                    console.log(error.message);
                    loadingBar.error();
                    message.error(error.message);
                }
            });
        },
    },
});
