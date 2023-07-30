import { defineStore } from "pinia";

export const useDateRangeStore = defineStore("project-list", {
    state: () => [
        {
            title: "Project1",
            ye: "31Dec",
            scope: "A+R",
            manager: "Julia",
            team: ["Sevara", "Bimple"],
            phase: [
                { id: 1, color: "green", from: "July 5, 2023", to: "July 10, 2023" },
                { id: 2, color: "red", from: "July 11, 2023", to: "July 14, 2023" },
            ],
        },
        {
            title: "Project2",
            ye: "31Dec",
            scope: "A",
            manager: "Kanza",
            team: ["Jing"],
            phase: [
                { id: 3, color: "yellow", from: "July 15, 2023", to: "July 28, 2023" },
                { id: 4, color: "lightblue", from: "July 02, 2023", to: "July 06, 2023" },
            ],
        },
    ],
    getters: {},
    actions: {},
});
