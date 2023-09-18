const config = {
    transformIgnorePatterns: [
        "!node_modules/"
    ],
    testEnvironment: "jsdom",
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|svg|png|jpg|webp|ttf|woff|woff2)$": "<rootDir>/src/testing/mock.js"
    },
    testMatch: [
        "**/__tests__/**/*.test.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    testPathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/cypress/"
    ]
}
