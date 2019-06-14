

import * as ImgCanvasUtils$WonderEditor from "../../../../../../../../../../../utils/canvas/ImgCanvasUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../../../../../../../inspector/composable_component/assetTree_Inspector/utils/InspectorCanvasUtils.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../../../../../../../../../service/state/engine/LightMaterialEngineService.js";
import * as MaterialInspectorEngineUtils$WonderEditor from "../../../../../../../../inspector/composable_component/assetTree_Inspector/atom_component/material_Inspector/utils/MaterialInspectorEngineUtils.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";

function getUseTextureMaterialArray(currentNode, engineState) {
  var match = TextureNodeAssetService$WonderEditor.isTextureNode(currentNode);
  if (match) {
    var match$1 = TextureNodeAssetService$WonderEditor.getNodeData(currentNode);
    var textureComponent = match$1[/* textureComponent */0];
    return LightMaterialEngineService$WonderEditor.getAllLightMaterials(engineState).filter((function (lightMaterial) {
                  return LightMaterialEngineService$WonderEditor.isDiffuseMap(lightMaterial, textureComponent, engineState);
                }));
  }
  
}

function _createAllMaterialSnapshot(param, engineState, param$1) {
  var editorState = param$1[0];
  var match = MaterialInspectorEngineUtils$WonderEditor.createMaterialSphereIntoInspectorCanvas(/* LightMaterial */1, param[1], editorState, engineState, InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
            editorState,
            param$1[1]
          ]));
  var inspectorEngineState = StateLogicService$WonderEditor.renderInspectorEngineStateAndReturnState(InspectorCanvasUtils$WonderEditor.restoreArcballCameraControllerAngle(match[1][0]));
  var editorState$1 = ImgCanvasUtils$WonderEditor.clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNode(document.getElementById("inspector-canvas"), document.getElementById("img-canvas"), param[0], match[0]);
  return /* tuple */[
          editorState$1,
          inspectorEngineState
        ];
}

function redrawAllMaterialSetToImageDataMap(useTextureMaterialArray, engineState, param) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, materialComponent) {
                var inspectorEngineState = param[1];
                var editorState = param[0];
                var match = OperateTreeAssetEditorService$WonderEditor.findMaterialNode(materialComponent, /* LightMaterial */1, editorState);
                if (match !== undefined) {
                  return _createAllMaterialSnapshot(/* tuple */[
                              match,
                              materialComponent
                            ], engineState, /* tuple */[
                              editorState,
                              inspectorEngineState
                            ]);
                } else {
                  return /* tuple */[
                          editorState,
                          inspectorEngineState
                        ];
                }
              }), /* tuple */[
              param[0],
              param[1]
            ], useTextureMaterialArray);
}

export {
  getUseTextureMaterialArray ,
  _createAllMaterialSnapshot ,
  redrawAllMaterialSetToImageDataMap ,
  
}
/* ImgCanvasUtils-WonderEditor Not a pure module */
