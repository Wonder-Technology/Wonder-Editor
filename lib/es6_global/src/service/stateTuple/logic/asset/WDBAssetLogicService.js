

import * as Most from "most";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ImageUtils$WonderEditor from "../../../../core/composable_component/header/utils/ImageUtils.js";
import * as ImgCanvasUtils$WonderEditor from "../../../../core/utils/canvas/ImgCanvasUtils.js";
import * as NodeAssetService$WonderEditor from "../../../record/editor/asset/NodeAssetService.js";
import * as StateLogicService$WonderEditor from "../StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../state/engine/state/StateEngineService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../record/editor/asset/WDBNodeAssetService.js";
import * as InspectorCanvasUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/utils/InspectorCanvasUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/GameObjectEngineService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../state/editor/asset/IndexAssetEditorService.js";
import * as WDBInspectorEngineUtils$WonderEditor from "../../../../core/composable_component/mainEditor/composable_component/inspector/composable_component/assetTree_Inspector/atom_component/wdb_inspector/utils/WDBInspectorEngineUtils.js";
import * as AssembleWDBEngineService$WonderEditor from "../../../state/engine/AssembleWDBEngineService.js";
import * as ImageDataMapAssetService$WonderEditor from "../../../record/editor/asset/ImageDataMapAssetService.js";
import * as StateInspectorEngineService$WonderEditor from "../../../state/inspectorEngine/StateInspectorEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../state/editor/asset/OperateTreeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../state/editor/asset/ImageDataMapAssetEditorService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _createWDBNodeAndSnapshot(parentFolderNode, param, editorState) {
  var name = param[1];
  var wdbNodeId = param[0];
  var match = IndexAssetEditorService$WonderEditor.generateImageDataMapIndex(editorState);
  var newImageDataIndex = match[1];
  return ImgCanvasUtils$WonderEditor.clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId(document.getElementById("inspector-canvas"), document.getElementById("img-canvas"), wdbNodeId, ImageDataMapAssetEditorService$WonderEditor.setData(newImageDataIndex, ImageDataMapAssetService$WonderEditor.buildData(undefined, undefined, name, ImageUtils$WonderEditor.getDefaultMimeType(/* () */0), Caml_option.some(undefined), /* () */0), OperateTreeAssetEditorService$WonderEditor.insertNode(NodeAssetService$WonderEditor.getNodeId(parentFolderNode), WDBNodeAssetService$WonderEditor.buildNode(wdbNodeId, name, param[2], newImageDataIndex), match[0])));
}

function createWDBNodeUseImageDataMapSnapshot(param, param$1, editorState) {
  return OperateTreeAssetEditorService$WonderEditor.insertNode(NodeAssetService$WonderEditor.getNodeId(param$1[3]), WDBNodeAssetService$WonderEditor.buildNode(param$1[0], param$1[1], param$1[2], ImmutableSparseMapService$WonderCommonlib.unsafeGet(param[1], param[0])), editorState);
}

function createWDBNodeUseCreatedSnapshot(param, editorState) {
  var gameObject = param[2];
  var match = WDBInspectorEngineUtils$WonderEditor.createWDBIntoInspectorCanvas(gameObject, editorState, StateEngineService$WonderEditor.unsafeGetState(/* () */0), InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
            editorState,
            StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)
          ]));
  var inspectorEngineState = StateLogicService$WonderEditor.renderInspectorEngineStateAndReturnState(InspectorCanvasUtils$WonderEditor.restoreArcballCameraControllerAngle(WDBInspectorEngineUtils$WonderEditor.setCameraFocusWDBGameObject(match[0], match[2])));
  var editorState$1 = _createWDBNodeAndSnapshot(param[3], /* tuple */[
        param[0],
        param[1],
        gameObject
      ], match[1]);
  StateInspectorEngineService$WonderEditor.setState(InspectorCanvasUtils$WonderEditor.setCameraDefaultDistance(InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
                editorState$1,
                inspectorEngineState
              ])));
  return editorState$1;
}

function importAssetWDB(param, param$1, createWDBNodeFunc, param$2) {
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
                      StateEditorService$WonderEditor.setState(Curry._2(createWDBNodeFunc, /* tuple */[
                                wdbNodeId,
                                name,
                                gameObject,
                                parentFolderNode
                              ], editorState));
                      StateEngineService$WonderEditor.setState(GameObjectEngineService$WonderEditor.setGameObjectName(name, gameObject, GameObjectEngineService$WonderEditor.setAllGameObjectsIsRenderIfHasMeshRenderer(false, gameObject, engineState)));
                      allGameObjectsRef[0] = allGameObjects;
                      imageUint8ArrayDataMapRef[0] = param[1][0];
                      return /* () */0;
                    }), AssembleWDBEngineService$WonderEditor.assembleWDB(param[1], false, false, false, false, param$1[2], param$2[1]))).then((function (param) {
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
  _createWDBNodeAndSnapshot ,
  createWDBNodeUseImageDataMapSnapshot ,
  createWDBNodeUseCreatedSnapshot ,
  importAssetWDB ,
  
}
/* most Not a pure module */
