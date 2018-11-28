

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

describe("MainEditor CameraProjection", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode to be camera", (function () {
                describe("test logic", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                              }));
                        describe("test cameraProjection's attribute set in engine", (function () {
                                describe("test change CameraProjection near", (function () {
                                        return Wonder_jest.test("test change near should set into engine", (function () {
                                                      var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentGameObjectPerspectiveCamera(/* () */0);
                                                      var nearDomIndex = MainEditorCameraProjectionTool$WonderEditor.getNearDomIndex(/* () */0);
                                                      MainEditorCameraProjectionTool$WonderEditor.triggerPerspectiveCameraChangeAndBlurEvent(nearDomIndex, 10.1);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraNear(currentGameObjectPerspectiveCamera, param);
                                                                              })), 5)), 10.1);
                                                    }));
                                      }));
                                describe("test change CameraProjection far", (function () {
                                        return Wonder_jest.test("test change far should set into engine", (function () {
                                                      var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentGameObjectPerspectiveCamera(/* () */0);
                                                      var farDomIndex = MainEditorCameraProjectionTool$WonderEditor.getFarDomIndex(/* () */0);
                                                      MainEditorCameraProjectionTool$WonderEditor.triggerPerspectiveCameraChangeAndBlurEvent(farDomIndex, 120.1123);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](FloatService$WonderEditor.truncateFloatValue(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                                return PerspectiveCameraProjectionEngineService$WonderEditor.getPerspectiveCameraFar(currentGameObjectPerspectiveCamera, param);
                                                                              })), 5)), 120.1123);
                                                    }));
                                      }));
                                describe("test change CameraProjection fovy", (function () {
                                        return Wonder_jest.test("test change fovy should set into engine", (function () {
                                                      var currentGameObjectPerspectiveCamera = GameObjectTool$WonderEditor.getCurrentGameObjectPerspectiveCamera(/* () */0);
                                                      var fovyDomIndex = MainEditorCameraProjectionTool$WonderEditor.getFovyDomIndex(/* () */0);
                                                      MainEditorCameraProjectionTool$WonderEditor.triggerPerspectiveCameraChangeAndBlurEvent(fovyDomIndex, 32.123);
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
