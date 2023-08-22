import { defineStore } from "pinia";

export const useCompaniesListStore = defineStore("companies-list", {
    state: () => ({
        companiesList: Array.from({ length: 46 }).map((_, index) => ({
            id: index,
            name: `Edward King ${index}`,
            email: `test${index}@test.com`,
            address: `Address ${index}`,
            phone: `123 123 123 ${index}`,
            "contact-first-name": `Contact Fname ${index}`,
            "contact-last-name": `Contact Lname ${index}`,
        })),
    }),
    getters: {},
    actions: {
        deleteCompanies(data) {
            this.companiesList = this.companiesList.filter((companie) => !data.includes(companie.id));
        },
    },
});
