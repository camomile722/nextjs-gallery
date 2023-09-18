/* eslint-env node */
 module.exports = {
     i18n: {
         defaultLanguage: "de",
         fallbackLng: "de",
         defaultLocale: "de",
         locales: ["de", "en"],
     },
     debug: process.env.NODE_ENV === 'development',
 };
