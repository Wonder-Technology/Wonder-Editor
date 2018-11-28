


var buildFakeSetTimeoutFunc = function (){
    window.timeoutFuncArr = [];

    window.setTimeout = (func, time) => {
window.timeoutFuncArr.push([func, time]);
    }
    };

var getTimeoutFuncArr = function (){
        return window.timeoutFuncArr;
        };

export {
  buildFakeSetTimeoutFunc ,
  getTimeoutFuncArr ,
  
}
/* No side effect */
