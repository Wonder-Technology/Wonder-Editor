

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Zip$WonderBsJszip from "../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as MainEditorAssetIdTool$WonderEditor from "./MainEditorAssetIdTool.js";
import * as AssetHeaderFileLoadEventHandler$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/header/eventHandler/AssetHeaderFileLoadEventHandler.js";

function loadOneTexture($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var imgName = $staropt$star$2 !== undefined ? $staropt$star$2 : "loadImg.png";
  var imgSrc = $staropt$star$3 !== undefined ? $staropt$star$3 : "newImgBase64";
  var uploadedTextureNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                store,
                dispatchFunc
              ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildOneTextureFileEvent(imgName, imgSrc, /* () */0)).then((function (param) {
                return Promise.resolve(uploadedTextureNodeId);
              }));
}

function loadOneWDB(arrayBuffer, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "Wdb";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                store,
                dispatchFunc
              ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildWDBFileEvent(fileName, arrayBuffer)).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

function loadOneGLB(arrayBuffer, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "Glb";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                store,
                dispatchFunc
              ], Zip$WonderBsJszip.create, BaseEventTool$WonderEditor.buildGLBFileEvent(fileName, arrayBuffer)).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

function loadOneGLTFZip(sandbox, createJsZipFunc, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var fileName = $staropt$star$2 !== undefined ? $staropt$star$2 : "GltfZip";
  var uploadedWDBNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  return Curry._3(AssetHeaderFileLoadEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
                store,
                dispatchFunc
              ], createJsZipFunc, BaseEventTool$WonderEditor.buildGLTFZipFileEvent(fileName)).then((function (param) {
                return Promise.resolve(uploadedWDBNodeId);
              }));
}

export {
  loadOneTexture ,
  loadOneWDB ,
  loadOneGLB ,
  loadOneGLTFZip ,
  
}
/* Zip-WonderBsJszip Not a pure module */
