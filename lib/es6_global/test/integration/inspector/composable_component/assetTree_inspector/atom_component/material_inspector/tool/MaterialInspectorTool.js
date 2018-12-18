

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as MaterialInspector$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/material_Inspector/ui/MaterialInspector.js";

function changeMaterialType(material, sourceMaterialType, targetMaterialType, materialNodeId, $staropt$star, $staropt$star$1, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MaterialInspector$WonderEditor.Method[/* changeMaterialType */0], /* tuple */[
              store,
              dispatchFunc
            ], /* tuple */[
              materialNodeId,
              material
            ], /* tuple */[
              sourceMaterialType,
              targetMaterialType
            ]);
}

export {
  changeMaterialType ,
  
}
/* TestTool-WonderEditor Not a pure module */
