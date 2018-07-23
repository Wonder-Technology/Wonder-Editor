var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var wonderPackage = require("wonder-package");
var exec = require('child_process').exec;
// var wonderEditorTool = require("wonder-editor-tool");
var sass = require("gulp-sass");

var package = wonderPackage.package;
// var convertCssPath = wonderEditorTool.convertImportCss.convert;


var _safeExec = (commandStr, done) => exec(commandStr, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
    if (err) {
        throw err;
    }

    done();
});

gulp.task("sass", function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass()).pipe(gulp.dest('./public/css'));
});

gulp.task("compileReason", function (done) {
    _safeExec("npm run bsb:build", done);
});

gulp.task("rollupProject", function (done) {
    // var filePath = path.resolve(__dirname + "/lib/es6_global/src");
    // convertCssPath(filePath);

    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});


gulp.task("watchProject", function () {
    var reFilePaths = [
        path.join(process.cwd(), "lib/es6_global/**/*.js"),
    ];
    gulp.watch(reFilePaths, gulpSync.sync(["compileSass", "rollupProject"]))

    gulp.watch("public/sass/**/*.scss", ["sass"]);
});

gulp.task("build", gulpSync.sync(["sass", "rollupProject"]));

gulp.task("watch", gulpSync.sync(["rollupProject", "watchProject"]));