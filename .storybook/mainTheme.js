// .storybook/YourTheme.js

import { create } from '@storybook/theming';

export default create({
    base: 'light',
    colorPrimary: 'black',
    colorSecondary: 'black',

    // Typography
    fontBase:
        '"Poppins", system-ui, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontCode: 'monospace',

    // Text colors
    textColor: 'black',
    textInverseColor: 'rgba(255,255,255,0.9)',

    // Toolbar default and active colors
    barTextColor: 'white',
    barSelectedColor: 'white',
    barBg: 'black',

    brandTitle: 'FrontendIsKing - Template',
    brandUrl: 'https://frontendisking.de/',
    // brandImage: 'customImage',
    brandTarget: '_self',
});
