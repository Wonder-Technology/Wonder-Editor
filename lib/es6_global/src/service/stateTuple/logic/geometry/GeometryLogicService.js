

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as PickingEditorService$WonderEditor from "../../../state/editor/picking/PickingEditorService.js";

function setGeometryPoints(geometry, points, setFunc, param) {
  return /* tuple */[
          PickingEditorService$WonderEditor.removeSphereShape(geometry, param[0]),
          Curry._3(setFunc, geometry, points, param[1])
        ];
}

export {
  setGeometryPoints ,
  
}
/* PickingEditorService-WonderEditor Not a pure module */
