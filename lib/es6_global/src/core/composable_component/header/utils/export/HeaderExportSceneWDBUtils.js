

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as SparseMapService$WonderEditor from "../../../../../service/atom/SparseMapService.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as ImageNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/ImageNodeMapAssetEditorService.js";
import * as TextureNodeMapAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TextureNodeMapAssetEditorService.js";
import * as ArcballCameraControllerLogicService$WonderEditor from "../../../../../service/stateTuple/logic/ArcballCameraControllerLogicService.js";

function _buildImageUint8ArrayMap(editorState) {
  return SparseMapService$WonderEditor.reduce((function (map, param) {
                var match = ImageNodeMapAssetEditorService$WonderEditor.unsafeGetResult(param[/* image */1], editorState);
                var uint8Array = match[/* uint8Array */1];
                if (uint8Array !== undefined) {
                  return SparseMapService$WonderCommonlib.set(param[/* textureComponent */0], /* tuple */[
                              match[/* mimeType */4],
                              Js_primitive.valFromOption(uint8Array)
                            ], map);
                } else {
                  return map;
                }
              }), SparseMapService$WonderCommonlib.createEmpty(/* () */0), TextureNodeMapAssetEditorService$WonderEditor.getValidValues(editorState));
}

function generateWDB(rootGameObject, generateWDBFunc, param) {
  var engineState = param[1];
  var isRun = StateEditorService$WonderEditor.getIsRun(/* () */0);
  var engineState$1 = isRun ? engineState : ArcballCameraControllerLogicService$WonderEditor.bindGameViewActiveCameraArcballCameraControllerEvent(engineState);
  var match = Curry._3(generateWDBFunc, rootGameObject, _buildImageUint8ArrayMap(param[0]), engineState$1);
  var engineState$2 = match[0];
  var engineState$3 = isRun ? engineState$2 : ArcballCameraControllerLogicService$WonderEditor.unbindGameViewActiveCameraArcballCameraControllerEvent(engineState$2);
  return /* tuple */[
          engineState$3,
          match[2]
        ];
}

function generateSceneWDB(generateWDBFunc, param) {
  var engineState = param[1];
  return generateWDB(SceneEngineService$WonderEditor.getSceneGameObject(engineState), generateWDBFunc, /* tuple */[
              param[0],
              engineState
            ]);
}

export {
  _buildImageUint8ArrayMap ,
  generateWDB ,
  generateSceneWDB ,
  
}
/* SparseMapService-WonderEditor Not a pure module */
