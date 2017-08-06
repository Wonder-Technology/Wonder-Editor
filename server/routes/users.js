var fsUtil = require("../util/fsUtil");
var path = require('path');

exports.user = function (req,res,next) {
    req.getConnection(function (err,conn) {
        if(err)return next(err);
        conn.query('select password from users where name = ?',["杨浩"],function (err,result) {
            if(err)return next(err);

            res.json(result);
        })
    })
};

exports.addDir = function (req,res) {
    var query = req.query;
    req.getConnection(function (err,conn) {
        if(err)return next(err);
        conn.query('insert into users(name,password) values (?,?);',[query.name,query.password],function (err,result) {
            if(err)return next(err);

            fsUtil.mkdirSync("users/"+query.name,function (e) {
                if(e)console.log("mkdir error");

                fsUtil.copyDir("./project","./users/"+query.name);

                fsUtil.changeFileNameByUserName(query.name);
                res.json({"success":true});
            });

        })
    })
};
