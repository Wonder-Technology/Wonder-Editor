

import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";

function unsafeGetDiffMap(sceneRecord) {
  return OptionService$WonderEditor.unsafeGet(sceneRecord[/* diffMap */2]);
}

function setDiffMap(diffMap, sceneRecord) {
  return /* record */[
          /* root */sceneRecord[/* root */0],
          /* currentSceneTreeNode */sceneRecord[/* currentSceneTreeNode */1],
          /* diffMap */Js_primitive.some(diffMap),
          /* isRun */sceneRecord[/* isRun */3]
        ];
}

export {
  unsafeGetDiffMap ,
  setDiffMap ,
  
}
/* OptionService-WonderEditor Not a pure module */
