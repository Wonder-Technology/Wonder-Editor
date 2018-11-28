

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TransformAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/TransformAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as OptionService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as LightEngineService$WonderEditor from "../../../src/service/state/engine/LightEngineService.js";
import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as MainEditorCameraTool$WonderEditor from "../../tool/MainEditorCameraTool.js";
import * as GameViewEditorService$WonderEditor from "../../../src/service/state/editor/view/gameView/GameViewEditorService.js";
import * as GeometryEngineService$WonderEditor from "../../../src/service/state/engine/GeometryEngineService.js";
import * as SceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "../../../src/service/state/engine/MeshRendererEngineService.js";
import * as PerspectiveCameraProjectionAPI$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/api/camera/PerspectiveCameraProjectionAPI.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("init editor job", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function () {
          return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n         {\n           \"name\": \"default\",\n           \"jobs\": [\n{\"name\": \"init_editor\" }\n           ]\n         }\n       ]\n             ", undefined, "\n             [\n{\"name\": \"init_editor\" }\n             ]\n             ", undefined, /* () */0), undefined, undefined, false, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                _prepareState(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("add specific gameObjects for scene view", (function () {
                Wonder_jest.test("add editCamera as current camera", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), SceneViewEditorService$WonderEditor.getEditCamera(StateEditorService$WonderEditor.getState(/* () */0)));
                      }));
                describe("add grid plane gameObject", (function () {
                        describe("test components", (function () {
                                describe("add custom geometry component", (function () {
                                        return Wonder_jest.test("test vertices, indices", (function () {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var gridPlaneGameObject = StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane);
                                                      var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gridPlaneGameObject, engineState);
                                                      var vertices = GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState);
                                                      var indices = GeometryEngineService$WonderEditor.getGeometryIndices(geometry, engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                                      vertices.length,
                                                                      indices.length,
                                                                      vertices.slice(0, 10),
                                                                      indices.slice(0, 10)
                                                                    ]), /* tuple */[
                                                                  7212,
                                                                  2404,
                                                                  new Float32Array(/* array */[
                                                                        -300,
                                                                        0,
                                                                        -300,
                                                                        300,
                                                                        0,
                                                                        -300,
                                                                        -300,
                                                                        0,
                                                                        -300,
                                                                        -300
                                                                      ]),
                                                                  new Uint16Array(/* array */[
                                                                        0,
                                                                        1,
                                                                        2,
                                                                        3,
                                                                        4,
                                                                        5,
                                                                        6,
                                                                        7,
                                                                        8,
                                                                        9
                                                                      ])
                                                                ]);
                                                    }));
                                      }));
                                describe("add meshRenderer component", (function () {
                                        return Wonder_jest.test("drawMode should be Lines", (function () {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var gridPlaneGameObject = StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gridPlaneGameObject, engineState), engineState)), /* Lines */1);
                                                    }));
                                      }));
                                return Wonder_jest.test("add basic material component", (function () {
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              var gridPlaneGameObject = StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gridPlaneGameObject, engineState)), true);
                                            }));
                              }));
                        return /* () */0;
                      }));
                return Wonder_jest.test("not add to scene", (function () {
                              var sceneAllGameObjects = GameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              sceneAllGameObjects.includes(StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetEditCamera)),
                                              sceneAllGameObjects.includes(StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane))
                                            ]), /* tuple */[
                                          false,
                                          false
                                        ]);
                            }));
              }));
        describe("build default geometry components", (function () {
                return Wonder_jest.test("build cube, sphere components", (function () {
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryDataAssetEditorService$WonderEditor.getGeometryData(StateEditorService$WonderEditor.getState(/* () */0))), /* record */[
                                          /* defaultCubeGeometryComponent */1,
                                          /* defaultSphereGeometryComponent */2
                                        ]);
                            }));
              }));
        describe("add gameObjects to scene", (function () {
                describe("add one camera", (function () {
                        Wonder_jest.test("active basicCameraView to editor", (function () {
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var __x = MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0);
                                var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.isActiveBasicCameraView(__x$1, StateEditorService$WonderEditor.getState(/* () */0))), true);
                              }));
                        Wonder_jest.test("set perspective camera's near,far,fovy", (function () {
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var __x = MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0);
                                var cameraProjection = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, engineState);
                                return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraNear(cameraProjection, engineState),
                                                PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFar(cameraProjection, engineState),
                                                PerspectiveCameraProjectionAPI$Wonderjs.unsafeGetPerspectiveCameraFovy(cameraProjection, engineState)
                                              ]), /* tuple */[
                                            0.01,
                                            50000,
                                            60
                                          ]);
                              }));
                        return Wonder_jest.test("move camera", (function () {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var gameObject = OptionService$Wonderjs.unsafeGet(MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0));
                                      var transform = GameObjectAPI$Wonderjs.unsafeGetGameObjectTransformComponent(gameObject, engineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](TransformAPI$Wonderjs.getTransformLocalPosition(transform, engineState)), /* tuple */[
                                                  0,
                                                  0,
                                                  4
                                                ]);
                                    }));
                      }));
                describe("add box", (function () {
                        describe("test components", (function () {
                                Wonder_jest.test("add material component", (function () {
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var box = MainEditorSceneTool$WonderEditor.getBoxInDefaultScene(engineState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(box, engineState)), true);
                                      }));
                                Wonder_jest.test("add meshRenderer component", (function () {
                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                        var box = MainEditorSceneTool$WonderEditor.getBoxInDefaultScene(engineState);
                                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(box, engineState)), true);
                                      }));
                                describe("test geometry component", (function () {
                                        return Wonder_jest.test("add geometry component", (function () {
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
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
                                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                      var directionLight = MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene(engineState);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](LightEngineService$WonderEditor.hasLightComponent(directionLight, engineState)), true);
                                                    }));
                                      }));
                                return /* () */0;
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
