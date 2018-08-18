open WonderLog.Console;

let stubConsole = [%bs.raw
  {|
    function(errorFunc, infoFunc, warnFunc, traceFunc, logFunc ) {
        console.error = errorFunc;

        console.info = infoFunc;

        console.warn = warnFunc;

        var getStackTrace = function () {
            var obj = {};
            Error.captureStackTrace(obj, getStackTrace);

            return obj.stack;
        };

        let oldTrace = console.trace;

        console.trace = () => {
           var traceInfo = getStackTrace();

           oldTrace();
           traceFunc(traceInfo)
        };

        console.log = logFunc;
    }
  |}
];

let tryCatch = [%bs.raw
  {|
    function(tryFunc, catchFunc ) {
        try{
          tryFunc();
        } catch(e) {
          catchFunc(e);
        }
    }
  |}
];

let throwFatal = msg => {
  error1(msg);
  trace();
};