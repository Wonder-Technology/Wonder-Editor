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


var generateIndex = require("wonder-tool-generate_es2015_index").generate;
var ts = require("typescript");

gulp.task("generateEditorIndex", function(done) {
    var rootDir = path.join(process.cwd(), "src/editor/"),
        destDir = "./src/editor/";

    //include .ts file,the ui file is .tsx,so exclude ui
    generateIndex("/", rootDir, ["*.ts", "**/*.ts"], destDir, {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.System
    }, {
        exclude: ["Adaptor.ts","Edit.ts","Oper.ts","View.ts","ViewSystem.ts","contract.ts","decorator.ts","Util.ts","Buss.ts"]
    });


    done();
});

gulp.task("compileEditorTsES2015", function(done) {
    var tsconfigFile = "./src/editor/tsconfig_editor.json";

    compileTs.compileTsES2015(path.join(process.cwd(), tsconfigFile), {
        sourceDir: tsFileDir,
        cwd:"/",
        targetDir:path.join(distPath, "./es2015/")
    }, done);
});

gulp.task("rollupProject", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.js"), done);
});

gulp.task("rollupTest", function(done) {
    package.rollup(path.join(process.cwd(), "./rollup.config.testEditor.js"), done);
});

gulp.task("formatTs", function(done) {
    format.formatTs(tsFilePaths, "/", done);
});

gulp.task("sass",function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe( sass() ).pipe( gulp.dest( './public/css' ) );
});

gulp.task("build", gulpSync.sync(["clean", "compileEditorTsES2015", "sass","rollupProject", "formatTs"]));

gulp.task("watchForTestEditor", function(){
    var totalPaths = tsFilePaths;

    gulp.watch(totalPaths, gulpSync.sync(["generateEditorIndex", "compileEditorTsES2015", "rollupTest"]));
});

gulp.task("watchForRunTest", function(){
    var totalPaths = tsFilePaths;

    gulp.watch(totalPaths, gulpSync.sync(["compileEditorTsES2015", "sass","rollupProject"]));

    gulp.watch("public/sass/**/*.scss",["sass"]);
});


