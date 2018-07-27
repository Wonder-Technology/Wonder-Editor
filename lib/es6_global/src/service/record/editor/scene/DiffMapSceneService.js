

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function unsafeGetDiffMap(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* diffMap */1]);
}

function setDiffMap(diffMap, sceneRecord) {
  return /* record */[
          /* currentSceneTreeNode */sceneRecord[/* currentSceneTreeNode */0],
          /* diffMap */Js_primitive.some(diffMap),
          /* isRun */sceneRecord[/* isRun */2]
        ];
}

export {
  unsafeGetDiffMap ,
  setDiffMap ,
  
}
/* OptionService-WonderEditor Not a pure module */
