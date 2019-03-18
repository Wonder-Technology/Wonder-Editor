


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

export {
  buildFakeSetTimeoutFunc ,
  getTimeoutFuncArr ,
  $$setTimeout ,
  
}
/* setTimeout Not a pure module */
