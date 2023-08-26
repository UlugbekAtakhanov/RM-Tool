import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";

const addUserUrl = "";
const usersUrl = "";

// get users
export const useGetUsersListData = ({ loadingBar }) => {
    return useQuery(["users"], () => axios.get(usersUrl), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            loadingBar.finish();
        },

        // onError
        onError: (error) => {
            console.log(error);
            loadingBar.error();
        },
    });
};

// add user
export const useAddUserData = ({ message, loadingBar }) => {
    return useMutation((data) => axios.post(addUserUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("User is added.");
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
