import { format } from "date-fns";
import { defineStore } from "pinia";

export const useHolidaysStore = defineStore("holidays-list", {
    state: () => ({
        holidaysList: [
            {
                id: 0,
                name: "Holiday 0",
                date: format(new Date("2023-07-06"), "EEE MMM dd, yyyy"),
            },
            {
                id: 1,
                name: "Holiday 1",
                date: format(new Date("2023-07-11"), "EEE MMM dd, yyyy"),
            },
            {
                id: 2,
                name: "Holiday 2",
                date: format(new Date("2023-07-12"), "EEE MMM dd, yyyy"),
            },
            {
                id: 3,
                name: "Holiday 3",
                date: format(new Date("2023-07-08"), "EEE MMM dd, yyyy"),
            },
        ],
    }),
    getters: {},
    actions: {
        deleteHolidays(data) {
            this.holidaysList = this.holidaysList.filter((holiday) => !data.includes(holiday.id));
        },
    },
});
