

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as HeaderTool$WonderEditor from "../../../../../../unit/composable_component/header/tool/HeaderTool.js";
import * as OptionService$WonderEditor from "../../../../../../../src/service/primitive/OptionService.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../../../atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as GameViewEditorService$WonderEditor from "../../../../../../../src/service/state/editor/gameView/GameViewEditorService.js";
import * as MainEditorCameraViewTool$WonderEditor from "./tool/MainEditorCameraViewTool.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../src/service/state/engine/GameObjectComponentEngineService.js";

describe("MainEditor CameraView", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test set currentSceneTreeNode to be camera", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
                        HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                        SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                        return AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                      }));
                describe("test set current camera", (function () {
                        describe("test snapshot", (function () {
                                Wonder_jest.test("test if camera is currentCamera, the cameraView checkBox checked should == true and disabled should == true ", (function () {
                                        MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                      }));
                                Wonder_jest.test("test if camera isn't currentCamera, the cameraView checkBox checked should == false and disabled should == false ", (function () {
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                      }));
                                return Wonder_jest.test("test set unactive camera to be currentCamera, the currentCamera->cameraView checkBox checked should == true and disabled should == true", (function () {
                                              MainEditorCameraViewTool$WonderEditor.triggerClickSetCurrentCameraEvent(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                return Wonder_jest.test("test set unactive camera to be currentCamera, the unactive one should be marked active", (function () {
                                              MainEditorCameraViewTool$WonderEditor.triggerClickSetCurrentCameraEvent(/* () */0);
                                              var firstCamera = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(GameViewEditorService$WonderEditor.getActivedBasicCameraView(StateEditorService$WonderEditor.getState(/* () */0)))), GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(firstCamera, engineState));
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
