

import * as Most from "most";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as StateEditorService$WonderEditor from "../../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../state/engine/state/StateEngineService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as AssembleWDBEngineService$WonderEditor from "../../../state/engine/AssembleWDBEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/OperateTreeAssetEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/HierarchyGameObjectEngineService.js";

function importAssetWDB(param, param$1, isLoadImage, param$2) {
  var editorState = param$2[0];
  var parentFolderNode = param$1[1];
  var wdbNodeId = param$1[0];
  var name = param[0];
  var allGameObjectsRef = /* record */[/* contents : array */[]];
  var imageUint8ArrayDataMapRef = /* record */[/* contents */ImmutableSparseMapService$WonderCommonlib.createEmpty(/* () */0)];
  return Most.drain(Most.tap((function (param) {
                      var gameObject = param[2];
                      var engineState = param[0];
                      var allGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState);
                      StateEditorService$WonderEditor.setState(OperateTreeAssetEditorService$WonderEditor.insertNode(NodeAssetService$WonderEditor.getNodeId(parentFolderNode), WDBNodeAssetService$WonderEditor.buildNode(wdbNodeId, name, gameObject), editorState));
                      var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName(name, gameObject, GameObjectEngineService$WonderEditor.setAllGameObjectsIsRenderIfHasMeshRenderer(false, gameObject, engineState));
                      StateEngineService$WonderEditor.setState(engineState$1);
                      allGameObjectsRef[0] = allGameObjects;
                      imageUint8ArrayDataMapRef[0] = param[1][0];
                      return /* () */0;
                    }), AssembleWDBEngineService$WonderEditor.assembleWDB(param[1], false, false, false, false, isLoadImage, param$2[1]))).then((function () {
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
