var fs = require('fs')
var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var wonderPackage = require("wonder-package");
var exec = require('child_process').exec;
var sass = require("gulp-sass");

var package = wonderPackage.package;


var _safeExec = (commandStr, done) => exec(commandStr, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
    if (err) {
        throw err;
    }

    done();
});

function replaceSnapshotPath(filePath) {
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var result = data.replace(/const\sgetSnapshotPath[\w\W]+?;/img, `
        const getSnapshotPath = (exports.getSnapshotPath = testPath => {
              let filePathArray = testPath.split('/')
              filePathArray.splice(5, 2)
              testPath = filePathArray.join('/')
              return _path2.default.join(
                _path2.default.join(_path2.default.dirname(testPath), '__snapshots__'), _path2.default.basename(testPath) + '.' + SNAPSHOT_EXTENSION)
            }); `
        );

        fs.writeFile(filePath, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
};

gulp.task("sass", function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass()).pipe(gulp.dest('./public/css'));
});

gulp.task("changeSnapshotPath", function (done) {
    const filePath = path.join(__dirname, 'node_modules/jest-snapshot/build/utils.js');

    replaceSnapshotPath(filePath)
});

// gulp.task("rollupProject", function (done) {
//     package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
// });

gulp.task("webpack", function (done) {
    _safeExec("npm run webpack", done);
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