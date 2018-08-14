

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../service/state/engine/ManageIMGUIEngineService.js";

function setIMGUIFunc(editEngineState) {
  return ManageIMGUIEngineService$WonderEditor.setIMGUIFunc(/* tuple */[
              ArrayService$WonderCommonlib.reduceOneParam,
              (function (prim) {
                  return document.getElementById(prim);
                })
            ], (function (param, apiJsObj, state) {
                var reduceOneParamFunc = param[0];
                var editCanvas = Curry._1(param[1], "editCanvas");
                var editCanvasWidth = editCanvas.width;
                var editCanvasHeight = editCanvas.height;
                var imageFunc = apiJsObj.image;
                var getTransformPosition = apiJsObj.getTransformPosition;
                var unsafeGetGameObjectTransformComponent = apiJsObj.unsafeGetGameObjectTransformComponent;
                var unsafeGetGameObjectPerspectiveCameraProjectionComponent = apiJsObj.unsafeGetGameObjectPerspectiveCameraProjectionComponent;
                var unsafeGetGameObjectBasicCameraViewComponent = apiJsObj.unsafeGetGameObjectBasicCameraViewComponent;
                var getAllDirectionLightComponents = apiJsObj.getAllDirectionLightComponents;
                var getAllPointLightComponents = apiJsObj.getAllPointLightComponents;
                var getAllBasicCameraViewComponents = apiJsObj.getAllBasicCameraViewComponents;
                apiJsObj.unsafeGetTransformGameObject;
                var unsafeGetDirectionLightGameObject = apiJsObj.unsafeGetDirectionLightGameObject;
                var unsafeGetPointLightGameObject = apiJsObj.unsafeGetPointLightGameObject;
                var unsafeGetBasicCameraViewGameObject = apiJsObj.unsafeGetBasicCameraViewGameObject;
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
                var _getEditEngineServiceCameraGameObjects = function (engineState) {
                  return getAllBasicCameraViewComponents(engineState).map((function (basicCameraView) {
                                return unsafeGetBasicCameraViewGameObject(basicCameraView, engineState);
                              }));
                };
                var _getEditEngineServiceDirectionLightGameObjects = function (engineState) {
                  return getAllDirectionLightComponents(engineState).map((function (directionLight) {
                                return unsafeGetDirectionLightGameObject(directionLight, engineState);
                              }));
                };
                var _getEditEngineServicePointLightGameObjects = function (engineState) {
                  return getAllPointLightComponents(engineState).map((function (directionLight) {
                                return unsafeGetPointLightGameObject(directionLight, engineState);
                              }));
                };
                var _getEditCameraPosition = function (editCamera, engineState) {
                  return getTransformPosition(unsafeGetGameObjectTransformComponent(editCamera, engineState), engineState);
                };
                var _drawDirectionLight = function (maxDistance, engineState) {
                  var editCamera = _getEditEngineServiceCameraGameObjects(engineState)[0];
                  return reduceOneParamFunc((function (engineState, directionLightGameObject) {
                                var match = getTransformPosition(unsafeGetGameObjectTransformComponent(directionLightGameObject, engineState), engineState);
                                var z = match[2];
                                var y = match[1];
                                var x = match[0];
                                var match$1 = _getDeepWidthAndHeight(80, 80, maxDistance, _getDistanceWithTwoGameObject(/* tuple */[
                                          x,
                                          y,
                                          z
                                        ], _getEditCameraPosition(editCamera, engineState)));
                                var match$2 = _convertAnchorFromTopLeftToCenter(/* tuple */[
                                      80,
                                      80
                                    ], convertWorldToScreen(unsafeGetGameObjectBasicCameraViewComponent(editCamera, engineState), unsafeGetGameObjectPerspectiveCameraProjectionComponent(editCamera, engineState), /* tuple */[
                                          x,
                                          y,
                                          z,
                                          editCanvasWidth,
                                          editCanvasHeight
                                        ], engineState));
                                return imageFunc(/* tuple */[
                                            match$2[0],
                                            match$2[1],
                                            match$1[0],
                                            match$1[1]
                                          ], /* tuple */[
                                            0,
                                            0,
                                            1,
                                            1
                                          ], "directionLight", engineState);
                              }), engineState, _getEditEngineServiceDirectionLightGameObjects(engineState));
                };
                var _drawPointLight = function (maxDistance, engineState) {
                  var editCamera = _getEditEngineServiceCameraGameObjects(engineState)[0];
                  return reduceOneParamFunc((function (engineState, pointLightGameObject) {
                                var match = getTransformPosition(unsafeGetGameObjectTransformComponent(pointLightGameObject, engineState), engineState);
                                var z = match[2];
                                var y = match[1];
                                var x = match[0];
                                var match$1 = _getDeepWidthAndHeight(80, 80, maxDistance, _getDistanceWithTwoGameObject(/* tuple */[
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
                                          editCanvasWidth,
                                          editCanvasHeight
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
                              }), engineState, _getEditEngineServicePointLightGameObjects(engineState));
                };
                var maxDistance = 500;
                var engineState = _drawPointLight(500, _drawDirectionLight(500, state));
                var editCamera = _getEditEngineServiceCameraGameObjects(engineState)[0];
                return reduceOneParamFunc((function (engineState, sceneCameraGameObject) {
                              var match = getTransformPosition(unsafeGetGameObjectTransformComponent(sceneCameraGameObject, engineState), engineState);
                              var z = match[2];
                              var y = match[1];
                              var x = match[0];
                              var match$1 = _getDeepWidthAndHeight(80, 80, maxDistance, _getDistanceWithTwoGameObject(/* tuple */[
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
                                        editCanvasWidth,
                                        editCanvasHeight
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
                            }), engineState, _getEditEngineServiceCameraGameObjects(engineState).slice(1));
              }), editEngineState);
}

export {
  setIMGUIFunc ,
  
}
/* ArrayService-WonderCommonlib Not a pure module */
