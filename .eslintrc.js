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
    },
    parserOptions: {
        sourceType: 'module',
    },
};
