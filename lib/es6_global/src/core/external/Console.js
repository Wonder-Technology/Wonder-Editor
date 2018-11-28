

import * as Log$WonderLog from "../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as ConsoleUtils$WonderEditor from "../utils/ui/ConsoleUtils.js";

var stubConsole = (
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
  );

var tryCatch = (
    function(tryFunc, catchFunc ) {

      let retValue = null;

        try{
         retValue =  tryFunc();
        } catch(e) {
          retValue = catchFunc(e);
        };

      return retValue;
    }
  );

function throwFatal(e) {
  Log$WonderLog._error(e.message);
  return ConsoleUtils$WonderEditor.logStack(e.stack);
}

export {
  stubConsole ,
  tryCatch ,
  throwFatal ,
  
}
/* stubConsole Not a pure module */
