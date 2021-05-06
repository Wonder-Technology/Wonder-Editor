'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorLightTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/light/tool/MainEditorLightTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");

Wonder_jest.describe("redo_undo: change light", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateChangeLight = function (param) {
          return MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
        };
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setDirectionLightGameObjectToBeCurrentSceneTreeNode(/* () */0);
                      }));
        };
        var _afterEach = function (param) {
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateChangeLight,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildLight);
      }));

/*  Not a pure module */
