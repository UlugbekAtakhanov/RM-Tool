import { defineStore } from "pinia";
import { addToLS, clearLS, getFromLS } from "../utils/localStorage";
import axios from "axios";

const loginUrl = "/api/v1/auth/user/login";
const registerInfoUrl = "/api/v1/auth/user/info";
const registerUrl = "/api/v1/auth/user/activation";

export const useUserStore = defineStore("user", {
    state: () => ({
        userIsLoading: false,
        user: getFromLS("user"),
        userInfo: "",
    }),

    getters: {},

    actions: {
        async userLogin({ data, router, message, loadingBar }) {
            this.userIsLoading = true;
            clearLS();
            try {
                const resp = await axios.post(loginUrl, data);
                router.push({ name: "home" });
                addToLS("token", resp.data.data.accessToken);
                addToLS("refresh", resp.data.data.refreshToken);
                addToLS("user", resp.data.data.roles);
                this.user = resp.data.data.roles;
                message.success("Submitted successfully!");
            } catch (error) {
                console.log(error);
                message.error(error.message);
            } finally {
                this.userIsLoading = false;
                loadingBar.finish();
            }
        },

        // get info of user before sign up
        async userRegisterInfo({ activationToken }) {
            try {
                const resp = await axios.post(registerInfoUrl, null, {
                    params: {
                        activationToken,
                    },
                });
                this.userInfo = resp.data.data;
            } catch (error) {
                console.log(error);
            }
        },

        // sign up
        async userRegister({ data, message, loadingBar, router }) {
            this.userIsLoading = true;
            try {
                const resp = await axios.post(registerUrl, data);
                console.log(resp);
                router.replace({ name: "login" });
                message.success("Submitted successfully! Please login!");
                loadingBar.finish();
            } catch (error) {
                console.log(error);
            } finally {
                this.userIsLoading = false;
            }
        },
    },
});
