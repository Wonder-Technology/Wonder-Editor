let stubConsole = [%bs.raw
  {|
    function(errorFunc, infoFunc, warnFunc, traceFunc, logFunc ) {
        window.wonder_console.error = errorFunc;

        window.wonder_console.info = infoFunc;

        window.wonder_console.warn = warnFunc;

        var getStackTrace = function () {
            var obj = {};
            Error.captureStackTrace(obj, getStackTrace);

            return obj.stack;
        };

        window.wonder_console.trace = () => {
           var traceInfo = getStackTrace();

           traceFunc(traceInfo)
        };


        window.wonder_console.log = logFunc;
    }
  |}
];

let tryCatch = [%bs.raw
  {|
    function(tryFunc, catchFunc ) {

      let retValue = null;

        try{
         retValue =  tryFunc();
        } catch(e) {
          catchFunc(e);
        };
      
      return retValue;
    }
  |}
];

let throwFatal = msg => {
  WonderLog.Log._error(msg);

  WonderLog.Log._trace();
};