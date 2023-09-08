// import { useMutation, useQuery } from "@tanstack/vue-query";
// import axios from "axios";

// const addHolidayUrl = "";
// const holidaysUrl = "";

// get holidays
// export const useGetHolidaysListData = ({ loadingBar }) => {
//     return useQuery(["holidays"], () => axios.get(holidaysUrl), {
//         // onSuccess
//         onSuccess: (data) => {
//             console.log(data);
//             loadingBar.finish();
//         },

//         // onError
//         onError: (error) => {
//             console.log(error);
//             loadingBar.error();
//         },
//     });
// };

// add holiday
// export const useAddHolidayData = ({ message, loadingBar }) => {
//     return useMutation((data) => axios.post(addHolidayUrl, data), {
//         // onSuccess
//         onSuccess: (data) => {
//             console.log(data);
//             message.success("Holiday is added.");
//             loadingBar.finish();
//         },

//         // onError
//         onError: (error) => {
//             console.log(error);
//             message.error(error.message);
//             loadingBar.error();
//         },
//     });
// };
