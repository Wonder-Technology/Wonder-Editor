'use strict';

import * as Caml_array    from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";

function handleFileName(fileName) {
  var match = (/(^.*)(\.\w+)$/).exec(fileName);
  if (match !== null) {
    var resultArr = Log$WonderLog.print(match);
    return /* tuple */[
            Caml_array.caml_array_get(resultArr, 1),
            Caml_array.caml_array_get(resultArr, 2)
          ];
  } else {
    return /* tuple */[
            "",
            ""
          ];
  }
}

export {
  handleFileName ,
  
}
/* Log-WonderLog Not a pure module */
