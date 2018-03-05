'use strict';

import * as Js_primitive                  from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as AppExtensionBuss$WonderEditor from "../buss/AppExtensionBuss.js";

function getExtension(key) {
  return Js_primitive.undefined_to_opt(AppExtensionBuss$WonderEditor.getExtension(key));
}

var setExtension = AppExtensionBuss$WonderEditor.setExtension;

export {
  getExtension ,
  setExtension ,
  
}
/* AppExtensionBuss-WonderEditor Not a pure module */
