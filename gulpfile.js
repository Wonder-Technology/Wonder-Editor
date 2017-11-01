var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");

var wonderPackage = require("wonder-package");

var package = wonderPackage.package;

gulp.task("rollupProject", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("build", gulpSync.sync(["clean", "rollupProject" ]));

gulp.task("watchForRunTest", function(){

});