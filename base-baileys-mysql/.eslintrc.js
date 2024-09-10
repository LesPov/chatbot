module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'module', // Permite el uso de import/export
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['bot-whatsapp'],
    extends: ['plugin:bot-whatsapp/recommended'],
}
