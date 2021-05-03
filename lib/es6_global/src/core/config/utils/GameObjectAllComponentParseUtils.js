

import * as Json_decode$WonderBsJson from "../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";
import * as GameObject_all_component$WonderEditor from "../data/GameObject_all_component.js";

function convertDataToRecord(jsonData) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json),
                        /* components */Json_decode$WonderBsJson.field("components", (function (param) {
                                return Json_decode$WonderBsJson.array((function (json) {
                                              return /* record */[/* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json)];
                                            }), param);
                              }), json)
                      ];
              }), JSON.parse(jsonData));
}

function getGameObjectAllComponentConfig(param) {
  return convertDataToRecord(GameObject_all_component$WonderEditor.gameObject_all_component);
}

export {
  convertDataToRecord ,
  getGameObjectAllComponentConfig ,
  
}
/* No side effect */
