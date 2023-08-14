import { defineStore } from "pinia";
import { getAmountDay } from "../utils/Days";
import { format } from "date-fns";

let startDate = format(new Date(), "MMM dd, yyyy");
let endDate = format(new Date(), "MMM dd, yyyy");
startDate = new Date(startDate).getTime() - getAmountDay(50);
endDate = new Date(endDate).getTime() + getAmountDay(30);

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
