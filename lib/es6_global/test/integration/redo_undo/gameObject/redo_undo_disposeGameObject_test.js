

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as SceneTreeTool$WonderEditor from "../../../tool/SceneTreeTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as StateHistoryToolEditor$WonderEditor from "../tool/StateHistoryToolEditor.js";
import * as OperateGameObjectEventTool$WonderEditor from "../../../tool/OperateGameObjectEventTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("redo_undo: dispose gameObject", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare first step: set currentSceneTreeNode", (function () {
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxTobeCurrentSceneTreeNode);
                      }));
                var _simulateDisposeGameObjectTwice = function () {
                  var headerComponent = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                  SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getSecondCubeDomIndex */2](/* () */0));
                  BaseEventTool$WonderEditor.triggerComponentEvent(headerComponent, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                  var headerComponent$1 = BuildComponentTool$WonderEditor.buildHeader(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
                  SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0));
                  return BaseEventTool$WonderEditor.triggerComponentEvent(headerComponent$1, OperateGameObjectEventTool$WonderEditor.triggerClickDisposeAndExecDisposeJob);
                };
                describe("test operate disposeGameObject(because the set currentSceneTreeNode operation is redoUndoable, so need execute redo/undo operation twice for dispose one gameObject)", (function () {
                        describe("test undo operate", (function () {
                                Wonder_jest.test("test not undo", (function () {
                                        _simulateDisposeGameObjectTwice(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                      }));
                                describe("test undo one step", (function () {
                                        Wonder_jest.test("undo step which from second to first", (function () {
                                                _simulateDisposeGameObjectTwice(/* () */0);
                                                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                              }));
                                        describe("test undo two step", (function () {
                                                return Wonder_jest.test("step which from second to zero", (function () {
                                                              _simulateDisposeGameObjectTwice(/* () */0);
                                                              StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                              StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                              StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                              StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test redo operate", (function () {
                                describe("test redo one step", (function () {
                                        return Wonder_jest.test("undo step which from second to zero,redo step which from zero to first", (function () {
                                                      _simulateDisposeGameObjectTwice(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                                    }));
                                      }));
                                describe("test redo two step", (function () {
                                        return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function () {
                                                      _simulateDisposeGameObjectTwice(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                                      StateHistoryToolEditor$WonderEditor.redo(/* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
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
