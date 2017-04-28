const path       = require('path');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig, {
    output: {
        path:       path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename:   'app.js'
    }
});
