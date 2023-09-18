module.exports = {
    stories: [
        "../src/stories/**/*.stories.mdx",
        "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        // {
        //     name: "@storybook/addon-essentials",
        //     options: {
        //         docs: false,
        //     },
        // },
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
        "@storybook/addon-storyshots",
        "@chakra-ui/storybook-addon",
        "storybook-addon-next",
    ],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
    },
    features: {
        previewMdx2: true,
        emotionAlias: false,
    },
    refs: {
        "@chakra-ui/react": { disable: true },
        "@chakra-ui/storybook-addon": { disable: true },
    },
    // webpack 5 solution to build storybook with i18n
    webpackFinal: (config) => {
        config.resolve.fallback = {
            fs: false,
            tls: false,
            net: false,
            module: false,
            path: require.resolve('path-browserify'),
        }
        return config;
    },
    // webpack 4 solution to build storybook with i18n
    // webpackFinal: (config) => {
    //     config.node = { fs: 'empty' }
    //     return config;
    // },
};
