'use strict';
const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');

// 定义任务(将less转换成css)
gulp.task('less', function () {
    // 借助gulp.src来指定less文件位置; *.less 表示当前目录下的所有less文件
    gulp.src('./public/less/*.less')
    // 实现less转css的操作
        .pipe(less())
        .pipe(cssmin())
        // 自动添加css私有前缀, 把文件内容md5加密, 再取32位字符串的一部分作为文件的后缀名, 来区分文件是否发生的修改
        .pipe(autoprefixer())
        // 添加版本号
        .pipe(rev())
        //通过gulp.dest进行存储
        .pipe(gulp.dest('./release/public/less'))
        // 创建rev-manifest.json 文件
        .pipe(rev.manifest())
        // 保存rev-manifest.json文件
        .pipe(gulp.dest('./release/rev'))
});

// 处理图片
gulp.task('image', function () {
    gulp.src('./public/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./release/images'));
});

// 压缩js
gulp.task('js', function () {
    gulp.src('./scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./release/scripts'));
});

// 合并并压缩js
gulp.task('concat', function () {
    gulp.src('./scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./release/scripts'));
});

// 压缩html
gulp.task('html', function () {
    // {base: './'} 表示转换后的文件会按源文件的目录结构存放
    gulp.src(['./index.html', './views/*.html'], {base: './'})
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true
        }))
        .pipe(gulp.dest('./release'));
});

// 替换文件名操作
gulp.task('rev', function () {
    gulp.src(['./release/rev/*.json', './release/**/*.html'], {base: './release'})
    // 规制文件内的链接
        .pipe(revCollector())
        // 输出修改后的文件
        .pipe(gulp.dest('./release/replace'));
});

/*
* 这个会自动改变index.html 中引用文件的链接, 下在是处理js文件, css文件与之类似, 所build:js 改成 build:css即可
* <!--build:js ./angular.min.js-->
* <script src='angular.js'></script>
* <script src='main.js'></script>
* <!--endbuild-->
* */
gulp.task('useref', function () {
    gulp.src('./index.html')
        // 查找index.html 中build标签, 合并多个js文件为一个文件
        .pipe(useref())
        // 判断js文件并压缩js文件
        .pipe(gulpif('*.js', uglify()))
        // 输出所有处理好的文件
        .pipe(gulp.dest('./release'));

});

// 运行任务
// gulp.task('default', ['less', 'js', 'concat', 'html', 'rev']);
gulp.task('default', ['useref']);
