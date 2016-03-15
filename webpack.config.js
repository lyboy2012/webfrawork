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
        devtoolModuleFilenameTemplate: '[resource-path]',
        sourceMapFilename: "[file].map",
        filename: "[name].js"
    },
    resolve: {
        root: [
            path.resolve(basePath, 'js/source')
        ],
        extensions: ['.jsx', '.js'],
        alias: {
            'jquery': path.resolve(basePath, 'js') + '/source/common/jquery',
            'react': path.resolve(basePath, 'js') + '/source/common/react',
            'react-dom': path.resolve(basePath, 'js') + '/source/common/react-dom',
            'marked': path.resolve(basePath, 'js') + '/source/common/marked'
            
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ],
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015','react']
            }
        }]
    },
    /*module: {
        loaders: [{
            // "test" is commonly used to match the file extension
            test: /\.jsx$/,

            // "include" is commonly used to match the directories
            include: [
                path.resolve(__dirname, "app/src"),
                path.resolve(__dirname, "app/test")
            ],

            // "exclude" should be used to exclude exceptions
            // try to prefer "include" when possible

            // the "loader"
            loader: "babel-loader"
        }]
    },*/
    devtool: "#cheap-module-source-map"
};


function genEntries() {


   
    var jsDir = path.resolve(basePath + '/js/source', 'entry');
    var names = fs.readdirSync(jsDir);
    var map = {};
    names.forEach(function(name) {
        var m = name.match(/(.+)\.jsx$/);
        var entry = m ? m[1] : '';
        //var entryPath = entry ? path.resolve(jsDir, name) : '';
        var entryPath = entry ? './' + basePath + '/js/source/entry/' + entry : '';
        if (entry) map[entry] = entryPath;
    });

    return map;
}
