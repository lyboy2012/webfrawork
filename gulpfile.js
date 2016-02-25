const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    config = require('./config.js'),
    rimraf = rimraf = require('rimraf'),
    webpackConf = require('./webpack.config'),
    webpackBuidPath = webpackConf.buildPath,
    basePath = config.basePath,
    buildPath = config.buildPath;

/*js 脚本配置*/




//gulp.task('scripts', () => {
//return gulp.src([basePath + '/js/source/**/*.es6'])
/*.pipe(plugins.plumber({}, true, function(err) {
            console.log('ERROR!!!!');
            console.log(err);
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))

    .pipe(plugins.sourcemaps.write('.')) //.pipe(plugins.jshint(basePath + '/js/source/.jshintrc'))
        //.pipe(plugins.jshint.reporter('default'))
        //.pipe(plugins.concat('main.js')) //合并成一个js
        .pipe(gulp.dest(basePath + '/js/source')) //生成源文件合并文件
        .pipe(browserSync.stream()); //压缩后再生成js 文件

});*/

gulp.task('html', () => {
    return gulp.src(basePath + '/*.html')
        .pipe(gulp.dest(basePath))
        .pipe(browserSync.stream());
});



gulp.task('styles', () => {
    return gulp.src(basePath + '/css/**/*.scss')
        .pipe(plugins.compass({
            css: basePath + '/css',
            sass: basePath + '/css/sass',
            image: basePath + '/img/',
            sourcemap: true,
            require: ['susy']
        }))
        .on('error', function(error) {
            // Would like to catch the error here 
            console.log(error);
            this.emit('end');
        })
        .pipe(plugins.concat('index.css')) //合并成一个css
        .pipe(gulp.dest(basePath + '/css')) //压缩后再生成css文件
        .pipe(browserSync.stream());

});
gulp.task('webpack-script', /* ['scripts'], */ () => {
    return gulp.src([basePath + '/js/source/**/*.js'])
        .pipe(plugins.plumber({}, true, function(err) {
            console.log('ERROR!!!!');
            console.log(err);
        }))

    .pipe(plugins.webpack(webpackConf))
        .pipe(gulp.dest(webpackBuidPath))
        .pipe(browserSync.stream());
});



//编译字体
gulp.task('build-style:fonts', function() {
    return gulp.src(basePath + '/fonts/**/*')
        .pipe(plugins.rev())
        .pipe(gulp.dest(buildPath + '/fonts'))
        .pipe(plugins.rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildPath + '/fonts'));

});

//编译样式
gulp.task('build-style', ['styles', 'build-style:fonts'], function() {
    return gulp.src(basePath + '/css/**/*.css')
        .pipe(plugins.minifyCss())
        .pipe(plugins.rev())
        .pipe(gulp.dest(buildPath + '/css')) //压缩后再生成css 文件
        .pipe(plugins.rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildPath + '/css'));

});

gulp.task('build-scripts', ['webpack-script'], function() {
    return gulp.src(webpackBuidPath + '/*.js')
        .pipe(plugins.uglify({ preserveComments: 'all' }))
        .pipe(plugins.rev())
        .pipe(gulp.dest(buildPath + '/js')) //压缩后再生成js 文件
        .pipe(plugins.rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildPath + '/js'));

});


//编译图片
gulp.task('build-images', function() {
    return gulp.src(basePath + '/img/**/*')
        .pipe(plugins.rev())
        .pipe(plugins.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(buildPath + '/img'))
        .pipe(plugins.rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest(buildPath + '/img'))
        .pipe(browserSync.stream());
});

gulp.task('clean', function(cb) {
    rimraf(buildPath, cb);
});

/*编译生成相关*/


gulp.task('build-rev-style',['build-scripts', 'build-style', 'build-images'], function() {
    var opts = {
        empty: true, //- do not remove empty attributes
        cdata: false, // - do not strip CDATA from scripts
        comments: false, // - do not remove comments
        conditionals: false, //- do not remove conditional internet explorer comments
        spare: true, // - do not remove redundant attributes
        quotes: true, // - do not remove arbitrary quotes
        loose: false // - preserve one whitespace
    };
    return gulp.src([buildPath + '/**/*.json', buildPath + '/css/*.css'])
        .pipe(plugins.revCollector({
            replaceReved: true
        }))
        .pipe(gulp.dest(buildPath + '/css'));
});


gulp.task('build-html', ['build-rev-style'], function() {
    var opts = {
        empty: true, //- do not remove empty attributes
        cdata: false, // - do not strip CDATA from scripts
        comments: false, // - do not remove comments
        conditionals: false, //- do not remove conditional internet explorer comments
        spare: true, // - do not remove redundant attributes
        quotes: true, // - do not remove arbitrary quotes
        loose: false // - preserve one whitespace
    };
    return gulp.src([buildPath + '/**/*.json', basePath + '/*.html'])
        .pipe(plugins.revCollector({
            replaceReved: true,
            dirReplacements: {
                'css/': 'css/', //?bug 不设置不替换
                'js/__build': 'js'
            }
        }))
        .pipe(plugins.minifyHtml(opts))
        .pipe(gulp.dest(buildPath));
});
gulp.task('clean', function(cb) {
    rimraf(buildPath, cb);
});
gulp.task('build',['build-html'], function(cb) {
    rimraf(buildPath+'/**/rev-manifest.json', cb);
});
// watch files for changes and reload
gulp.task('serve', ['html', 'styles', 'webpack-script'], () => {
    browserSync.init({
        server: {
            baseDir: './' + basePath, //根路径
            index: "index.html"
        }
    });

});
// 监听html
gulp.task('default', ['serve'], () => {
    gulp.watch(basePath + '/*.html', browserSync.reload);

    // 监听scss
    gulp.watch(basePath + '/css/**/*.scss', ['styles'], browserSync.reload);

    // 监听es6变化
    gulp.watch(basePath + '/js/source/**/*.@(es6|js)', ['webpack-script'], browserSync.reload);

    // 监听js变化
    //  gulp.watch(basePath + '/js/source/**/*.js', ['webpack-script'], browserSync.reload);

});
