'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../src/core/utils/engine/MainUtils.js");
var Vector3Service$WonderEditor = require("../../../src/service/primitive/Vector3Service.js");
var SceneEngineService$WonderEditor = require("../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../src/service/state/editor/StateEditorService.js");
var InspectorEngineTool$WonderEditor = require("../../tool/InspectorEngineTool.js");
var MainEditorSceneTool$WonderEditor = require("../../tool/MainEditorSceneTool.js");
var TransformEngineService$WonderEditor = require("../../../src/service/state/engine/TransformEngineService.js");
var DirectionLightEngineService$WonderEditor = require("../../../src/service/state/engine/DirectionLightEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var DefaultSceneInspectorEngineUtils$WonderEditor = require("../../../src/core/utils/inspectorEngine/DefaultSceneInspectorEngineUtils.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var PerspectiveCameraProjectionEngineService$WonderEditor = require("../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js");
var ContainerGameObjectInspectorCanvasEditorService$WonderEditor = require("../../../src/service/state/editor/inspectorCanvas/ContainerGameObjectInspectorCanvasEditorService.js");

Wonder_jest.describe("init inspector engine job", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n             [\n              {\n                \"name\": \"default\",\n                \"jobs\": [\n                    {\"name\": \"init_inspector_engine\" }\n                ]\n              }\n            ]\n             ", undefined, "\n             [\n                {\"name\": \"init_inspector_engine\" }\n             ]\n             ", undefined, /* () */0), undefined, false, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                _prepareState(/* () */0);
                StateInspectorEngineService$WonderEditor.setState(MainUtils$WonderEditor._handleInspectorEngineState(StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("add specific gameObjects into inspector engine state", (function (param) {
                      Wonder_jest.describe("add one camera", (function (param) {
                              Wonder_jest.test("scene gameObject children should has one camera", (function (param) {
                                      var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InspectorEngineTool$WonderEditor.getSceneCameras(inspectorEngineState).length), 1);
                                    }));
                              Wonder_jest.test("set perspective camera's near,far,fovy", (function (param) {
                                      var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var __x = InspectorEngineTool$WonderEditor.unsafeGetSceneFirstCamera(inspectorEngineState);
                                      var cameraProjection = GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent(__x, inspectorEngineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(cameraProjection, inspectorEngineState),
                                                      PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(cameraProjection, inspectorEngineState),
                                                      PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(cameraProjection, inspectorEngineState)
                                                    ]), /* tuple */[
                                                  0.01,
                                                  50000,
                                                  60
                                                ]);
                                    }));
                              return Wonder_jest.test("move camera", (function (param) {
                                            var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var camera = InspectorEngineTool$WonderEditor.unsafeGetSceneFirstCamera(inspectorEngineState);
                                            var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(camera, inspectorEngineState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(2, TransformEngineService$WonderEditor.getLocalPosition(transform, inspectorEngineState))), /* tuple */[
                                                        0,
                                                        0,
                                                        0
                                                      ]);
                                          }));
                            }));
                      Wonder_jest.describe("add one direction light", (function (param) {
                              Wonder_jest.test("scene gameObject children should has one direction light", (function (param) {
                                      var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](InspectorEngineTool$WonderEditor.getSceneDirectionLights(inspectorEngineState).length), 1);
                                    }));
                              Wonder_jest.test("set direction-light's local euler angles", (function (param) {
                                      var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                      var __x = InspectorEngineTool$WonderEditor.unsafeGetSceneFirstDirectionLight(inspectorEngineState);
                                      var directionLightTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(__x, inspectorEngineState);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(1, TransformEngineService$WonderEditor.getLocalEulerAngles(directionLightTransform, inspectorEngineState))), /* tuple */[
                                                  145,
                                                  15,
                                                  -0
                                                ]);
                                    }));
                              return Wonder_jest.test("set direction-light's intensity", (function (param) {
                                            var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            var __x = InspectorEngineTool$WonderEditor.unsafeGetSceneFirstDirectionLight(inspectorEngineState);
                                            var directionLight = GameObjectComponentEngineService$WonderEditor.unsafeGetDirectionLightComponent(__x, inspectorEngineState);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(directionLight, inspectorEngineState)), 0.25);
                                          }));
                            }));
                      Wonder_jest.describe("add one empty gameObject", (function (param) {
                              return Wonder_jest.test("add the empty gameObject to editorState", (function (param) {
                                            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                                            var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                            return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](ContainerGameObjectInspectorCanvasEditorService$WonderEditor.getContainerGameObject(editorState)), InspectorEngineTool$WonderEditor.getSceneEmptyGameObject(inspectorEngineState));
                                          }));
                            }));
                      return Wonder_jest.describe("set ambient light to inspector engine state", (function (param) {
                                    return Wonder_jest.test("test ambient light color", (function (param) {
                                                  var inspectorEngineState = StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0);
                                                  return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](SceneEngineService$WonderEditor.getAmbientLightColor(inspectorEngineState)), DefaultSceneInspectorEngineUtils$WonderEditor.getAmbientLightArr(/* () */0));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
