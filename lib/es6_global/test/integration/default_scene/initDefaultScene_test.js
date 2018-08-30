

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Js_option from "../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TransformAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as OptionService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as GameObjectTool$WonderEditor from "../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as LightEngineService$WonderEditor from "../../../src/service/state/engine/LightEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorCameraTool$WonderEditor from "../../tool/MainEditorCameraTool.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("engine: test init default scene", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("add three gameObjects to scene", (function () {
                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectTool$WonderEditor.getChildren(MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0)).length), 4);
              }));
        describe("add camera", (function () {
                Wonder_jest.test("add current camera", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Js_option.isSome(MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(StateLogicService$WonderEditor.getRunEngineState(/* () */0)))), true);
                      }));
                Wonder_jest.test("set perspective camera's near,far,fovy,aspect", (function () {
                        var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                        var cameraProjection = MainEditorCameraTool$WonderEditor.getCurrentCameraProjection(engineState);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(cameraProjection, engineState),
                                        PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(cameraProjection, engineState),
                                        PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraAspect(cameraProjection, engineState),
                                        PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(cameraProjection, engineState)
                                      ]), /* tuple */[
                                    0.1,
                                    1000,
                                    1.0,
                                    60
                                  ]);
                      }));
                return Wonder_jest.test("move camera", (function () {
                              var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                              var gameObject = OptionService$Wonderjs.unsafeGet(MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(engineState));
                              var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, engineState);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform, engineState)), /* tuple */[
                                          0,
                                          0,
                                          40
                                        ]);
                            }));
              }));
        describe("add box", (function () {
                describe("test components", (function () {
                        Wonder_jest.test("add material component", (function () {
                                var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                var box = MainEditorSceneTool$WonderEditor.getBoxInDefaultScene(engineState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(box, engineState)), true);
                              }));
                        Wonder_jest.test("add meshRenderer component", (function () {
                                var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                var box = MainEditorSceneTool$WonderEditor.getBoxInDefaultScene(engineState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(box, engineState)), true);
                              }));
                        describe("test geometry component", (function () {
                                return Wonder_jest.test("add geometry component", (function () {
                                              var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              var box = MainEditorSceneTool$WonderEditor.getBoxInDefaultScene(engineState);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(box, engineState)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        describe("add directionLight gameObject", (function () {
                describe("test components", (function () {
                        describe("test light component", (function () {
                                return Wonder_jest.test("add light component", (function () {
                                              var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              var directionLight = MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene(engineStateToGetData);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightEngineService$WonderEditor.hasLightComponent(directionLight, engineStateToGetData)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
