/* eslint-env node */
const path = require("path");
module.exports = {
    i18n: {
        locales: ["default", "en", "de"],
        defaultLocale: "default",
        localeDetection: false,
    },
    trailingSlash: true,
    localePath: path.resolve("./public/locales"),
};
