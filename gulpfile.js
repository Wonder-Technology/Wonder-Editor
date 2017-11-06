var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var wonderPackage = require("wonder-package");
var exec = require('child_process').exec;
var package = wonderPackage.package;

var convertCssPath = require("./server/convertImportCss");


gulp.task("rollupProject", function (done) {
    var filePath = path.resolve(__dirname + "/lib/es6_global");

    convertCssPath(filePath);
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("build", gulpSync.sync(["rollupProject"]));

gulp.task("watch", function () {
    var reFilePaths = [
        path.join(process.cwd(), "lib/es6_global/**/*.js"),
        path.join(process.cwd(), "src/*.scss"),
        path.join(process.cwd(), "src/**/*.scss")
    ];
    gulp.watch(reFilePaths, gulpSync.sync(["rollupProject"]))
});