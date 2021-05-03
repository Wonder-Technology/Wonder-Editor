

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../../tool/GameObjectTool.js";
import * as MainEditorMaterial$WonderEditor from "../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/renderGroup/material/ui/MainEditorMaterial.js";
import * as PrepareDefaultComponentLogicService$WonderEditor from "../../../../../../../../src/service/stateTuple/logic/PrepareDefaultComponentLogicService.js";

function changeMaterial(sourceMaterial, sourceMaterialType, targetMaterial, targetMaterialType, materialNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, _) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorMaterial$WonderEditor.Method[/* changeMaterial */1], /* tuple */[
              store,
              dispatchFunc
            ], gameObject, /* tuple */[
              materialNodeId,
              /* tuple */[
                sourceMaterial,
                targetMaterial
              ],
              /* tuple */[
                sourceMaterialType,
                targetMaterialType
              ]
            ]);
}

var getDefaultBasicMaterialName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultBasicMaterialName;

var getDefaultLightMaterialName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultLightMaterialName;

export {
  changeMaterial ,
  getDefaultBasicMaterialName ,
  getDefaultLightMaterialName ,
  
}
/* TestTool-WonderEditor Not a pure module */
