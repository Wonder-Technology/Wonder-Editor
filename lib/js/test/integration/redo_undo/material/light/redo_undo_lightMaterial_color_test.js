'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var PickColorTool$WonderEditor = require("../../../../tool/PickColorTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var BuildCanvasTool$WonderEditor = require("../../../../tool/BuildCanvasTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var BuildComponentTool$WonderEditor = require("../../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../../tool/BuildComponentForCurryTool.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("redo_undo: lightMaterial color", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _changeColorAndPushUndoStack = function (materialComponent, color) {
          var sourceColor = MainEditorLightMaterialForGameObjectTool$WonderEditor.getColor(materialComponent);
          MainEditorLightMaterialForGameObjectTool$WonderEditor.changeColor(materialComponent, color);
          return MainEditorLightMaterialForGameObjectTool$WonderEditor.closeColorPicker(materialComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function (param) {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
          BuildComponentTool$WonderEditor.buildLightMaterialForGameObject(currentGameObjectMaterial);
          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
          _changeColorAndPushUndoStack(currentGameObjectMaterial, color1);
          return _changeColorAndPushUndoStack(currentGameObjectMaterial, color2);
        };
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        var _afterEach = function (param) {
          StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildLightMaterialForGameObject);
      }));

/*  Not a pure module */
