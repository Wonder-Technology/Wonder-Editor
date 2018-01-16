'use strict';

import * as Json_decode from "../../../../../../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";

function convertDataToRecord(jsonData) {
  return Json_decode.array((function (json) {
                return /* record */[/* componentName */Json_decode.field("type_", Json_decode.string, json)];
              }), JSON.parse(jsonData));
}

export {
  convertDataToRecord ,
  
}
/* No side effect */
