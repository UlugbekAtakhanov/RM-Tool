import axios from "axios";
import { defineStore } from "pinia";

const getProjectsListUrl = "/api/v1/project";
const createProjectUrl = "/api/v1/project";
const getResourcesListWithPorjectsUrl = "/api/v1/resource/with_projects";

export const useProjectListStore = defineStore("projects-list", {
    state: () => ({
        projectIsLoading: false,
        projectList: [],
        resourcesWithProjecstsList: [],
        // projectList: [
        //     {
        //         id: 0,
        //         title: "Project0",
        //         ye: "31Dec",
        //         scope: "A+R",
        //         manager: "Julia",
        //         team: ["Sevara", "Bimple"],
        //         color: "#0ea5e9",
        //         from: "July 7, 2023",
        //         to: "July 12, 2023",
        //         duration: 5,
        //     },
        //     {
        //         id: 1,
        //         title: "Project1",
        //         ye: "31Dec",
        //         scope: "A+R",
        //         manager: "Julia",
        //         team: ["Sevara", "Bimple"],
        //         color: "#e11d48",
        //         from: "July 11, 2023",
        //         to: "July 14, 2023",
        //         duration: 3,
        //     },
        //     {
        //         id: 2,
        //         title: "Project2",
        //         ye: "31Dec",
        //         scope: "A",
        //         manager: "Kanza",
        //         team: ["Jing"],
        //         color: "#16a34a",
        //         from: "July 14, 2023",
        //         to: "July 20, 2023",
        //         duration: 6,
        //     },
        //     {
        //         id: 3,
        //         title: "Project3",
        //         ye: "31Dec",
        //         scope: "A+R",
        //         manager: "Kent",
        //         team: ["Nan"],
        //         color: "cyan",
        //         from: "July 10, 2023",
        //         to: "July 18, 2023",
        //         duration: 8,
        //     },
        //     {
        //         id: 4,
        //         title: "Project3",
        //         ye: "31Dec",
        //         scope: "A+R",
        //         manager: "Kent",
        //         team: ["Nan"],
        //         color: "teal",
        //         from: "July 10, 2023",
        //         to: "July 31, 2023",
        //         duration: 21,
        //     },
        // ],
        // resourceList: [
        //     {
        //         id: 1,
        //         name: "Resource1 ",
        //         position: "M",
        //         coach: "Greg H",
        //         projects: [
        //             { id: 1, name: "Project1", hours: 10, color: "brown", from: "July 5, 2023", to: "July 10, 2023", duration: 5 },
        //             { id: 2, name: "Project2", hours: 20, color: "red", from: "July 11, 2023", to: "July 14, 2023", duration: 3 },
        //             { id: 3, name: "Project3", hours: 30, color: "yellow", from: "July 15, 2023", to: "July 28, 2023", duration: 13 },
        //             { id: 6, name: "Project6", hours: 60, color: "teal", from: "July 21, 2023", to: "July 25, 2023", duration: 4 },
        //         ],
        //     },
        //     {
        //         id: 2,
        //         name: "Resource2",
        //         position: "Sennior Asso.",
        //         coach: "Julia",
        //         projects: [
        //             { id: 3, name: "Project3", hours: 30, color: "yellow", from: "July 15, 2023", to: "July 28, 2023", duration: 13 },
        //             { id: 4, name: "Project4", hours: 40, color: "orange", from: "July 02, 2023", to: "July 06, 2023", duration: 4 },
        //         ],
        //     },
        //     {
        //         id: 3,
        //         name: "Resource3",
        //         position: "ITGC",
        //         coach: "Timur",
        //         projects: [
        //             { id: 2, name: "Project2", hours: 20, color: "red", from: "July 11, 2023", to: "July 14, 2023", duration: 3 },
        //             { id: 5, name: "Project5", hours: 50, color: "cyan", from: "July 10, 2023", to: "July 19, 2023", duration: 9 },
        //             { id: 6, name: "Project6", hours: 60, color: "teal", from: "July 21, 2023", to: "July 25, 2023", duration: 4 },
        //         ],
        //     },
        // ],
    }),

    getters: {
        modifiedProjectList() {
            return this.projectList.map((project) => {
                const partner = project.resources.find((item) => item.role === "PARTNER")?.resourceFullName ?? "";
                const qrp = project.resources.find((item) => item.role === "QRP")?.resourceFullName ?? "";
                const director = project.resources.find((item) => item.role === "DIRECTOR")?.resourceFullName ?? "";
                const manager = project.resources.find((item) => item.role === "MANAGER")?.resourceFullName ?? "";
                const key_staff = project.resources.find((item) => item.role === "KEY_STAFF")?.resourceFullName ?? "";
                const staff = project.resources.find((item) => item.role === "STAFF")?.resourceFullName ?? "";
                return { ...project, partner, qrp, director, manager, key_staff, staff };
            });
        },
    },

    actions: {
        async getProjects() {
            this.projectIsLoading = true;
            try {
                const resp = await axios.get(getProjectsListUrl);
                // console.log(resp.data.data.data);
                this.projectList = resp.data.data.data;
            } catch (error) {
                console.log(error);
            } finally {
                this.projectIsLoading = false;
            }
        },

        async createProject({ data, loadingBar, message, closeModal }) {
            this.projectIsLoading = true;
            try {
                const resp = await axios.post(createProjectUrl, data);
                this.projectList.push(resp.data.data);
                closeModal();
                message.success("Project is created successfully!");
            } catch (error) {
                console.log(error);
                message.error(error.message);
            } finally {
                this.projectIsLoading = false;
                loadingBar.finish();
            }
        },

        async getResourcesWithProjects({ startDate, endDate }) {
            this.projectIsLoading = true;
            try {
                const resp = await axios.get(getResourcesListWithPorjectsUrl, {
                    params: {
                        startDate,
                        endDate,
                    },
                });
                // console.log(resp.data.data.data);
                this.resourcesWithProjecstsList = resp.data.data.data;
            } catch (error) {
                console.log(error);
            } finally {
                this.projectIsLoading = false;
            }
        },
    },
});
