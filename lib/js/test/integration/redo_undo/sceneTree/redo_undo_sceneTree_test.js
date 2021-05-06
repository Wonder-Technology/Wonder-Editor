'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var Color$WonderEditor = require("../../../../src/core/external/Color.js");
var RedoUndoTool$WonderEditor = require("../tool/RedoUndoTool.js");
var PickColorTool$WonderEditor = require("../../../tool/PickColorTool.js");
var GameObjectTool$WonderEditor = require("../../../tool/GameObjectTool.js");
var EventListenerTool$WonderEditor = require("../../../unit/tool/EventListenerTool.js");
var StateLogicService$WonderEditor = require("../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEngineService$WonderEditor = require("../../../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorSceneTreeTool$WonderEditor = require("../../../unit/tool/MainEditorSceneTreeTool.js");
var MainEditorTransformTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js");
var BuildComponentForCurryTool$WonderEditor = require("../../../tool/BuildComponentForCurryTool.js");
var LightMaterialEngineService$WonderEditor = require("../../../../src/service/state/engine/LightMaterialEngineService.js");
var MainEditorLightMaterialForGameObjectTool$WonderEditor = require("../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialForGameObjectTool.js");

Wonder_jest.describe("redo_undo: sceneTree", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateTwiceDragEvent = function (param) {
          MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getSecondCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0), undefined, undefined, undefined, /* () */0);
          return MainEditorSceneTreeTool$WonderEditor.Drag[/* dragGameObjectToBeTargetSib */2](MainEditorSceneTool$WonderEditor.getFirstCube(StateEngineService$WonderEditor.unsafeGetState(/* () */0)), MainEditorSceneTool$WonderEditor.getSceneFirstCamera(/* () */0), undefined, undefined, undefined, /* () */0);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "get scene tree from engine", /* tuple */[
              _simulateTwiceDragEvent,
              _beforeEach,
              (function (param) {
                  return /* () */0;
                })
            ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
        return Wonder_jest.describe("fix bug", (function (param) {
                      var execChangeTransformWork = function (param) {
                        return MainEditorTransformTool$WonderEditor.changePositionXAndBlur(11.25, undefined, undefined, undefined, /* () */0);
                      };
                      beforeEach((function () {
                              MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                              return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
                            }));
                      return Wonder_jest.test("the workflow:\n        click treeNote set currentSceneTreeNode;\n        change material color;\n        change transform x value;\n        click undo, engineState is error", (function (param) {
                                    var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeLightMaterial(/* () */0);
                                    var newColor = PickColorTool$WonderEditor.buildColor1(/* () */0);
                                    MainEditorLightMaterialForGameObjectTool$WonderEditor.changeColor(currentGameObjectMaterial, newColor);
                                    execChangeTransformWork(/* () */0);
                                    RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                                    return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                              return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial, param);
                                                            })))), newColor.hex);
                                  }));
                    }));
      }));

/*  Not a pure module */
