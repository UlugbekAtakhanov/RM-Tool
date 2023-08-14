import { useMutation } from "@tanstack/vue-query";

const registerAdminUrl = "/api/v1/auth/admin/register";
const registerUserUrl = "/api/v1/auth/user/register";

const register = (data) => {
    console.log(data.firstName);
    console.log(data.lastName);
};

export const useRegisterData = () => {
    return useMutation((data) => register(data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
        },

        // onError
        onError: (error) => {
            console.log(error);
        },
    });
};
