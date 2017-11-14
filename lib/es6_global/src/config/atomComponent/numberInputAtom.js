'use strict';

import * as Json_decode from "../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";

function numberInputAtom(json) {
  return /* record */[
          /* label */Json_decode.optional((function (param) {
                  return Json_decode.field("label", Json_decode.string, param);
                }), json),
          /* defaultValue */Json_decode.optional((function (param) {
                  return Json_decode.field("defaultValue", Json_decode.string, param);
                }), json),
          /* onChange */Json_decode.optional((function (param) {
                  return Json_decode.field("onChange", Json_decode.string, param);
                }), json)
        ];
}

export {
  numberInputAtom ,
  
}
/* No side effect */
