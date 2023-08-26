import { useMutation } from "@tanstack/vue-query";
import axios from "axios";

const loginUrl = "/api/v1/auth/user/login";
const refreshToken = "/api/v1/auth/user/token/refresh";

// sign up handler
export const useRegisterData = ({ message, loadingBar, router }) => {
    return useMutation((data) => axios.post(loginUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("Please login");
            loadingBar.finish();
            router.push({ name: "login" });
        },

        // onError
        onError: (error) => {
            console.log(error);
            message.error(error.message);
            loadingBar.error();
        },
    });
};

// login handler
export const useLoginData = ({ message, loadingBar }) => {
    return useMutation((data) => axios.post(loginUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("Submitted successfully!");
            loadingBar.finish();
        },

        // onError
        onError: (error) => {
            console.log(error);
            message.error(error.message);
            loadingBar.error();
        },
    });
};

// forgot password handler
export const useForgotPasswordData = ({ message, loadingBar }) => {
    return useMutation((data) => axios.post(loginUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("Check your email");
            loadingBar.finish();
        },

        // onError
        onError: (error) => {
            console.log(error);
            message.error(error.message);
            loadingBar.error();
        },
    });
};

// reset password handler
export const useResetPasswordData = ({ message, loadingBar, router }) => {
    return useMutation((data) => axios.post(loginUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("Password is resetted!");
            loadingBar.finish();
            router.push({ name: "login" });
        },

        // onError
        onError: (error) => {
            console.log(error);
            message.error(error.message);
            loadingBar.error();
        },
    });
};
