'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("../../../integration/job/tool/EventTool.js");
var MainUtils$WonderEditor = require("../../../../src/core/utils/engine/MainUtils.js");
var ControllerTool$WonderEditor = require("../controller/tool/ControllerTool.js");
var MouseEventTool$WonderEditor = require("../../../integration/job/tool/MouseEventTool.js");
var Vector3Service$WonderEditor = require("../../../../src/service/primitive/Vector3Service.js");
var KeyboardEventTool$WonderEditor = require("../../../integration/job/tool/KeyboardEventTool.js");
var MainEditorLoopTool$WonderEditor = require("./tool/MainEditorLoopTool.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var FlyCameraEngineService$WonderEditor = require("../../../../src/service/state/engine/FlyCameraEngineService.js");
var TransformEngineService$WonderEditor = require("../../../../src/service/state/engine/TransformEngineService.js");
var PrepareRenderViewJobTool$WonderEditor = require("../../../integration/job/tool/PrepareRenderViewJobTool.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var FlyCameraControllerToolEngine$WonderEditor = require("../../../tool/engine/FlyCameraControllerToolEngine.js");
var FlyCameraControllerLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/FlyCameraControllerLogicService.js");

Wonder_jest.describe("test mainEditor loop", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareMouseEvent = function (sandbox, param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_editor\"\n            },\n            {\n              \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n          ]\n        }\n      ]\n            ", undefined, "\n    [\n\n            {\n              \"name\": \"init_editor\"\n            },\n            {\n               \"name\": \"init_event_for_editor\"\n            },\n            {\n              \"name\": \"init_camera\"\n            }\n    ]\n            ", undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          MouseEventTool$WonderEditor.prepareWithState(sandbox, StateEngineService$WonderEditor.unsafeGetState(/* () */0), undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
          return MouseEventTool$WonderEditor.setPointerLocked();
        };
        var _prepareEvent = function (sandbox, bindEventFunc, param) {
          _prepareMouseEvent(sandbox, /* () */0);
          MouseEventTool$WonderEditor.prepareForPointerLock(sandbox, undefined, /* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var match = FlyCameraControllerToolEngine$WonderEditor.createGameObject(engineState);
          var cameraController = match[3][0];
          var transform = match[2];
          var pos = /* tuple */[
            1,
            2,
            3
          ];
          var engineState$1 = TransformEngineService$WonderEditor.setLocalPosition(pos, transform, match[0]);
          var engineState$2 = FlyCameraEngineService$WonderEditor.setFlyCameraControllerMoveSpeed(cameraController, 1.2, engineState$1);
          PrepareRenderViewJobTool$WonderEditor.setViewRect(100, 50, /* () */0);
          var engineState$3 = MainUtils$WonderEditor._handleEngineState(engineState$2);
          var engineState$4 = Curry._2(bindEventFunc, cameraController, engineState$3);
          StateEngineService$WonderEditor.setState(engineState$4);
          return /* tuple */[
                  cameraController,
                  transform,
                  1.2,
                  pos
                ];
        };
        var _execKeydownEvent = function (pageX, pageY, keyCode, $staropt$star, $staropt$star$1, param) {
          var ctrlKey = $staropt$star !== undefined ? $staropt$star : false;
          var preventDefaultFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : Sinon.createEmptyStubWithJsObjSandbox(sandbox);
          EventTool$WonderEditor.triggerDomEvent("mousedown", EventTool$WonderEditor.getBody(/* () */0), MouseEventTool$WonderEditor.buildMouseDomEvent(pageX, pageY, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0));
          return EventTool$WonderEditor.triggerDomEvent("keydown", EventTool$WonderEditor.getKeyboardEventBindedDom(/* () */0), KeyboardEventTool$WonderEditor.buildKeyboardDomEvent(ctrlKey, undefined, undefined, undefined, keyCode, preventDefaultFunc, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return EventTool$WonderEditor.restore(/* () */0);
              }));
        return Wonder_jest.describe("test add flyCameraController into editCamera", (function (param) {
                      return Wonder_jest.describe("eventTarget is scene view", (function (param) {
                                    return Wonder_jest.describe("bind keydown event", (function (param) {
                                                  Wonder_jest.describe("trigger keydown event when stop", (function (param) {
                                                          beforeEach((function () {
                                                                  return ControllerTool$WonderEditor.setIsRun(false);
                                                                }));
                                                          return Wonder_jest.test("if key is a, should update editCamera transform", (function (param) {
                                                                        var match = _prepareEvent(sandbox, FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView, /* () */0);
                                                                        var match$1 = match[3];
                                                                        _execKeydownEvent(10, 20, 65, false, undefined, /* () */0);
                                                                        var engineState = MainEditorLoopTool$WonderEditor.startLoopForCameraChangeDirection(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(1, TransformEngineService$WonderEditor.getLocalPosition(match[1], engineState))), Vector3Service$WonderEditor.truncate(1, /* tuple */[
                                                                                        match$1[0] - match[2],
                                                                                        match$1[1],
                                                                                        match$1[2]
                                                                                      ]));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("trigger keydown event when run", (function (param) {
                                                                beforeEach((function () {
                                                                        return ControllerTool$WonderEditor.setIsRun(true);
                                                                      }));
                                                                return Wonder_jest.test("if key is a, shouldn't update editCamera transform", (function (param) {
                                                                              var match = _prepareEvent(sandbox, FlyCameraControllerLogicService$WonderEditor.bindFlyCameraControllerEventForSceneView, /* () */0);
                                                                              _execKeydownEvent(10, 20, 65, false, undefined, /* () */0);
                                                                              var engineState = MainEditorLoopTool$WonderEditor.startLoopForCameraChangeDirection(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Vector3Service$WonderEditor.truncate(1, TransformEngineService$WonderEditor.getLocalPosition(match[1], engineState))), Vector3Service$WonderEditor.truncate(1, match[3]));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
