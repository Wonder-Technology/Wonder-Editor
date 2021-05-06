'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$WonderEditor = require("../../../tool/TestTool.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var InspectorTool$WonderEditor = require("../../../tool/ui/InspectorTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");

Wonder_jest.describe("redo_undo: inspector", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test simulate set currentSceneTreeNode", (function (param) {
                      beforeEach((function () {
                              TestTool$WonderEditor.closeContractCheck(/* () */0);
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                            }));
                      afterEach((function () {
                              GameObjectTool$WonderEditor.clearCurrentSceneTreeNode(/* () */0);
                              return TestTool$WonderEditor.openContractCheck(/* () */0);
                            }));
                      return Wonder_jest.describe("test set currentSceneTreeNode, have two state add into undoStack", (function (param) {
                                    return Wonder_jest.describe("test undo operate", (function (param) {
                                                  Wonder_jest.test("test not undo", (function (param) {
                                                          return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                        }));
                                                  Wonder_jest.describe("test undo one step", (function (param) {
                                                          return Wonder_jest.test("step which from second to first", (function (param) {
                                                                        RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                      }));
                                                        }));
                                                  return Wonder_jest.describe("test undo two step", (function (param) {
                                                                return Wonder_jest.test("step which from second to zero", (function (param) {
                                                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                                                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0)));
                                                                            }));
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
