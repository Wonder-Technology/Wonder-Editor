'use strict';

import * as Json_decode                           from "../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";
import * as GameObject_all_component$WonderEditor from "../data/gameObject_all_component.js";

function convertDataToRecord(jsonData) {
  return Json_decode.array((function (json) {
                return /* record */[
                        /* type_ */Json_decode.field("type", Json_decode.string, json),
                        /* include_component */Json_decode.field("include_component", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), json),
                        /* exclude_component */Json_decode.field("exclude_component", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), json),
                        /* all_component */Json_decode.field("all_component", (function (param) {
                                return Json_decode.array((function (json) {
                                              return /* record */[/* type_ */Json_decode.field("type", Json_decode.string, json)];
                                            }), param);
                              }), json)
                      ];
              }), JSON.parse(jsonData));
}

function getGameObjectAllComponentConfig() {
  return convertDataToRecord(GameObject_all_component$WonderEditor.gameObject_all_component);
}

export {
  convertDataToRecord             ,
  getGameObjectAllComponentConfig ,
  
}
/* No side effect */
