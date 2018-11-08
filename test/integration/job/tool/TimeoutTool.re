let buildFakeSetTimeoutFunc = [%bs.raw
  () => {|
    window.timeoutFuncArr = [];

    window.setTimeout = (func, time) => {
window.timeoutFuncArr.push([func, time]);
    }
    |}
];

let getTimeoutFuncArr = [%bs.raw
  () => {|
        return window.timeoutFuncArr;
        |}
];