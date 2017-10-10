var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var sass = require("gulp-sass");

var wonderPackage = require("wonder-package");

var package = wonderPackage.package;
var format = wonderPackage.format;

var compileTs = wonderPackage.compileTs;


var clean = require("./build/gulp_task/clean/clean");


var config = require("./build/gulp_task/common/config");


var tsFilePaths = config.tsFilePaths;
var tsFileDir = config.tsFileDir;
var distPath = config.distPath;


require("./build/gulp_task/test/test");


gulp.task("compileTsES2015", function(done) {
    var tsconfigFile = "./src/tsconfig.json";

    compileTs.compileTsES2015(path.join(process.cwd(), tsconfigFile), {
        sourceDir: tsFileDir,
        cwd:"/",
        targetDir:path.join(distPath, "./es2015/")
    }, done);
});

gulp.task("rollupProject", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("formatTs", function(done) {
    format.formatTs(tsFilePaths, "/", done);
});

gulp.task("sass",function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe( sass() ).pipe( gulp.dest( './public/css' ) );
});

gulp.task("build", gulpSync.sync(["clean", "compileTsES2015", "sass","rollupProject", "formatTs"]));

gulp.task("watchForRunTest", function(){
    var totalPaths = tsFilePaths;

    gulp.watch(totalPaths, gulpSync.sync(["compileTsES2015", "sass","rollupProject"]));

    gulp.watch("public/sass/**/*.scss",["sass"]);
});


