'use strict';


function buildFakeSetTimeoutFunc (param){
    window.timeoutFuncArr = [];

    window.setTimeout = (func, time) => {
window.timeoutFuncArr.push([func, time]);
    }
    };

function getTimeoutFuncArr (param){
        return window.timeoutFuncArr;
        };

var $$setTimeout = (
    function(func, time){
        setTimeout(func, time)
    }
  );

exports.buildFakeSetTimeoutFunc = buildFakeSetTimeoutFunc;
exports.getTimeoutFuncArr = getTimeoutFuncArr;
exports.$$setTimeout = $$setTimeout;
/* setTimeout Not a pure module */
