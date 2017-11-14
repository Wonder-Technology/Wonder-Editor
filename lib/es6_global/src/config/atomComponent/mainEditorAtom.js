'use strict';

import * as Json_decode from "../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";

function mainEditorAtom(json) {
  return /* record */[
          /* state */Json_decode.field("state", Json_decode.string, json),
          /* dispatch */Json_decode.field("dispatch", Json_decode.string, json)
        ];
}

export {
  mainEditorAtom ,
  
}
/* No side effect */
