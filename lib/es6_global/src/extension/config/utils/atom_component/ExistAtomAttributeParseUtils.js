'use strict';

import * as Json_decode                       from "../../../../../../../node_modules/bs-json/lib/es6_global/src/Json_decode.js";
import * as Exist_Atom_attribute$WonderEditor from "../../data/atom_component/Exist_Atom_attribute.js";

function convertDataToRecord(jsonData) {
  return Json_decode.array((function (json) {
                return /* record */[
                        /* name */Json_decode.field("name", Json_decode.string, json),
                        /* existProps */Json_decode.field("existProps", (function (param) {
                                return Json_decode.array((function (json) {
                                              return /* record */[/* name */Json_decode.field("name", Json_decode.string, json)];
                                            }), param);
                              }), json)
                      ];
              }), JSON.parse(jsonData));
}

function getAtomAttributeRecord() {
  return convertDataToRecord(Exist_Atom_attribute$WonderEditor.atom_attibute);
}

export {
  convertDataToRecord    ,
  getAtomAttributeRecord ,
  
}
/* No side effect */
