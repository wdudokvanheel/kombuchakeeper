// eslint.config.js  (root of your project)
const {defineConfig} = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
    ...expoConfig,
    {
        ignores: ['dist/**'],
        rules: {
            indent: ['error', 4, {SwitchCase: 1}],
        },
    },
]);
