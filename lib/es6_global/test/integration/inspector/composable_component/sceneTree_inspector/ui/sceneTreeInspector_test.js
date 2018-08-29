

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../tool/ui/InspectorTool.js";
import * as ReactTestTool$WonderEditor from "../../../../../tool/ReactTestTool.js";
import * as StateLogicService$WonderEditor from "../../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../../tool/BuildComponentTool.js";
import * as SceneEditorService$WonderEditor from "../../../../../../src/service/state/editor/scene/SceneEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../../tool/MainEditorSceneTool.js";
import * as GameObjectRenameTool$WonderEditor from "../../../../../tool/GameObjectRenameTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../src/service/state/engine/GameObjectEngineService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("SceneTreeInspector", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare currentSelectSource is SceneTree", (function () {
                beforeEach((function () {
                        return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                                      return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                                    }));
                      }));
                describe("test gameObject rename", (function () {
                        beforeEach((function () {
                                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                              }));
                        describe("test snapshot", (function () {
                                Wonder_jest.test("test rename to specific name", (function () {
                                        var newName = "gameObjectNewName";
                                        var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                                return GameObjectRenameTool$WonderEditor.triggerRenameChangeEvent(newName, param);
                                              }));
                                        BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                                return GameObjectRenameTool$WonderEditor.triggerRenameBlurEvent(newName, param);
                                              }));
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                      }));
                                describe("deal with specific case", (function () {
                                        return Wonder_jest.test("ket in '', trigger onBlur, the input value should be original name", (function () {
                                                      var newName = "";
                                                      var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                                              return GameObjectRenameTool$WonderEditor.triggerRenameChangeEvent(newName, param);
                                                            }));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                                              return GameObjectRenameTool$WonderEditor.triggerRenameBlurEvent(newName, param);
                                                            }));
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                    }));
                                      }));
                                return /* () */0;
                              }));
                        describe("test logic", (function () {
                                describe("test engine", (function () {
                                        return Wonder_jest.test("test rename gameObject ", (function () {
                                                      var newName = "gameObjectNewName";
                                                      var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                                              return GameObjectRenameTool$WonderEditor.triggerRenameChangeEvent(newName, param);
                                                            }));
                                                      BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                                                              return GameObjectRenameTool$WonderEditor.triggerRenameBlurEvent(newName, param);
                                                            }));
                                                      var partial_arg = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode);
                                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                                            return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(partial_arg, param);
                                                                          }))), newName);
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
