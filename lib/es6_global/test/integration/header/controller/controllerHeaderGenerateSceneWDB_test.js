

import * as Most from "most";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as LoadTool$WonderEditor from "../../asset/tool/LoadTool.js";
import * as JudgeTool$WonderEditor from "../../../tool/JudgeTool.js";
import * as ControllerTool$WonderEditor from "../../../unit/composable_component/controller/tool/ControllerTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectEngineService.js";
import * as AssembleWDBEngineService$WonderEditor from "../../../../src/service/state/engine/AssembleWDBEngineService.js";
import * as HeaderExportSceneWDBUtils$WonderEditor from "../../../../src/core/composable_component/header/utils/export/HeaderExportSceneWDBUtils.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../src/service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as Uint8ArrayAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/Uint8ArrayAssetEditorService.js";
import * as GenerateSceneGraphEngineService$WonderEditor from "../../../../src/service/state/engine/GenerateSceneGraphEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";

describe("controller header generate scene wdb", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                Curry._1(LoadTool$WonderEditor.buildFakeTextEncoder, /* () */0);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                LoadTool$WonderEditor.buildFakeLoadImage();
                StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                      }));
                Curry._1(ControllerTool$WonderEditor.stubRequestAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                Curry._1(ControllerTool$WonderEditor.stubCancelAnimationFrame, Sinon.createEmptyStubWithJsObjSandbox(sandbox));
                Curry._1(MainEditorAssetTool$WonderEditor.buildFakeFileReader, /* () */0);
                LoadTool$WonderEditor.buildFakeTextDecoder(LoadTool$WonderEditor.convertUint8ArrayToBuffer);
                LoadTool$WonderEditor.buildFakeURL(sandbox[0]);
                return LoadTool$WonderEditor.buildFakeLoadImage();
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("fix bind arcballCameraController event bug: package should bind event if any basicCameraView is active", (function (param) {
                var _getIsBindLength = function (gameObject, engineState) {
                  var __x = GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState);
                  return GameObjectEngineService$WonderEditor.getAllArcballCameraControllers(__x, engineState).filter((function (arcballCameraController) {
                                return ArcballCameraEngineService$WonderEditor.isBindArcballCameraControllerEventForGameView(arcballCameraController, engineState);
                              })).length;
                };
                var _test = function (controlFunc) {
                  MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                  var basicCameraView = GameObjectTool$WonderEditor.getCurrentGameObjectBasicCameraView(/* () */0);
                  StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                          return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, param);
                        }));
                  GameObjectTool$WonderEditor.getCurrentGameObjectArcballCamera(/* () */0);
                  Curry._1(controlFunc, /* () */0);
                  var match = HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(GenerateSceneGraphEngineService$WonderEditor.generateWDB, Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(StateEditorService$WonderEditor.getState(/* () */0)), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                  var isBind = /* record */[/* contents */false];
                  return Most.drain(Most.tap((function (param) {
                                      var __x = _getIsBindLength(param[2], param[0]);
                                      isBind[0] = !JudgeTool$WonderEditor.isEqual(__x, 0);
                                      return /* () */0;
                                    }), AssembleWDBEngineService$WonderEditor.assembleWDB(match[1], true, true, true, true, true, match[0]))).then((function (param) {
                                return Promise.resolve(Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](isBind[0]), true));
                              }));
                };
                Wonder_jest.testPromise("test run", (function (param) {
                        return _test((function (param) {
                                      return ControllerTool$WonderEditor.run(/* () */0);
                                    }));
                      }));
                describe("test stop", (function (param) {
                        Wonder_jest.testPromise("test bind", (function (param) {
                                return _test((function (param) {
                                              ControllerTool$WonderEditor.run(/* () */0);
                                              return ControllerTool$WonderEditor.stop(/* () */0);
                                            }));
                              }));
                        return Wonder_jest.test("should unbind after package", (function (param) {
                                      MainEditorInspectorAddComponentTool$WonderEditor.addArcballCameraControllerComponent(undefined, undefined, undefined, /* () */0);
                                      var basicCameraView = GameObjectTool$WonderEditor.getCurrentGameObjectBasicCameraView(/* () */0);
                                      StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                                              return BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(basicCameraView, param);
                                            }));
                                      ControllerTool$WonderEditor.run(/* () */0);
                                      ControllerTool$WonderEditor.stop(/* () */0);
                                      var match = HeaderExportSceneWDBUtils$WonderEditor.generateSceneWDB(GenerateSceneGraphEngineService$WonderEditor.generateWDB, Uint8ArrayAssetEditorService$WonderEditor.buildImageUint8ArrayMap(StateEditorService$WonderEditor.getState(/* () */0)), StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      var engineState = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getIsBindLength(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState)), 0);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
