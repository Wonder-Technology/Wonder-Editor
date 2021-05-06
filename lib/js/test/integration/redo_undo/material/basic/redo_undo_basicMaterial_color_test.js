'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ArrayService$WonderEditor = require("../../../../../src/service/atom/ArrayService.js");
var RedoUndoTool$WonderEditor = require("../../tool/RedoUndoTool.js");
var PickColorTool$WonderEditor = require("../../../../tool/PickColorTool.js");
var GameObjectTool$WonderEditor = require("../../../../tool/GameObjectTool.js");
var BuildCanvasTool$WonderEditor = require("../../../../tool/BuildCanvasTool.js");
var EventListenerTool$WonderEditor = require("../../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorAssetTool$WonderEditor = require("../../../asset/tool/MainEditorAssetTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../../tool/BuildComponentForCurryTool.js");
var CurrentNodeIdAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorBasicMaterialForGameObjectTool$WonderEditor = require("../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialForGameObjectTool.js");
var SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor = require("../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js");

Wonder_jest.describe("redo_undo: basicMaterial color", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColorAndPushUndoStack = function (materialComponent, color) {
          var sourceColor = MainEditorBasicMaterialForGameObjectTool$WonderEditor.getColor(materialComponent);
          MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeColor(materialComponent, color);
          return MainEditorBasicMaterialForGameObjectTool$WonderEditor.closeColorPicker(materialComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function (param) {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeBasicMaterial(/* () */0);
          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
          _changeColorAndPushUndoStack(currentGameObjectMaterial, color1);
          return _changeColorAndPushUndoStack(currentGameObjectMaterial, color2);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                  MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                  return MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode(/* () */0);
                }));
          var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                }));
          return MainEditorBasicMaterialForGameObjectTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
        };
        var _afterEach = function (param) {
          StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
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
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildBasicMaterialForGameObject);
      }));

/*  Not a pure module */
