var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var karma = require("karma").server;

var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");


gulp.task("testByKarma", function (done) {
    karma.start({
        configFile: karmaConfPath
    }, done);
});


gulp.task("test", gulpSync.sync(["testByKarma"]));

