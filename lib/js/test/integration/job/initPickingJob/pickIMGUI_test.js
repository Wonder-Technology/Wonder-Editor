'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var EventTool$WonderEditor = require("../tool/EventTool.js");
var CameraToolEngine$WonderEditor = require("../../../tool/engine/CameraToolEngine.js");
var InitPickingJobTool$WonderEditor = require("../tool/InitPickingJobTool.js");
var SceneEngineService$WonderEditor = require("../../../../src/service/state/engine/SceneEngineService.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var PointLightToolEngine$WonderEditor = require("../../../tool/engine/PointLightToolEngine.js");
var DirectionLightToolEngine$WonderEditor = require("../../../tool/engine/DirectionLightToolEngine.js");
var TransformGameObjectEngineService$WonderEditor = require("../../../../src/service/state/engine/gameObject/TransformGameObjectEngineService.js");

Wonder_jest.describe("test pick imgui gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _test = function (imguiGameObject, $staropt$star, $staropt$star$1, $staropt$star$2, param) {
          var imguiPos = $staropt$star !== undefined ? $staropt$star : /* tuple */[
              2,
              1,
              -1
            ];
          var pageX = $staropt$star$1 !== undefined ? $staropt$star$1 : 350;
          var pageY = $staropt$star$2 !== undefined ? $staropt$star$2 : 50;
          StateEditorService$WonderEditor.getState(/* () */0);
          var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
          var engineState$1 = TransformGameObjectEngineService$WonderEditor.setLocalPosition(imguiGameObject, imguiPos, engineState);
          SceneEngineService$WonderEditor.addSceneChild(imguiGameObject, engineState$1);
          InitPickingJobTool$WonderEditor.triggerPicking(undefined, sandbox, pageX, pageY, /* () */0);
          return InitPickingJobTool$WonderEditor.pickOne(imguiGameObject);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                InitPickingJobTool$WonderEditor.prepareOneGameObject(InitPickingJobTool$WonderEditor.createCube, sandbox, 500, 200, 10, 20, /* tuple */[
                      0,
                      1,
                      3
                    ], /* tuple */[
                      0,
                      0,
                      0
                    ], /* tuple */[
                      45,
                      0,
                      0
                    ], /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                Curry._1(Sinon.restoreSandbox, sandbox[0]);
                return EventTool$WonderEditor.restore(/* () */0);
              }));
        Wonder_jest.test("test pick direction light gameObject", (function (param) {
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var match = DirectionLightToolEngine$WonderEditor.createGameObject(engineState);
                return _test(match[1], undefined, undefined, undefined, /* () */0);
              }));
        Wonder_jest.test("test pick point light gameObject", (function (param) {
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var match = PointLightToolEngine$WonderEditor.createGameObject(engineState);
                return _test(match[1], undefined, undefined, undefined, /* () */0);
              }));
        Wonder_jest.test("test pick camera gameObject", (function (param) {
                var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                var match = CameraToolEngine$WonderEditor.createCameraGameObject(engineState);
                return _test(match[1], undefined, undefined, undefined, /* () */0);
              }));
        return Wonder_jest.test("if imgui gameObject and other gameObject is in the same pos, pick the imgui one", (function (param) {
                      var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                      var match = CameraToolEngine$WonderEditor.createCameraGameObject(engineState);
                      return _test(match[1], /* tuple */[
                                  0,
                                  0,
                                  0
                                ], 260, 120, /* () */0);
                    }));
      }));

/*  Not a pure module */
