import { defineStore } from "pinia";

export const useProjectListStore = defineStore("project-list", {
    state: () => ({
        projectList: [
            {
                id: 1,
                title: "Project1",
                ye: "31Dec",
                scope: "A+R",
                manager: "Julia",
                team: ["Sevara", "Bimple"],
                phase: [
                    { id: 1, color: "brown", from: "July 5, 2023", to: "July 10, 2023", duration: 5 },
                    { id: 2, color: "red", from: "July 11, 2023", to: "July 14, 2023", duration: 3 },
                ],
            },
            {
                id: 2,
                title: "Project2",
                ye: "31Dec",
                scope: "A",
                manager: "Kanza",
                team: ["Jing"],
                phase: [
                    { id: 3, color: "yellow", from: "July 15, 2023", to: "July 28, 2023", duration: 13 },
                    { id: 4, color: "orange", from: "July 02, 2023", to: "July 06, 2023", duration: 4 },
                ],
            },
            {
                id: 3,
                title: "Project3",
                ye: "31Dec",
                scope: "A+R",
                manager: "Kent",
                team: ["Nan"],
                phase: [
                    { id: 5, color: "cyan", from: "July 10, 2023", to: "July 19, 2023", duration: 9 },
                    { id: 6, color: "teal", from: "July 21, 2023", to: "July 25, 2023", duration: 4 },
                ],
            },
        ],
    }),
    getters: {},
    actions: {},
});
