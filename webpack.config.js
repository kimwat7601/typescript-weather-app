/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        entry: {
            bundle: './src/app.ts'
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        resolve: {
            alias: {
                '@config': path.resolve(__dirname, isDevelopment 
                    ? './src/config/config.dev.js' 
                    : './src/config/config.prod.js')
            },
            extensions: ['.ts', '.js']
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist')
            },
            open: true
        },
        module: {
            rules: [
                {
                    loader: 'ts-loader',
                    test: /\.ts$/
                }
            ]
        }
    }
}