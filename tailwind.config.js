/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0369a1",
                secondary: "#0284c7",
                // primary: "#672CC7",
            },
        },
    },
    plugins: [],
};
