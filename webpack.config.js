const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
       rules: [{
           loader: 'babel-loader',
    query: {
    presets: [
        'es2015',
        'react'
    ]}},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'style-loader', 'css-loader']
            }
        ]
    }
};

module.exports = config;