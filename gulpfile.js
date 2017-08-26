var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");

var wonderPackage = require("wonder-package");

var package = wonderPackage.package;
var format = wonderPackage.format;


var clean = require("./build/gulp_task/clean/clean");


var config = require("./build/gulp_task/common/config");


var tsFilePaths = config.tsFilePaths;

require("./build/gulp_task/test/test");


var generateIndex = require("wonder-tool-generate_es2015_index").generate;
var ts = require("typescript");

gulp.task("generateIndex", function(done) {
    var rootDir = path.join(process.cwd(), "src"),
        destDir = "./src/";

    //include .ts file,the ui file is .tsx,so exclude ui
    generateIndex("/", rootDir, ["*.ts", "**/*.ts"], destDir, {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.System
    }, {
        exclude: ["Adaptor.ts","Edit.ts","Oper.ts","View.ts","ViewSystem.ts","contract.ts","decorator.ts","Util.ts","Buss.ts"]
    });


    done();
});

gulp.task("rollupProject", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("rollupTest", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.test.js"), done);
});

gulp.task("rollup", gulpSync.sync(["rollupProject","rollupTest"]));

gulp.task("formatTs", function(done) {
    format.formatTs(tsFilePaths, "/", done);
});

gulp.task("build", gulpSync.sync(["clean", "generateIndex", "rollup", "formatTs"]));

