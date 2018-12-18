

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("redo_undo: dispose gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("prepare first step: set currentSceneTreeNode", (function (param) {
                var _simulateTwiceDisposeGameObject = function (param) {
                  MainEditorSceneTool$WonderEditor.setSecondBoxToBeCurrentSceneTreeNode(/* () */0);
                  MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                  MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                  return MainEditorLeftHeaderTool$WonderEditor.disposeCurrentSceneTreeNode(undefined, undefined, /* () */0);
                };
                beforeEach((function (param) {
                        MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, "\n                [\n                    {\n                        \"name\": \"default\",\n                        \"jobs\": [\n                            {\n                                \"name\": \"dispose\"\n                            }\n                        ]\n                    }\n                ]\n            ", undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                      }));
                describe("test operate disposeGameObject(because the set currentSceneTreeNode operation is redoUndoable, so need execute redo/undo operation twice for dispose one gameObject)", (function (param) {
                        describe("test undo operate", (function (param) {
                                Wonder_jest.test("test not undo", (function (param) {
                                        _simulateTwiceDisposeGameObject(/* () */0);
                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                      }));
                                describe("test undo one step", (function (param) {
                                        Wonder_jest.test("undo step which from second to first", (function (param) {
                                                _simulateTwiceDisposeGameObject(/* () */0);
                                                RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                              }));
                                        describe("test undo two step", (function (param) {
                                                return Wonder_jest.test("step which from second to zero", (function (param) {
                                                              _simulateTwiceDisposeGameObject(/* () */0);
                                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                                            }));
                                              }));
                                        return /* () */0;
                                      }));
                                return /* () */0;
                              }));
                        describe("test redo operate", (function (param) {
                                describe("test redo one step", (function (param) {
                                        return Wonder_jest.test("undo step which from second to zero,redo step which from zero to first", (function (param) {
                                                      _simulateTwiceDisposeGameObject(/* () */0);
                                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0)));
                                                    }));
                                      }));
                                describe("test redo two step", (function (param) {
                                        return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function (param) {
                                                      _simulateTwiceDisposeGameObject(/* () */0);
                                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
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
