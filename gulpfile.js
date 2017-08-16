var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");

var wonderPackage = require("wonder-package");

var package = wonderPackage.package;
var format = wonderPackage.format;


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
        exclude: ["Adaptor.ts","contract.ts","decorator.ts"]
    });


    done();
});

gulp.task("rollup", function(done) {
    package.rollup(path.join(process.cwd(), "./src/rollup.config.js"), done);
});

gulp.task("formatTs", function(done) {
    format.formatTs(tsFilePaths, "/", done);
});

gulp.task("build", gulpSync.sync(["generateIndex", "formatTs"]));

