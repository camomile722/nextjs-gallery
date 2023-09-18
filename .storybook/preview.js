import { theme } from "../src/theme/theme";
import { ViewportSettings } from "./viewportSettings";
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {namespaces} from '../src/utils/i18nextNS';
import CommonEN from '../public/locales/en/common.json';
import CommonDE from '../public/locales/de/common.json';
export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    chakra: {
        theme,
    },
    viewport: {
        viewports: { ...ViewportSettings },
    },
    layout: "fullscreen",
    options: {
        storySort: (a, b) =>
            a[1].kind === b[1].kind
                ? 0
                : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    },
};

export const decorators = [
    (Story)=>{
        i18n.use(initReactI18next).init({
            lng: 'de',
            fallbackLng: 'de',

            // have a common namespace used around the full app
            ns: namespaces,
            defaultNS: 'common',

            interpolation: {
                escapeValue: false,
            },

            resources: { de: {
                common: CommonDE
            }, en: {
                common: CommonEN
                }},
        }).then()

        return <Story />
    },
]
