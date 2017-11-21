var fs = require("fs");
var path = require("path");


module.exports = function fileDisplay(filePath) {

    //根据文件路径读取文件，返回文件列表  
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表  
            files.forEach(function (filename) {
                //获取当前文件的绝对路径  
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象(判断是文件还是目录)
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();
                        var isDir = stats.isDirectory();
                        if (isFile) {
                            if (path.parse(filedir).ext == ".js") {
                                readFileAndChangePath(filedir);
                            }
                        }
                        if (isDir) {
                            fileDisplay(filedir);
                        }
                    }
                })
            });
        }
    });
}

//替换文件中import("./app.css") => import "../../../"src/ui/component/app/app.css
function readFileAndChangePath(filePath) {
    var fileSegment = filePath.split("/");
    var basePath = fileSegment.slice(7, -1).join("/");
    //此处多一层目录,所以截取一次../ 
    var relativePath = path.relative(filePath, __dirname + "/../").slice(0, -3);
    var resultPath = relativePath + "/" + basePath;

    fs.readFile(filePath, { encoding: null, flag: 'r+' }, function (err, buffer) {
        if (err) {
            return console.log(err);
        }

        var fileData = buffer.toString().split("\n");
        var resultData = "";
        var hasChange = false;

        fileData.forEach(function (line) {
            if (line.match(/^importCss\s*\((\"|\')/g)) {
                hasChange = true;

                fileNameRE = line.match(/[\"|\'](.*?)[\"|\']/g)[0];
                var fileName = fileNameRE.slice(fileNameRE.indexOf("/") + 1, -1);
                cssFilePath = "import '" + resultPath + "/" + fileName + "';\n";

                resultData += cssFilePath;
            } else {
                resultData += line + "\n";
            }
        });

        if (hasChange) {
            fs.writeFile(filePath, resultData, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("success!"+cssFilePath);
            });
        }
    })
};