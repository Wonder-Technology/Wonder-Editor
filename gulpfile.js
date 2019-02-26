var fs = require('fs')
var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var exec = require('child_process').exec;
var sass = require("gulp-sass");


var _safeExec = (commandStr, done) => exec(commandStr, { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
    if (err) {
        throw err;
    }

    done();
});


gulp.task("updateVersion", function (done) {
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

gulp.task("sass", function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass()).pipe(gulp.dest('./public/css'));
});

gulp.task("changeSnapshotPath", function (done) {
    const filePath = path.join(__dirname, 'node_modules/jest-snapshot/build/utils.js');

    replaceSnapshotPath(filePath, done)
});


gulp.task("copySnapshotFilesFromTestToLib", function () {
    var files = [
        "./test/**/*.js.snap"
    ];

    return gulp.src(files, { base: "./" })
        .pipe(gulp.dest("lib/es6_global"));
});


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