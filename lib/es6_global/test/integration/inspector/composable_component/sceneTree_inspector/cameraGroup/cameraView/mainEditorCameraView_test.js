

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../../tool/TestTool.js";
import * as HeaderTool$WonderEditor from "../../../../../../unit/composable_component/header/tool/HeaderTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../../../atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as MainEditorCameraViewTool$WonderEditor from "./tool/MainEditorCameraViewTool.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../../src/service/state/engine/BasicCameraViewEngineService.js";
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
                        MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
                        HeaderTool$WonderEditor.triggerAddBox(/* () */0);
                        SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
                        return AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
                      }));
                describe("test set current camera", (function () {
                        describe("test snapshot", (function () {
                                Wonder_jest.test("test if camera is currentCamera, the cameraView checkBox checked should == true and disabled should == true ", (function () {
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                      }));
                                Wonder_jest.test("test if camera isn't currentCamera, the cameraView checkBox checked should == false and disabled should == false ", (function () {
                                        MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                      }));
                                return Wonder_jest.test("test set unactive camera to be currentCamera, the currentCamera->cameraView checkBox checked should == true and disabled should == true", (function () {
                                              MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
                                              MainEditorCameraViewTool$WonderEditor.triggerClickSetCurrentCameraEvent(/* () */0);
                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildCameraView(TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                            }));
                              }));
                        describe("test logic", (function () {
                                return Wonder_jest.test("test set unactive camera to be currentCamera, the unactive one should be active", (function () {
                                              MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
                                              MainEditorCameraViewTool$WonderEditor.triggerClickSetCurrentCameraEvent(/* () */0);
                                              var firstCamera = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                              var engineState = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
                                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(firstCamera, engineState), engineState)), true);
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
