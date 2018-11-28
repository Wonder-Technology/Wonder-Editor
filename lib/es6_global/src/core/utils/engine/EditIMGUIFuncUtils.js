

import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";

function getEngineStateCustomData(_, _$1) {
  return -1;
}

function getEngineStateIMGUIFunc() {
  return (function (_, apiJsObj, engineState) {
      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
      var scene = SceneEngineService$WonderEditor.getSceneGameObject(engineState);
      var editCamera = SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState);
      var match = SceneViewEditorService$WonderEditor.unsafeGetViewRect(editorState);
      var viewHeight = match[3];
      var viewWidth = match[2];
      var imageFunc = apiJsObj.image;
      var getTransformPosition = apiJsObj.getTransformPosition;
      var unsafeGetGameObjectTransformComponent = apiJsObj.unsafeGetGameObjectTransformComponent;
      var unsafeGetGameObjectPerspectiveCameraProjectionComponent = apiJsObj.unsafeGetGameObjectPerspectiveCameraProjectionComponent;
      var unsafeGetGameObjectBasicCameraViewComponent = apiJsObj.unsafeGetGameObjectBasicCameraViewComponent;
      var getAllGameObjects = apiJsObj.getAllGameObjects;
      var hasGameObjectBasicCameraViewComponent = apiJsObj.hasGameObjectBasicCameraViewComponent;
      var hasGameObjectDirectionLightComponent = apiJsObj.hasGameObjectDirectionLightComponent;
      var hasGameObjectPointLightComponent = apiJsObj.hasGameObjectPointLightComponent;
      var convertWorldToScreen = apiJsObj.convertWorldToScreen;
      var _convertAnchorFromTopLeftToCenter = function (param, param$1) {
        return /* tuple */[
                param$1[0] - param[0] / 2,
                param$1[1] - param[1] / 2
              ];
      };
      var _getDistanceWithTwoGameObject = function (param, param$1) {
        var z2 = param$1[2];
        var y2 = param$1[1];
        var x2 = param$1[0];
        var z1 = param[2];
        var y1 = param[1];
        var x1 = param[0];
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
      };
      var _getDeepWidthAndHeight = function (width, height, maxDistance, distance) {
        var match = distance >= maxDistance;
        var coefficient = match ? 0 : (maxDistance - distance) / maxDistance;
        return /* tuple */[
                width * coefficient,
                height * coefficient
              ];
      };
      var _getSceneCameras = function (_, allGameObjects, engineState) {
        return allGameObjects.filter((function (gameObject) {
                      return hasGameObjectBasicCameraViewComponent(gameObject, engineState);
                    }));
      };
      var _getSceneDirectionLights = function (_, allGameObjects, engineState) {
        return allGameObjects.filter((function (gameObject) {
                      return hasGameObjectDirectionLightComponent(gameObject, engineState);
                    }));
      };
      var _getScenePointLights = function (_, allGameObjects, engineState) {
        return allGameObjects.filter((function (gameObject) {
                      return hasGameObjectPointLightComponent(gameObject, engineState);
                    }));
      };
      var _getEditCameraPosition = function (editCamera, engineState) {
        return getTransformPosition(unsafeGetGameObjectTransformComponent(editCamera, engineState), engineState);
      };
      var _drawDirectionLight = function (maxDistance, scene, allGameObjects, engineState) {
        return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, directionLightGameObject) {
                      var match = getTransformPosition(unsafeGetGameObjectTransformComponent(directionLightGameObject, engineState), engineState);
                      var z = match[2];
                      var y = match[1];
                      var x = match[0];
                      var match$1 = _getDeepWidthAndHeight(30, 30, maxDistance, _getDistanceWithTwoGameObject(/* tuple */[
                                x,
                                y,
                                z
                              ], _getEditCameraPosition(editCamera, engineState)));
                      var imageHeight = match$1[1];
                      var imageWidth = match$1[0];
                      var match$2 = _convertAnchorFromTopLeftToCenter(/* tuple */[
                            imageWidth,
                            imageHeight
                          ], convertWorldToScreen(unsafeGetGameObjectBasicCameraViewComponent(editCamera, engineState), unsafeGetGameObjectPerspectiveCameraProjectionComponent(editCamera, engineState), /* tuple */[
                                x,
                                y,
                                z,
                                viewWidth,
                                viewHeight
                              ], engineState));
                      return imageFunc(/* tuple */[
                                  match$2[0],
                                  match$2[1],
                                  imageWidth,
                                  imageHeight
                                ], /* tuple */[
                                  0,
                                  0,
                                  1,
                                  1
                                ], "directionLight", engineState);
                    }), engineState, _getSceneDirectionLights(scene, allGameObjects, engineState));
      };
      var _drawPointLight = function (maxDistance, scene, allGameObjects, engineState) {
        return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, pointLightGameObject) {
                      var match = getTransformPosition(unsafeGetGameObjectTransformComponent(pointLightGameObject, engineState), engineState);
                      var z = match[2];
                      var y = match[1];
                      var x = match[0];
                      var match$1 = _getDeepWidthAndHeight(30, 30, maxDistance, _getDistanceWithTwoGameObject(/* tuple */[
                                x,
                                y,
                                z
                              ], _getEditCameraPosition(editCamera, engineState)));
                      var imageHeight = match$1[1];
                      var imageWidth = match$1[0];
                      var match$2 = _convertAnchorFromTopLeftToCenter(/* tuple */[
                            imageWidth,
                            imageHeight
                          ], convertWorldToScreen(unsafeGetGameObjectBasicCameraViewComponent(editCamera, engineState), unsafeGetGameObjectPerspectiveCameraProjectionComponent(editCamera, engineState), /* tuple */[
                                x,
                                y,
                                z,
                                viewWidth,
                                viewHeight
                              ], engineState));
                      return imageFunc(/* tuple */[
                                  match$2[0],
                                  match$2[1],
                                  imageWidth,
                                  imageHeight
                                ], /* tuple */[
                                  0,
                                  0,
                                  1,
                                  1
                                ], "pointLight", engineState);
                    }), engineState, _getScenePointLights(scene, allGameObjects, engineState));
      };
      var allGameObjects = getAllGameObjects(scene, engineState);
      var maxDistance = 500;
      var scene$1 = scene;
      var allGameObjects$1 = allGameObjects;
      var engineState$1 = _drawPointLight(500, scene, allGameObjects, _drawDirectionLight(500, scene, allGameObjects, engineState));
      return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, sceneCameraGameObject) {
                    var match = getTransformPosition(unsafeGetGameObjectTransformComponent(sceneCameraGameObject, engineState), engineState);
                    var z = match[2];
                    var y = match[1];
                    var x = match[0];
                    var match$1 = _getDeepWidthAndHeight(30, 30, maxDistance, _getDistanceWithTwoGameObject(/* tuple */[
                              x,
                              y,
                              z
                            ], _getEditCameraPosition(editCamera, engineState)));
                    var imageHeight = match$1[1];
                    var imageWidth = match$1[0];
                    var match$2 = _convertAnchorFromTopLeftToCenter(/* tuple */[
                          imageWidth,
                          imageHeight
                        ], convertWorldToScreen(unsafeGetGameObjectBasicCameraViewComponent(editCamera, engineState), unsafeGetGameObjectPerspectiveCameraProjectionComponent(editCamera, engineState), /* tuple */[
                              x,
                              y,
                              z,
                              viewWidth,
                              viewHeight
                            ], engineState));
                    return imageFunc(/* tuple */[
                                match$2[0],
                                match$2[1],
                                imageWidth,
                                imageHeight
                              ], /* tuple */[
                                0,
                                0,
                                1,
                                1
                              ], "camera", engineState);
                  }), engineState$1, _getSceneCameras(scene$1, allGameObjects$1, engineState$1));
    });
}

export {
  getEngineStateCustomData ,
  getEngineStateIMGUIFunc ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
