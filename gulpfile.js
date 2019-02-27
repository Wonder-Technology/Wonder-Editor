var fs = require('fs')
var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var exec = require('child_process').exec;
var sass = require("gulp-sass");
var clean = require("gulp-clean");


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


function replaceSnapshotPath(filePath, done) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.log(err);

            done();

            return;
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

        fs.writeFile(filePath, result, "utf8", function (err) {
            if (err) {
                console.log(err);

                done();

                return;
            }

            done();
        });
    });
};


gulp.task("changeSnapshotPath", function (done) {
    const filePath = path.join(__dirname, 'node_modules/jest-snapshot/build/utils.js');

    replaceSnapshotPath(filePath, done)
});


function restoreSnapshotPath(filePath, done) {
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.log(err);

            done();

            return;
        }


        var result = data.replace(/const\sgetSnapshotPath[\w\W]+?;/img, `
const getSnapshotPath = (exports.getSnapshotPath = testPath =>
  _path2.default.join(
    _path2.default.join(_path2.default.dirname(testPath), '__snapshots__'),
    _path2.default.basename(testPath) + '.' + SNAPSHOT_EXTENSION
  ));`
        );

        fs.writeFile(filePath, result, "utf8", function (err) {
            if (err) {
                console.log(err);

                done();

                return;
            }

            done();
        });
    });
};


gulp.task("restoreSnapshotPath", function (done) {
    const filePath = path.join(__dirname, 'node_modules/jest-snapshot/build/utils.js');

    restoreSnapshotPath(filePath, done)
});


gulp.task("copySnapshotFilesFromTestToLib", function () {
    var files = [
        "./test/**/*.js.snap"
    ];

    return gulp.src(files, { base: "./" })
        .pipe(gulp.dest("lib/es6_global"));
});


gulp.task("copySnapshotFilesFromLibToTest", function () {
    var files = [
        "./lib/es6_global/test/**/*.js.snap"
    ];

    return gulp.src(files, { base: "./lib/es6_global/test" })
        .pipe(gulp.dest("test"));
});



gulp.task("moveSnapshotFilesFromTestToLib", ["copySnapshotFilesFromTestToLib"], function () {
    var files = [
        "./test/**/*.js.snap"
    ];

    return gulp.src(files, { read: false })
        .pipe(clean());
});


gulp.task("moveSnapshotFilesFromLibToTest", ["copySnapshotFilesFromLibToTest"], function () {
    var files = [
        "./lib/es6_global/**/*.js.snap"
    ];

    return gulp.src(files, { read: false })
        .pipe(clean());
});



gulp.task("jestCoverage", function (done) {
    _safeExec("jest --maxWorkers=4 --config jest_coverage.json", (err, done) => {
        console.log("err: ", err);

        _safeExec("gulp moveSnapshotFilesFromLibToTest", (err, done) => { throw err }, (done) => done(), done);
    }, (done) => {
        _safeExec("gulp moveSnapshotFilesFromLibToTest", (err, done) => { throw err }, (done) => done(), done);
    }, done);
});



gulp.task("testCoverage", gulpSync.sync(["restoreSnapshotPath", "moveSnapshotFilesFromTestToLib", "jestCoverage", "moveSnapshotFilesFromLibToTest"]));


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