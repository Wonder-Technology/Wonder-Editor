var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var wonderPackage = require("wonder-package");
var exec = require('child_process').exec;
var wonderEditorTool = require("wonder-editor-tool");

var package = wonderPackage.package;
var convertCssPath = wonderEditorTool.convertImportCss.convert;


var _safeExec = (commandStr, done) => exec(commandStr, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
    if (err) {
        throw err;
    }

    done();
});



gulp.task("compileSass", function (done) {
    _safeExec("sass --update ./src/:./src/", done);
});
gulp.task("sassWatch", function (done) {
    _safeExec("sass --wacth ./src/:./src/", done);
});
gulp.task("compileReason", function (done) {
    _safeExec("npm run bsb:build", done);
});

gulp.task("rollupProject", function (done) {
    var filePath = path.resolve(__dirname + "/lib/es6_global/src");
    convertCssPath(filePath);

    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});


gulp.task("watchProject", function () {
    var reFilePaths = [
        path.join(process.cwd(), "lib/es6_global/**/*.js"),
        // path.join(process.cwd(), "src/*.scss"),
        // path.join(process.cwd(), "src/**/*.scss")
    ];
    gulp.watch(reFilePaths, gulpSync.sync(["compileSass", "rollupProject"]))
});

// gulp.task("build", gulpSync.sync(["compileSass", "compileReason", "rollupProject"]));
gulp.task("build", gulpSync.sync(["compileSass", "rollupProject"]));

// gulp.task("watch", gulpSync.sync(["compileSass", "rollupProject", "watchProject"]));
gulp.task("watch", gulpSync.sync(["rollupProject", "watchProject"]));