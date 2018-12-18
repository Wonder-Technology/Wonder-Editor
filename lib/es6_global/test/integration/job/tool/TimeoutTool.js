


function buildFakeSetTimeoutFunc (){
    window.timeoutFuncArr = [];

    window.setTimeout = (func, time) => {
window.timeoutFuncArr.push([func, time]);
    }
    };

function getTimeoutFuncArr (){
        return window.timeoutFuncArr;
        };

export {
  buildFakeSetTimeoutFunc ,
  getTimeoutFuncArr ,
  
}
/* No side effect */
