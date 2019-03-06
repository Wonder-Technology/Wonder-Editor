

import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SceneEngineService$WonderEditor from "../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../service/state/editor/StateEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as TransformEngineService$WonderEditor from "../../../../../service/state/engine/TransformEngineService.js";
import * as CoordinateEngineService$WonderEditor from "../../../../../service/state/engine/CoordinateEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function buildCustomData(editorState, engineState) {
  return -1;
}

function _convertAnchorFromTopLeftToCenter(param, param$1) {
  return /* tuple */[
          param$1[0] - param[0] / 2,
          param$1[1] - param[1] / 2
        ];
}

function _getDistanceWithTwoGameObject(param, param$1) {
  var z2 = param$1[2];
  var y2 = param$1[1];
  var x2 = param$1[0];
  var z1 = param[2];
  var y1 = param[1];
  var x1 = param[0];
  return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
}

function _computeSize(width, height, maxDistance, distance) {
  var match = distance >= maxDistance;
  var factor = match ? 0 : (maxDistance - distance) / maxDistance;
  return /* tuple */[
          width * factor,
          height * factor
        ];
}

function _getSceneCameras(scene, allGameObjects, engineState) {
  return allGameObjects.filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(gameObject, engineState);
              }));
}

function _getSceneDirectionLights(scene, allGameObjects, engineState) {
  return allGameObjects.filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasDirectionLightComponent(gameObject, engineState);
              }));
}

function _getScenePointLights(scene, allGameObjects, engineState) {
  return allGameObjects.filter((function (gameObject) {
                return GameObjectComponentEngineService$WonderEditor.hasPointLightComponent(gameObject, engineState);
              }));
}

function getIMGUIGameObjects(scene, engineState) {
  var allGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(scene, engineState);
  return ArrayService$WonderEditor.fastConcatArrays(/* array */[
              _getSceneCameras(scene, allGameObjects, engineState),
              _getSceneDirectionLights(scene, allGameObjects, engineState),
              _getScenePointLights(scene, allGameObjects, engineState)
            ]);
}

function _getEditCameraPosition(editCamera, engineState) {
  return TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(editCamera, engineState), engineState);
}

function _convertPosition(param, param$1, editCamera, engineState) {
  return _convertAnchorFromTopLeftToCenter(/* tuple */[
              param$1[0],
              param$1[1]
            ], CoordinateEngineService$WonderEditor.convertWorldToScreen(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(editCamera, engineState), GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(editCamera, engineState), /* tuple */[
                  param[0],
                  param[1],
                  param[2],
                  param[3],
                  param[4]
                ], engineState));
}

function _getImageMaxWidth(param) {
  return 30;
}

function _getImageMaxHeight(param) {
  return 30;
}

function _getMaxDistance(param) {
  return 500;
}

function computePositionAndSize(gameObject, editorState, engineState) {
  var editCamera = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
  var match = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
  var match$1 = TransformEngineService$WonderEditor.getPosition(GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState), engineState);
  var z = match$1[2];
  var y = match$1[1];
  var x = match$1[0];
  var match$2 = _computeSize(30, 30, 500, _getDistanceWithTwoGameObject(/* tuple */[
            x,
            y,
            z
          ], _getEditCameraPosition(editCamera, engineState)));
  var imageHeight = match$2[1];
  var imageWidth = match$2[0];
  var match$3 = _convertPosition(/* tuple */[
        x,
        y,
        z,
        match[2],
        match[3]
      ], /* tuple */[
        imageWidth,
        imageHeight
      ], editCamera, engineState);
  return /* tuple */[
          match$3[0],
          match$3[1],
          imageWidth,
          imageHeight
        ];
}

function _drawLight(param, imageFunc, editorState, engineState) {
  var name = param[3];
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, directionLightGameObject) {
                var match = computePositionAndSize(directionLightGameObject, editorState, engineState);
                return imageFunc(/* tuple */[
                            match[0],
                            match[1],
                            match[2],
                            match[3]
                          ], /* tuple */[
                            0,
                            0,
                            1,
                            1
                          ], name, engineState);
              }), engineState, param[4]);
}

function _drawDirectionLight(param, imageFunc, editorState, engineState) {
  var allGameObjects = param[2];
  var scene = param[1];
  return _drawLight(/* tuple */[
              param[0],
              scene,
              allGameObjects,
              "directionLight",
              _getSceneDirectionLights(scene, allGameObjects, engineState)
            ], imageFunc, editorState, engineState);
}

function _drawPointLight(param, imageFunc, editorState, engineState) {
  var allGameObjects = param[2];
  var scene = param[1];
  return _drawLight(/* tuple */[
              param[0],
              scene,
              allGameObjects,
              "pointLight",
              _getScenePointLights(scene, allGameObjects, engineState)
            ], imageFunc, editorState, engineState);
}

function _drawSceneCamera(param, imageFunc, editorState, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, sceneCameraGameObject) {
                var match = computePositionAndSize(sceneCameraGameObject, editorState, engineState);
                return imageFunc(/* tuple */[
                            match[0],
                            match[1],
                            match[2],
                            match[3]
                          ], /* tuple */[
                            0,
                            0,
                            1,
                            1
                          ], "camera", engineState);
              }), engineState, _getSceneCameras(param[1], param[2], engineState));
}

function buildIMGUIFunc(param) {
  return (function (param, apiJsObj, engineState) {
      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
      var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState);
      var imageFunc = apiJsObj.image;
      var allGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(scene, engineState);
      return _drawSceneCamera(/* tuple */[
                  500,
                  scene,
                  allGameObjects
                ], imageFunc, editorState, _drawPointLight(/* tuple */[
                      500,
                      scene,
                      allGameObjects
                    ], imageFunc, editorState, _drawDirectionLight(/* tuple */[
                          500,
                          scene,
                          allGameObjects
                        ], imageFunc, editorState, engineState)));
    });
}

export {
  buildCustomData ,
  _convertAnchorFromTopLeftToCenter ,
  _getDistanceWithTwoGameObject ,
  _computeSize ,
  _getSceneCameras ,
  _getSceneDirectionLights ,
  _getScenePointLights ,
  getIMGUIGameObjects ,
  _getEditCameraPosition ,
  _convertPosition ,
  _getImageMaxWidth ,
  _getImageMaxHeight ,
  _getMaxDistance ,
  computePositionAndSize ,
  _drawLight ,
  _drawDirectionLight ,
  _drawPointLight ,
  _drawSceneCamera ,
  buildIMGUIFunc ,
  
}
/* ArrayService-WonderEditor Not a pure module */
