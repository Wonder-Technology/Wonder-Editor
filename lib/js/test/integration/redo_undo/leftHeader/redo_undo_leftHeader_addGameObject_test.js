'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorLeftHeaderTool$WonderEditor = require("../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");

Wonder_jest.describe("redo_undo:leftHeader add gameObject", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateAddCubeAndEmptyGameObject = function (param) {
          MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
          return MainEditorLeftHeaderTool$WonderEditor.addEmptyGameObject(undefined, undefined, /* () */0);
        };
        var _simulateTwiceAddSphere = function (param) {
          MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
          return MainEditorLeftHeaderTool$WonderEditor.addSphere(undefined, undefined, /* () */0);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultSceneAndNotInit(sandbox);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "add cube and empty gameObject;\n      prepare first step: set currentSceneTreeNode", /* tuple */[
              _simulateAddCubeAndEmptyGameObject,
              _beforeEach,
              (function (param) {
                  return /* () */0;
                })
            ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "add sphere;\n      prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceAddSphere,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
      }));

/*  Not a pure module */
