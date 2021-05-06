'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var RedoUndoTransformTool$WonderEditor = require("./tool/RedoUndoTransformTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");

Wonder_jest.describe("redo_undo: transform position", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var partial_arg = 15;
        var partial_arg$1 = 11.25;
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "test simulate set currentSceneTreeNode", /* tuple */[
                    (function (param) {
                        return RedoUndoTransformTool$WonderEditor.simulateTwiceChangePosition(partial_arg$1, partial_arg, param);
                      }),
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent);
      }));

/*  Not a pure module */
