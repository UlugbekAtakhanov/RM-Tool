import axios from "axios";
import { useMessage } from "naive-ui";
import { getFromLS, removeFromLS } from "../utils/localStorage";

const message = useMessage();

// axios.defaults.baseURL = "http://localhost:5173";

// // if request
// axios.interceptors.request.use((request) => {
//     const accessToken = getFromLS("token");
//     if (accessToken) {
//         request.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return request;
// });

// // if response
// axios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         if (error.response.status == 401) {
//             removeFromLS("token");
//             await router.push("/login");
//         }
//         if (error.response.status == 400 || error.response.status == 403) {
//             message.error(error.response.statusText);
//         }
//         throw error;
//     }
// );

// export default axios;
