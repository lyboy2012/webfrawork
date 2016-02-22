const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    config = require('./config.js'),
    webpackConf = require('./webpack.config'),
    webpackBuidPath = webpackConf.buildPath,
    basePath = config.basePath,
    buildPath = config.buildPath;

/*js 脚本配置*/




gulp.task('scripts', () => {
    return gulp.src([basePath + '/js/source/**/*.es6'])
        .pipe(plugins.plumber({}, true, function(err){
            console.log('ERROR!!!!');
            console.log(err);
        }))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))

        .pipe(plugins.sourcemaps.write('.'))        //.pipe(plugins.jshint(basePath + '/js/source/.jshintrc'))
        //.pipe(plugins.jshint.reporter('default'))
        //.pipe(plugins.concat('main.js')) //合并成一个js
        .pipe(gulp.dest(basePath + '/js/source')) //生成源文件合并文件
        .pipe(browserSync.stream()); //压缩后再生成js 文件

});
gulp.task('webpack-script', function() {
    return gulp.src([basePath + '/js/source/**/*.js'])
        .pipe(plugins.webpack(webpackConf))
        .pipe(gulp.dest(webpackBuidPath))
        .pipe(browserSync.stream());
});


/*gulp.task('scripts',function(){
  return gulp.src('src/js/source/index/index.js')
 .pipe(plugins.webpack(webpackConfig))

  //.pipe(plugins.sourcemaps.write('../'))
  .pipe(gulp.dest('src/js'))//生成源文件合并文件
  .pipe(browserSync.stream());//压缩后再生成js 文件

});*/




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
gulp.task('html', () => {
    return gulp.src(basePath + '/*.html')
        .pipe(gulp.dest(basePath))
        .pipe(browserSync.stream());
});



/*编译生成相关*/
//编译html
gulp.task('build-html', () => {
    return gulp.src(basePath + '/*.html')
        .pipe(gulp.dest(buildPath));
});
//编译样式
gulp.task('build-style', () => {
    return gulp.src(basePath + '/css/index.css')
        .pipe(plugins.minifyCss())
        //.pipe(plugins.rename({ suffix: '.min' }))//重命名
        .pipe(gulp.dest(buildPath + '/css')); //压缩后再生成css 文件

});
//编译样式
gulp.task('build-fonts', () => {
    return gulp.src(basePath + '/fonts/**/*')
        //.pipe(plugins.rename({ suffix: '.min' }))//重命名
        .pipe(gulp.dest(buildPath + '/fonts')); //压缩后再生成css 文件

});
//编译脚本
gulp.task('build-scripts', () => {
    return gulp.src(basePath + '/js/main.js')
        .pipe(plugins.uglify())
        //.pipe(plugins.rename({ suffix: '.min' }))//重命名
        .pipe(gulp.dest(buildPath + '/js')) //压缩后再生成js 文件
    ;
});
//编译图片
gulp.task('build-images', () => {
    return gulp.src(basePath + '/img/**/*')
        .pipe(plugins.newer(basePath + '/img/**/*'))
        .pipe(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest(buildPath + '/img'))
        .pipe(browserSync.stream());
});

gulp.task('build', ['build-html', 'build-scripts', 'build-style', 'build-fonts', 'build-images']);

// 清理
gulp.task('clean', () => {
    return gulp.src([buildPath], { read: false })
        .pipe(plugins.clean());
});
// watch files for changes and reload
gulp.task('serve', ['html', 'styles', 'scripts','webpack-script'], () => {
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
    gulp.watch(basePath + '/js/source/**/*.es6', ['scripts'], browserSync.reload);

    // 监听js变化
    gulp.watch(basePath + '/js/source/**/*.js', ['webpack-script'], browserSync.reload);
    
});
