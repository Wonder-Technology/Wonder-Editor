

import * as Json_decode$WonderBsJson from "../../../../../../node_modules/wonder-bs-json/lib/es6_global/src/Json_decode.js";
import * as GameObject_all_component$WonderEditor from "../data/GameObject_all_component.js";

function convertDataToRecord(jsonData) {
  return Json_decode$WonderBsJson.array((function (json) {
                return /* record */[
                        /* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json),
                        /* include_component */Json_decode$WonderBsJson.field("include_component", (function (param) {
                                return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.string, param);
                              }), json),
                        /* exclude_component */Json_decode$WonderBsJson.field("exclude_component", (function (param) {
                                return Json_decode$WonderBsJson.array(Json_decode$WonderBsJson.string, param);
                              }), json),
                        /* all_component */Json_decode$WonderBsJson.field("all_component", (function (param) {
                                return Json_decode$WonderBsJson.array((function (json) {
                                              return /* record */[/* type_ */Json_decode$WonderBsJson.field("type", Json_decode$WonderBsJson.string, json)];
                                            }), param);
                              }), json)
                      ];
              }), JSON.parse(jsonData));
}

function getGameObjectAllComponentConfig() {
  return convertDataToRecord(GameObject_all_component$WonderEditor.gameObject_all_component);
}

export {
  convertDataToRecord ,
  getGameObjectAllComponentConfig ,
  
}
/* No side effect */
