import axios from "axios";
import { defineStore } from "pinia";

const getHolidaysUrl = "/api/v1/holidays";
const addHolidayUrl = "/api/v1/holidays";

export const useHolidaysListStore = defineStore("holidays-list", {
    state: () => ({
        holidayIsLoading: false,
        holidaysList: [],
        // holidaysList: [
        //     {
        //         id: 0,
        //         name: "Holiday 0",
        //         date: format(new Date("2023-07-22"), "EEE MMM dd, yyyy"),
        //     },
        //     {
        //         id: 1,
        //         name: "Holiday 1",
        //         date: format(new Date("2023-07-11"), "EEE MMM dd, yyyy"),
        //     },
        //     {
        //         id: 2,
        //         name: "Holiday 2",
        //         date: format(new Date("2023-07-12"), "EEE MMM dd, yyyy"),
        //     },
        //     {
        //         id: 3,
        //         name: "Holiday 3",
        //         date: format(new Date("2023-07-18"), "EEE MMM dd, yyyy"),
        //     },
        // ],
    }),

    getters: {},

    actions: {
        async getHolidays({ message, loadingBar }) {
            this.usersIsLoading = true;
            try {
                const resp = await axios.get(getHolidaysUrl);
                this.holidaysList = resp.data.data;
                loadingBar.finish();
            } catch (error) {
                console.log(error);
                loadingBar.error();
                message.error(error.message);
            } finally {
                this.usersIsLoading = false;
            }
        },

        async addNewHoliday({ data, message, loadingBar }) {
            this.holidayIsLoading = true;
            try {
                const resp = await axios.post(addHolidayUrl, data);
                if (resp.status === 201) {
                    this.holidaysList.push(resp.data.data);
                }
                loadingBar.finish();
                message.success("Holiday is created.");
            } catch (error) {
                console.log(error);
                loadingBar.error();
                message.error(error.message);
            } finally {
                this.holidayIsLoading = false;
            }
        },

        deleteHolidays(data) {
            this.holidaysList = this.holidaysList.filter((holiday) => !data.includes(holiday.id));
        },
    },
});
