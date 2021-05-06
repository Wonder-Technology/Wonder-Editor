'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var SceneTreeWidgetService$WonderEditor = require("../../../../src/service/record/editor/widget/SceneTreeWidgetService.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");
var CurrentSelectSourceEditorService$WonderEditor = require("../../../../src/service/state/editor/CurrentSelectSourceEditorService.js");
var MainEditorFlyCameraControllerTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/camera_controller/fly/tool/MainEditorFlyCameraControllerTool.js");
var MainEditorInspectorAddComponentTool$WonderEditor = require("../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js");

Wonder_jest.describe("redo_undo: flyCameraController moveSpeed ", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeMoveSpeedAndBlur = function (cameraController, value) {
          return MainEditorFlyCameraControllerTool$WonderEditor.changeMoveSpeedAndBlur(cameraController, value, undefined, undefined, /* () */0);
        };
        var _simulateChangeAndBlurMoveSpeed = function (param) {
          var flyCameraController = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeFlyCamera(/* () */0);
          _changeMoveSpeedAndBlur(flyCameraController, 23.11);
          return _changeMoveSpeedAndBlur(flyCameraController, 12.12);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
          var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                }));
          return MainEditorInspectorAddComponentTool$WonderEditor.addFlyCameraControllerComponent(undefined, undefined, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "test change and blur moveSpeed", /* tuple */[
                    _simulateChangeAndBlurMoveSpeed,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
      }));

/*  Not a pure module */
