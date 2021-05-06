'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var MainEditorAssetTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTreeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("../../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js");

Wonder_jest.describe("redo_undo: asset add script event function", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateTwiceAddScriptEventFunction = function (param) {
          MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* buildEmptyAssetTree */1](/* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
          return MainEditorAssetHeaderOperateNodeTool$WonderEditor.addScriptEventFunction(undefined, undefined, /* () */0);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        var _afterEach = function (param) {
          return Curry._1(Sinon.restoreSandbox, sandbox[0]);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceAddScriptEventFunction,
                    _beforeEach,
                    _afterEach
                  ], (function (eta) {
                      return BuildComponentTool$WonderEditor.buildAssetChildrenNode(undefined, eta);
                    }));
      }));

/*  Not a pure module */
