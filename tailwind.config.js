const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Playwrite CU", "Open Sans", "sans-serif"],
        },
        extend: {},
    },
    plugins: [],
});
