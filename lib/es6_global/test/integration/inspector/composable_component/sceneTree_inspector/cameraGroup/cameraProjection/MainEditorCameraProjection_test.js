

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as FloatService$WonderEditor from "../../../../../../../src/service/atom/FloatService.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as MainEditorCameraProjectionTool$WonderEditor from "./tool/MainEditorCameraProjectionTool.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../../../../../src/service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

describe("MainEditor CameraProjection", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode to be camera", (function (param) {
                describe("test logic", (function (param) {
                        beforeEach((function (param) {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                              }));
                        describe("test cameraProjection's attribute set in engine", (function (param) {
                                describe("test change CameraProjection near", (function (param) {
                                        return Wonder_jest.test("test change near should set into engine", (function (param) {
                                                      var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentGameObjectPerspectiveCamera(/* () */0);
                                                      MainEditorCameraProjectionTool$WonderEditor.changeNearAndBlur(currentGameObjectPerspectiveCamera, 10.1, undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(currentGameObjectPerspectiveCamera, param);
                                                                              })), 5)), 10.1);
                                                    }));
                                      }));
                                describe("test change CameraProjection far", (function (param) {
                                        return Wonder_jest.test("test change far should set into engine", (function (param) {
                                                      var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentGameObjectPerspectiveCamera(/* () */0);
                                                      MainEditorCameraProjectionTool$WonderEditor.changeFarAndBlur(currentGameObjectPerspectiveCamera, 120.1123, undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(currentGameObjectPerspectiveCamera, param);
                                                                              })), 5)), 120.1123);
                                                    }));
                                      }));
                                describe("test change CameraProjection fovy", (function (param) {
                                        return Wonder_jest.test("test change fovy should set into engine", (function (param) {
                                                      var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentGameObjectPerspectiveCamera(/* () */0);
                                                      MainEditorCameraProjectionTool$WonderEditor.changeFovyAndBlur(currentGameObjectPerspectiveCamera, 32.123, undefined, undefined, /* () */0);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFovy(currentGameObjectPerspectiveCamera, param);
                                                                              })), 5)), 32.123);
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
