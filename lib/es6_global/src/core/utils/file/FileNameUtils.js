

import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";

function handleFileName(fileName) {
  var match = (/^(.*)(\.\w+)$/).exec(fileName);
  if (match !== null) {
    return /* tuple */[
            Caml_array.caml_array_get(match, 1),
            Caml_array.caml_array_get(match, 2)
          ];
  } else {
    return /* tuple */[
            fileName,
            ""
          ];
  }
}

export {
  handleFileName ,
  
}
/* No side effect */
