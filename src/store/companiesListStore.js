import axios from "axios";
import { defineStore } from "pinia";
import { getFromLS } from "../utils/localStorage";

const addCompanyUrl = "/api/v1/company";
const getCompaniesUrlAll = "/api/v1/company/all";
const getCompaniesUrl = "/api/v1/company";
const deleteCompanyUrl = "/api/v1/company";

export const useCompaniesListStore = defineStore("companies-list", {
    state: () => ({
        companyIsLoading: false,
        companiesList: [],
    }),

    getters: {},

    actions: {
        // create a company
        async createCompany({ data, loadingBar, message, closeModal }) {
            this.companyIsLoading = true;
            try {
                const resp = await axios.post(addCompanyUrl, data);
                if (resp.status === 201) {
                    this.companiesList.push(resp.data.data);
                }
                closeModal();
                loadingBar.finish();
                message.success("Company is created.");
            } catch (error) {
                console.log(error);
                loadingBar.error();
                message.error(error.message);
            } finally {
                this.companyIsLoading = false;
            }
        },

        // get companies list
        async getCompaniesList({ loadingBar, message }) {
            const user = getFromLS("user");
            const url = user.includes("SUPER_SUPER_ADMIN") ? getCompaniesUrlAll : getCompaniesUrl;
            this.companyIsLoading = true;
            try {
                const resp = await axios.get(url);
                this.companiesList = resp.data.data.data;
                loadingBar.finish();
            } catch (error) {
                console.log(error);
                loadingBar.error();
                message.error(error.message);
            } finally {
                this.companyIsLoading = false;
            }
        },

        // delete a company or companies
        deleteCompanies({ companiesIdList, message, loadingBar }) {
            companiesIdList.forEach(async (companyId) => {
                try {
                    await axios.delete(deleteCompanyUrl + `?companyId=${companyId}`);
                    const companyName = this.companiesList.find((c) => c.id === companyId);
                    this.companiesList = this.companiesList.filter((company) => company.id !== companyId);
                    loadingBar.finish();
                    message.success(`${companyName.name} is deleted.`);
                } catch (error) {
                    console.log(error.message);
                    loadingBar.error();
                    message.error(error.message);
                }
            });
        },
    },
});
