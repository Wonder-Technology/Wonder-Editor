'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var FloatService$WonderEditor = require("../../../../../../../src/service/atom/FloatService.js");
var GameObjectTool$WonderEditor = require("../../../../../../tool/GameObjectTool.js");
var StateLogicService$WonderEditor = require("../../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../../tool/MainEditorSceneTool.js");
var MainEditorCameraProjectionTool$WonderEditor = require("./tool/MainEditorCameraProjectionTool.js");
var PerspectiveCameraProjectionEngineService$WonderEditor = require("../../../../../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js");

Wonder_jest.describe("MainEditor CameraProjection", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test set currentSceneTreeNode to be camera", (function (param) {
                      return Wonder_jest.describe("test logic", (function (param) {
                                    beforeEach((function () {
                                            return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                                          }));
                                    return Wonder_jest.describe("test cameraProjection's attribute set in engine", (function (param) {
                                                  Wonder_jest.describe("test change CameraProjection near", (function (param) {
                                                          return Wonder_jest.test("test change near should set into engine", (function (param) {
                                                                        var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePerspectiveCamera(/* () */0);
                                                                        MainEditorCameraProjectionTool$WonderEditor.changeNearAndBlur(currentGameObjectPerspectiveCamera, 10.1, undefined, undefined, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                  return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(currentGameObjectPerspectiveCamera, param);
                                                                                                })), 5)), 10.1);
                                                                      }));
                                                        }));
                                                  Wonder_jest.describe("test change CameraProjection far", (function (param) {
                                                          return Wonder_jest.test("test change far should set into engine", (function (param) {
                                                                        var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePerspectiveCamera(/* () */0);
                                                                        MainEditorCameraProjectionTool$WonderEditor.changeFarAndBlur(currentGameObjectPerspectiveCamera, 120.1123, undefined, undefined, /* () */0);
                                                                        return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                  return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(currentGameObjectPerspectiveCamera, param);
                                                                                                })), 5)), 120.1123);
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test change CameraProjection fovy", (function (param) {
                                                                return Wonder_jest.test("test change fovy should set into engine", (function (param) {
                                                                              var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentSceneTreeNodePerspectiveCamera(/* () */0);
                                                                              MainEditorCameraProjectionTool$WonderEditor.changeFovyAndBlur(currentGameObjectPerspectiveCamera, 32.123, undefined, undefined, /* () */0);
                                                                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                                        return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(currentGameObjectPerspectiveCamera, param);
                                                                                                      })), 5)), 32.123);
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
