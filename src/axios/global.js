import axios from "axios";
import { getFromLS, removeFromLS } from "../utils/localStorage";
import { globalRouter } from "../router/globalRouter";

// axios.defaults.baseURL = "http://localhost:5173";
// axios.defaults.baseURL = "http://165.227.216.202/";

// if request
axios.interceptors.request.use((request) => {
    const accessToken = getFromLS("token");
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
});

// if response
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status == 401) {
            removeFromLS("token");
            await globalRouter.router?.push({ name: "home" });
        }
        if (error.response.status == 404 || error.response.status == 403) {
            console.log(error.message);
        }
        throw error;
    }
);

export default axios;
