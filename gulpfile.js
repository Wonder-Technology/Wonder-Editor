var fs = require('fs')
var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var exec = require('child_process').exec;
var sass = require("gulp-sass");
var concat = require('gulp-concat'), //合并文件 
    cssnano = require('gulp-cssnano'), //CSS压缩
    autoprefixer = require('gulp-autoprefixer'); //后编译，自动添加css兼容前缀


var _safeExec = (commandStr, handleErrFunc, handleSuccessFunc, done) => exec(commandStr, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
    if (err) {
        handleErrFunc(err, done);

        return;
    }

    handleSuccessFunc(done);
});

gulp.task("updatePwaCacheVersion", function (done) {
    const packageJsonFilePath = path.join(__dirname, "package.json");
    const serviceWorkerFilePath = path.join(__dirname, "service-worker.js");

    var packageJson = JSON.parse(fs.readFileSync(packageJsonFilePath, "utf8"));

    var data = fs.readFileSync(serviceWorkerFilePath, "utf8");

    var result = data.replace(/(var\scacheName\s=\s')(.+)'/img, function (match, p1, p2) {
        return p1 + "wonder-editor-cache-" + packageJson.version + "\'";
    });

    fs.writeFileSync(
        serviceWorkerFilePath, result, "utf8"
    );

    done();
});

gulp.task("updateCopyRightVersion", function (done) {
    const packageJsonFilePath = path.join(__dirname, "package.json");
    const copyrightFilePath = path.join(__dirname, "src/Copyright.re");

    var packageJson = JSON.parse(fs.readFileSync(packageJsonFilePath, "utf8"));

    var data = fs.readFileSync(copyrightFilePath, "utf8");

    var result = data.replace(/(let\sgetVersion\s=\s\(\)\s=>\s")(.+)"/img, function (match, p1, p2) {
        return p1 + packageJson.version + "\"";
    });

    fs.writeFileSync(
        copyrightFilePath, result, "utf8"
    );

    done();
});


gulp.task("sass", function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass()).pipe(gulp.dest('./public/css'));
});


gulp.task("webpack", function (done) {
    _safeExec("npm run webpack", (err, done) => { throw err }, (done) => done(), done);
});


gulp.task('compressCss', function () {
    return gulp.src('./public/css/index.css')  //读取待src/css 目录下所有的css文件
        .pipe(concat('index.min.css'))
        .pipe(cssnano()) //压缩 CSS
        .pipe(gulp.dest('./public/css'))  //最后输出到 dist/css 目录下
});

gulp.task("watchProject", function () {
    var reFilePaths = [
        path.join(process.cwd(), "lib/es6_global/**/*.js"),
    ];
    gulp.watch(reFilePaths, gulpSync.sync(["compileSass", "webpack"]))

    gulp.watch("public/sass/**/*.scss", ["sass"]);
});

gulp.task("build", gulpSync.sync(["sass", "webpack", "compressCss"]));

gulp.task("watch", gulpSync.sync(["webpack", "watchProject"]));