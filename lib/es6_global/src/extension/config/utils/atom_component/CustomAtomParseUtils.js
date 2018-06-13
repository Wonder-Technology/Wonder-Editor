

import * as Json_decode from "../../../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";

function convertDataToRecord(jsonData) {
  return Json_decode.array((function (json) {
                return /* record */[
                        /* name */Json_decode.field("name", Json_decode.string, json),
                        /* className */Json_decode.field("className", Json_decode.string, json),
                        /* props */Json_decode.field("props", (function (param) {
                                return Json_decode.array((function (json) {
                                              return /* record */[
                                                      /* name */Json_decode.field("name", Json_decode.string, json),
                                                      /* value */Json_decode.field("value", Json_decode.string, json),
                                                      /* type_ */Json_decode.field("type", Json_decode.string, json)
                                                    ];
                                            }), param);
                              }), json)
                      ];
              }), JSON.parse(jsonData));
}

export {
  convertDataToRecord ,
  
}
/* No side effect */
