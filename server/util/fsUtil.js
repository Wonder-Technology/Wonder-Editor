var fs = require('fs');
var child_process = require("child_process");
var path = require('path');

exports.copyDir = function (src,dist) {
    child_process.spawn('cp', ['-r', src, dist]);
};


exports.changeFileNameByUserName = function (userName) {
    var filePath = path.resolve(__dirname,"../users/" + userName + "/project/index.html");

    fs.readFile(filePath, function (err,data) {
        if(err)console.log(err);

        var fileData = data.toString();
        var newData = fileData.replace(/\/demo/g,"/"+userName);

        fs.writeFile(filePath,newData,function (err) {
            if(err)
                console.log(err);
        })
    });
};

exports.mkdirSync = function(url,cb,mode){
    var arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!fs.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
};
