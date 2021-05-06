'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorTransformTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");

Wonder_jest.describe("redo_undo: transform rotation", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("fix bug", (function (param) {
                      Wonder_jest.test("\n            set current scene tree node to c1;\n            change c1->local euler angles;\n            undo;\n\n            ui->inspector->transform->c1->local euler angles should be (0,0,0);\n            ", (function (param) {
                              var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                              MainEditorTransformTool$WonderEditor.changeRotationYAndBlur(10.0, currentGameObjectTransform, undefined, undefined, /* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent(/* () */0));
                            }));
                      return Wonder_jest.test("\n            set current scene tree node to c1;\n            change c1->local euler angles;\n            undo;\n\n            ui->inspector->transform->c1->local euler angles should be (0,0,0);\n            ", (function (param) {
                                    var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                                    MainEditorTransformTool$WonderEditor.changeRotationYAndBlur(10.0, currentGameObjectTransform, undefined, undefined, /* () */0);
                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent(/* () */0));
                                  }));
                    }));
      }));

/*  Not a pure module */
