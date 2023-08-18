import { defineStore } from "pinia";
import { daysInMilliseconds } from "../utils/Days";
import { format } from "date-fns";

let startDate = format(new Date(), "MMM dd, yyyy");
let endDate = format(new Date(), "MMM dd, yyyy");
startDate = new Date(startDate).getTime() - daysInMilliseconds(50);
endDate = new Date(endDate).getTime() + daysInMilliseconds(30);

export const useDateRangeStore = defineStore("date-range", {
    state: () => ({ startDate, endDate }),
    getters: {},
    actions: {
        updateDateRange(data) {
            this.startDate = data.startDate;
            this.endDate = data.endDate;
        },
    },
});
