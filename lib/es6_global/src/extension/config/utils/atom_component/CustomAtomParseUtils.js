

import * as Json_decode$WonderBsJson from "../../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";

function convertDataToRecord(jsonData) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                        /* className */Json_decode$WonderBsJson.field("className", Json_decode$WonderBsJson.string, json),
                        /* props */Json_decode$WonderBsJson.field("props", (function (param) {
                                return Json_decode$WonderBsJson.array((function (json) {
                                              return /* record */[
                                                      /* name */Json_decode$WonderBsJson.field("name", Json_decode$WonderBsJson.string, json),
                                                      /* value */Json_decode$WonderBsJson.field("value", Json_decode$WonderBsJson.string, json),
                                                      /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json)
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
