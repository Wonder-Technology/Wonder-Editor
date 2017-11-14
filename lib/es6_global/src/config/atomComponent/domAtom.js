'use strict';

import * as Json_decode from "../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";

function buttonAtom(json) {
  return /* record */[
          /* onClick */Json_decode.field("onClick", Json_decode.string, json),
          /* text */Json_decode.field("text", Json_decode.string, json)
        ];
}

export {
  buttonAtom ,
  
}
/* No side effect */
