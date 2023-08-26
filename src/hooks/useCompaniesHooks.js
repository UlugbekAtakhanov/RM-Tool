import { useMutation, useQuery } from "@tanstack/vue-query";
import axios from "axios";

const addCompanyUrl = "";
const companiesUrl = "";

// get companies
export const useGetCompaniesListData = ({ loadingBar }) => {
    return useQuery(["companies"], () => axios.get(companiesUrl), {
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

// add company
export const useAddCompanyData = ({ message, loadingBar }) => {
    return useMutation((data) => axios.post(addCompanyUrl, data), {
        // onSuccess
        onSuccess: (data) => {
            console.log(data);
            message.success("Company is added.");
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
