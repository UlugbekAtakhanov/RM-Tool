import { format } from "date-fns";
import { defineStore } from "pinia";
import { getAmountDay } from "../utils/Days";

export const useDateRangeStore = defineStore("date-range", {
    state: () => ({ startDate: "", endDate: "" }),
    getters: {},
    actions: {
        initialDateRange() {
            this.startDate = format(new Date().getTime() - getAmountDay(30), "dd MMM yyyy");
            this.endDate = format(new Date().getTime() + getAmountDay(30), "dd MMM yyyy");
        },
        updateDateRange(data) {
            this.startDate = data.startDate;
            this.endDate = data.endDate;
        },
    },
});
