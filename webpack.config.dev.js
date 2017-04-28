const path       = require('path');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig, {
    output: {
        path:       path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/dist/',
        filename:   'app.js'
    },
    devtool: 'source-map'
});
