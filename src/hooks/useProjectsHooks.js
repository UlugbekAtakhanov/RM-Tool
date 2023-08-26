import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";

const addProjectUrl = "";
const projectsUrl = "";

// get users
export const useGetProjectsListData = ({ loadingBar }) => {
    return useQuery(["projects"], () => axios.get(projectsUrl), {
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
export const useAddProjectData = ({ message, loadingBar }) => {
    return useMutation((data) => axios.post(addProjectUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("Project is added.");
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
