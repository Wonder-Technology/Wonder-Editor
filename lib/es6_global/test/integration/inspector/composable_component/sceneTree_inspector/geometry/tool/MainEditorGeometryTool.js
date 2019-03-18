

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as MainEditorGeometry$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/geometry/ui/MainEditorGeometry.js";
import * as StateEditorService$WonderEditor from "../../../../../../../src/service/state/editor/StateEditorService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../../../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as PrepareDefaultComponentLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/PrepareDefaultComponentLogicService.js";

function getBoxTexturedGeometryName(param) {
  return "Mesh";
}

function getDefaultCubeGeometryComponent($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return GeometryDataAssetEditorService$WonderEditor.getGeometryData(editorState)[/* defaultCubeGeometryComponent */0];
}

function getDefaultSphereGeometryComponent($staropt$star, param) {
  var editorState = $staropt$star !== undefined ? $staropt$star : StateEditorService$WonderEditor.getState(/* () */0);
  return GeometryDataAssetEditorService$WonderEditor.getGeometryData(editorState)[/* defaultSphereGeometryComponent */1];
}

function changeGeometry(sourceGeometry, targetGeometry, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var gameObject = $staropt$star !== undefined ? $staropt$star : GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MainEditorGeometry$WonderEditor.Method[/* changeGeometry */0], /* tuple */[
              uiState,
              dispatchFunc
            ], gameObject, /* tuple */[
              sourceGeometry,
              targetGeometry
            ]);
}

function getAllShowGeometrys(gameObject, engineState) {
  return MainEditorGeometry$WonderEditor.Method[/* _getAllShowGeometrys */5](gameObject, engineState);
}

var getDefaultCubeGeometryName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultCubeGeometryName;

var getDefaultSphereGeometryName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultSphereGeometryName;

export {
  getDefaultCubeGeometryName ,
  getDefaultSphereGeometryName ,
  getBoxTexturedGeometryName ,
  getDefaultCubeGeometryComponent ,
  getDefaultSphereGeometryComponent ,
  changeGeometry ,
  getAllShowGeometrys ,
  
}
/* TestTool-WonderEditor Not a pure module */
