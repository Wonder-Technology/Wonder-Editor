

import * as Most from "most";
import * as AssetTreeUtils$WonderEditor from "../composable_component/utils/AssetTreeUtils.js";
import * as GameObjectUtils$WonderEditor from "../../../../../../../../../utils/engine/GameObjectUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GameObjectEngineService.js";
import * as AssembleWDBEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/AssembleWDBEngineService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";

function importAssetWDB(param, param$1, param$2) {
  var editorState = param$2[0];
  var parentFolderNodeId = param$1[1];
  var wdbNodeId = param$1[0];
  var wdbArrayBuffer = param[1];
  var name = param[0];
  var allGameObjectsRef = /* record */[/* contents : array */[]];
  var imageUint8ArrayDataMapRef = /* record */[/* contents */SparseMapService$WonderCommonlib.createEmpty(/* () */0)];
  return Most.drain(Most.tap((function (param) {
                      var gameObject = param[2];
                      var engineState = param[0];
                      var allGameObjects = GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState);
                      StateEditorService$WonderEditor.setState(AssetTreeUtils$WonderEditor.createNodeAndAddToTargetNodeChildren(parentFolderNodeId, wdbNodeId, /* WDB */2, WDBNodeMapAssetEditorService$WonderEditor.setResult(wdbNodeId, WDBNodeMapAssetEditorService$WonderEditor.buildWDBNodeResult(name, parentFolderNodeId, gameObject, wdbArrayBuffer), editorState)));
                      var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName(name, gameObject, GameObjectUtils$WonderEditor.setAllGameObjectsIsRenderIfHasMeshRenderer(false, gameObject, engineState));
                      StateEngineService$WonderEditor.setState(engineState$1);
                      allGameObjectsRef[0] = allGameObjects;
                      imageUint8ArrayDataMapRef[0] = param[1][0];
                      return /* () */0;
                    }), AssembleWDBEngineService$WonderEditor.assembleWDB(wdbArrayBuffer, false, false, false, false, true, param$2[1]))).then((function () {
                return Promise.resolve(/* tuple */[
                            /* tuple */[
                              allGameObjectsRef[0],
                              imageUint8ArrayDataMapRef[0]
                            ],
                            /* tuple */[
                              StateEditorService$WonderEditor.getState(/* () */0),
                              StateEngineService$WonderEditor.unsafeGetState(/* () */0)
                            ]
                          ]);
              }));
}

export {
  importAssetWDB ,
  
}
/* most Not a pure module */
