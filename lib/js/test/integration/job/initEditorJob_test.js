'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var LightEngineService$WonderEditor = require("../../../src/service/state/engine/LightEngineService.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var MainEditorCameraTool$WonderEditor = require("../../tool/MainEditorCameraTool.js");
var GameViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/gameView/GameViewEditorService.js");
var GeometryEngineService$WonderEditor = require("../../../src/service/state/engine/GeometryEngineService.js");
var SceneViewEditorService$WonderEditor = require("../../../src/service/state/editor/view/sceneView/SceneViewEditorService.js");
var TransformEngineService$WonderEditor = require("../../../src/service/state/engine/TransformEngineService.js");
var MeshRendererEngineService$WonderEditor = require("../../../src/service/state/engine/MeshRendererEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var GeometryDataAssetEditorService$WonderEditor = require("../../../src/service/state/editor/asset/GeometryDataAssetEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");
var ScriptEventFunctionEngineService$WonderEditor = require("../../../src/service/state/engine/script/ScriptEventFunctionEngineService.js");
var PerspectiveCameraProjectionEngineService$WonderEditor = require("../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js");

Wonder_jest.describe("init editor job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          return MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n              [\n                {\n                  \"name\": \"default\",\n                  \"jobs\": [\n                      {\"name\": \"init_editor\" }\n                  ]\n                }\n              ]\n             ", undefined, "\n             [\n              {\"name\": \"init_editor\" }\n             ]\n             ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                _prepareState(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("disable script event function", (function (param) {
                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData(ScriptEventFunctionEngineService$WonderEditor.isScriptEventFunctionEnable)), false);
              }));
        Wonder_jest.describe("add specific gameObjects for scene view", (function (param) {
                Wonder_jest.describe("add editCamera gameObject", (function (param) {
                        Wonder_jest.test("the editCamera has flyCameraController", (function (param) {
                                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                var __x = OptionService$WonderEditor.unsafeGet(SceneViewEditorService$WonderEditor.getEditCamera(editorState));
                                return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasFlyCameraControllerComponent(__x, engineState)), true);
                              }));
                        return Wonder_jest.test("set the editCamera as current camera", (function (param) {
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorCameraTool$WonderEditor.getCurrentCameraGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0))), SceneViewEditorService$WonderEditor.getEditCamera(StateEditorService$WonderEditor.getState(/* () */0)));
                                    }));
                      }));
                Wonder_jest.describe("add grid plane gameObject", (function (param) {
                        return Wonder_jest.describe("test components", (function (param) {
                                      Wonder_jest.describe("add custom geometry component", (function (param) {
                                              return Wonder_jest.test("test vertices, indices", (function (param) {
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            var gridPlaneGameObject = StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane);
                                                            var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gridPlaneGameObject, engineState);
                                                            var vertices = GeometryEngineService$WonderEditor.unsafeGetGeometryVertices(geometry, engineState);
                                                            var indices = GeometryEngineService$WonderEditor.unsafeGetGeometryIndices16(geometry, engineState);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
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
                                      Wonder_jest.describe("add meshRenderer component", (function (param) {
                                              return Wonder_jest.test("drawMode should be Lines", (function (param) {
                                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                            var gridPlaneGameObject = StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane);
                                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](MeshRendererEngineService$WonderEditor.getDrawMode(GameObjectComponentEngineService$WonderEditor.unsafeGetMeshRendererComponent(gridPlaneGameObject, engineState), engineState)), /* Lines */1);
                                                          }));
                                            }));
                                      return Wonder_jest.test("add basic material component", (function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var gridPlaneGameObject = StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasBasicMaterialComponent(gridPlaneGameObject, engineState)), true);
                                                  }));
                                    }));
                      }));
                return Wonder_jest.test("not add to scene", (function (param) {
                              var sceneAllGameObjects = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              sceneAllGameObjects.includes(StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetEditCamera)),
                                              sceneAllGameObjects.includes(StateLogicService$WonderEditor.getEditorState(SceneViewEditorService$WonderEditor.unsafeGetGridPlane))
                                            ]), /* tuple */[
                                          false,
                                          false
                                        ]);
                            }));
              }));
        Wonder_jest.describe("build default geometry components", (function (param) {
                return Wonder_jest.test("build cube, sphere components", (function (param) {
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GeometryDataAssetEditorService$WonderEditor.getGeometryData(StateEditorService$WonderEditor.getState(/* () */0))), /* record */[
                                          /* defaultCubeGeometryComponent */1,
                                          /* defaultSphereGeometryComponent */2
                                        ]);
                            }));
              }));
        return Wonder_jest.describe("add gameObjects to scene", (function (param) {
                      Wonder_jest.describe("add one camera", (function (param) {
                              Wonder_jest.test("active basicCameraView to editor", (function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var __x = MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0);
                                      var __x$1 = GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(__x, engineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameViewEditorService$WonderEditor.isActiveBasicCameraView(__x$1, StateEditorService$WonderEditor.getState(/* () */0))), true);
                                    }));
                              Wonder_jest.test("set perspective camera's near,far,fovy", (function (param) {
                                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var __x = MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0);
                                      var cameraProjection = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, engineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(cameraProjection, engineState),
                                                      PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(cameraProjection, engineState),
                                                      PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(cameraProjection, engineState)
                                                    ]), /* tuple */[
                                                  0.01,
                                                  50000,
                                                  60
                                                ]);
                                    }));
                              return Wonder_jest.test("move camera", (function (param) {
                                            var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var gameObject = OptionService$WonderEditor.unsafeGet(MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0));
                                            var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(gameObject, engineState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](TransformEngineService$WonderEditor.getLocalPosition(transform, engineState)), /* tuple */[
                                                        0,
                                                        0,
                                                        4
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("add cube", (function (param) {
                              return Wonder_jest.describe("test components", (function (param) {
                                            Wonder_jest.test("add material component", (function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var cube = MainEditorSceneTool$WonderEditor.getCubeInDefaultScene(engineState);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasLightMaterialComponent(cube, engineState)), true);
                                                  }));
                                            Wonder_jest.test("add meshRenderer component", (function (param) {
                                                    var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                    var cube = MainEditorSceneTool$WonderEditor.getCubeInDefaultScene(engineState);
                                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasMeshRendererComponent(cube, engineState)), true);
                                                  }));
                                            return Wonder_jest.describe("test geometry component", (function (param) {
                                                          return Wonder_jest.test("add geometry component", (function (param) {
                                                                        var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                        var cube = MainEditorSceneTool$WonderEditor.getCubeInDefaultScene(engineState);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(cube, engineState)), true);
                                                                      }));
                                                        }));
                                          }));
                            }));
                      return Wonder_jest.describe("add directionLight gameObject", (function (param) {
                                    return Wonder_jest.describe("test components", (function (param) {
                                                  return Wonder_jest.describe("test light component", (function (param) {
                                                                return Wonder_jest.test("add light component", (function (param) {
                                                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                                              var directionLight = MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene(engineState);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](LightEngineService$WonderEditor.hasLightComponent(directionLight, engineState)), true);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
