var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;

var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");
var karmaUIConfPath = path.join(process.cwd(), "testUI/karma.conf.js");


gulp.task("testByKarma", function (done) {
    karma.start({
        configFile: karmaConfPath
    }, done);
});

gulp.task("testUIByKarma", function (done) {
    karma.start({
        configFile: karmaUIConfPath
    }, done);
});


gulp.task("test", gulpSync.sync(["testByKarma"]));
gulp.task("testui", gulpSync.sync(["testUIByKarma"]));
