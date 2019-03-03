let buildFakeSetTimeoutFunc = [%bs.raw
  (param) => {|
    window.timeoutFuncArr = [];

    window.setTimeout = (func, time) => {
window.timeoutFuncArr.push([func, time]);
    }
    |}
];

let getTimeoutFuncArr = [%bs.raw
  (param) => {|
        return window.timeoutFuncArr;
        |}
];


let setTimeout = [%bs.raw
  {|
    function(func, time){
        setTimeout(func, time)
    }
  |}
];