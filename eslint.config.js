const {defineConfig} = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')

module.exports = defineConfig([
    ...expoConfig,
    {
        ignores: ['dist/**'],
        rules: {
            indent: ['error', 4, {SwitchCase: 1}],
            semi: ['error', 'never'],
            '@typescript-eslint/semi': ['error', 'never'],
            'no-extra-semi': 'error',
            curly: ['error', 'all']
        }
    }
])
