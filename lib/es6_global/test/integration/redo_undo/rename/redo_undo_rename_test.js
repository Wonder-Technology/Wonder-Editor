

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as SceneTreeInspectorTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/tool/SceneTreeInspectorTool.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/GameObjectEngineService.js";

describe("redo_undo: rename", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _getCurrentSceneTreeNodeName = function () {
          var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
          return GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
        };
        var _simulateTwiceChangeName = function () {
          var name1 = "gameObject1";
          SceneTreeInspectorTool$WonderEditor.renameGameObject(name1, undefined, undefined, undefined, /* () */0);
          var name2 = "gameObject2";
          SceneTreeInspectorTool$WonderEditor.renameGameObject(name2, undefined, undefined, undefined, /* () */0);
          return /* tuple */[
                  name1,
                  name2
                ];
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test undo operate", (function () {
                Wonder_jest.test("test not undo", (function () {
                        var match = _simulateTwiceChangeName(/* () */0);
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[1]);
                      }));
                describe("test undo one step", (function () {
                        return Wonder_jest.test("step which from second to first", (function () {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[0]);
                                    }));
                      }));
                describe("test undo two step", (function () {
                        return Wonder_jest.test("step which from second to zero", (function () {
                                      var __x = GameObjectTool$WonderEditor.unsafeGetCurrentSceneTreeNode(/* () */0);
                                      var sourceName = GameObjectEngineService$WonderEditor.unsafeGetGameObjectName(__x, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
                                      _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), sourceName);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("test redo operate", (function () {
                describe("test redo one step", (function () {
                        return Wonder_jest.test("undo step which from second to zero, redo step which from zero to first", (function () {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[0]);
                                    }));
                      }));
                describe("test redo two step", (function () {
                        return Wonder_jest.test("undo step which from second to zero,redo step which from zero to second", (function () {
                                      var match = _simulateTwiceChangeName(/* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      RedoUndoTool$WonderEditor.redoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](_getCurrentSceneTreeNodeName(/* () */0)), match[1]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
