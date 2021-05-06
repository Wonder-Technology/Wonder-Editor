'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ArrayService$WonderEditor = require("../../../../src/service/atom/ArrayService.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var MainEditorAssetTool$WonderEditor = require("../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");
var MainEditorMeshRendererTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/meshRenderer/tool/MainEditorMeshRendererTool.js");

Wonder_jest.describe("redo_undo: change meshRenderer drawMode", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateChangeTwiceDrawMode = function (param) {
          var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
          MainEditorMeshRendererTool$WonderEditor.changeMode(lineType, undefined, undefined, undefined, /* () */0);
          var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
          return MainEditorMeshRendererTool$WonderEditor.changeMode(triangleFanType, undefined, undefined, undefined, /* () */0);
        };
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateChangeTwiceDrawMode,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildMeshRenderer);
      }));

/*  Not a pure module */
