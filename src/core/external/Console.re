let stubConsole = [%raw
  {|
    function(errorFunc, infoFunc, warnFunc, debugFunc, traceFunc, logFunc ) {
        window.wonder_console.error = errorFunc;

        window.wonder_console.info = infoFunc;

        window.wonder_console.warn = warnFunc;

        window.wonder_console.debug = debugFunc;

        var getStackTrace = function (func) {
            var obj = {};
            Error.captureStackTrace(obj, func);

            return obj.stack;
        };

        window.wonder_console.trace = (func) => {
           var traceInfo = getStackTrace(func);

           traceFunc(traceInfo)
        };


        window.wonder_console.log = logFunc;
    }
  |}
];

let tryCatch = [%raw
  {|
    function(tryFunc, catchFunc ) {

      let retValue = null;

        try{
         retValue =  tryFunc();
        } catch(e) {
          retValue = catchFunc(e);
        };

      return retValue;
    }
  |}
];

let rec throwFatal = e => {
  WonderLog.Log._error(e##message);
  ConsoleUtils.logStack(e##stack);
};