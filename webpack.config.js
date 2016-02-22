const path = require('path'),
    fs = require('fs'),
    config = require('./config.js'),
    basePath = config.basePath,
    buildPath = config.buildPath,
    webpack = require("webpack"),
    webpackBuidPath = path.resolve(basePath + '/js', '__build');
module.exports = {
    buildPath: webpackBuidPath,
    entry: genEntries(),
    output: {
        path: webpackBuidPath,
        filename: "[name].js"
    },
    resolve: {
       
        alias: {
            'jquery':path.resolve(basePath, 'js') + '/source/common/jquery'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ]
};


function genEntries() {
   

 console.log('-----'+process.cwd());
    var jsDir = path.resolve(basePath + '/js/source', 'entry');
    var names = fs.readdirSync(jsDir);
    var map = {};
    names.forEach(function(name) {

        var m = name.match(/(.+)\.js$/);
        var entry = m ? m[1] : '';
        var entryPath = entry ? path.resolve(jsDir, name) : '';

        if (entry) map[entry] = entryPath;
    });

    return map;
}
