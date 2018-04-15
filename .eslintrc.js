module.exports = {
    extends: 'airbnb-base',
    plugins: ['import'],
    rules: {
        indent: ['error', 4],
        // Recommend not to leave any console.log in your code
        // Use console.error, console.warn and console.info instead
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],
        // Every time we can't de-structure an object or array,
        //  as sometimes we want to reference object and array
        'prefer-destructuring': 'off',
    },
    parserOptions: {
        sourceType: 'module',
    },
};
