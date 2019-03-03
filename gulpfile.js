var fs = require('fs')
var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var exec = require('child_process').exec;
var sass = require("gulp-sass");


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


gulp.task("watchProject", function () {
    var reFilePaths = [
        path.join(process.cwd(), "lib/es6_global/**/*.js"),
    ];
    gulp.watch(reFilePaths, gulpSync.sync(["compileSass", "webpack"]))

    gulp.watch("public/sass/**/*.scss", ["sass"]);
});

gulp.task("build", gulpSync.sync(["sass", "webpack"]));

gulp.task("watch", gulpSync.sync(["webpack", "watchProject"]));