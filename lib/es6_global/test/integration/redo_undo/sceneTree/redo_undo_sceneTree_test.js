

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../src/core/external/Color.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as PickColorEventTool$WonderEditor from "../../../tool/PickColorEventTool.js";
import * as SceneTreeEventTool$WonderEditor from "../../../tool/SceneTreeEventTool.js";
import * as TransformEventTool$WonderEditor from "../../../tool/TransformEventTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as StateHistoryToolEditor$WonderEditor from "../tool/StateHistoryToolEditor.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../src/service/state/engine/LightMaterialEngineService.js";

describe("redo_undo: sceneTree", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateTwiceDragEvent = function () {
          var firstCameraDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCameraDomIndex */0](/* () */0);
          var firstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0);
          var secondCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getSecondCubeDomIndex */2](/* () */0);
          var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return SceneTreeEventTool$WonderEditor.triggerDragStart(secondCubeDomIndex, param);
                }));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return SceneTreeEventTool$WonderEditor.triggerDragEnter(firstCameraDomIndex, param);
                }));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return SceneTreeEventTool$WonderEditor.triggerDragDrop(firstCameraDomIndex, param);
                }));
          var component2 = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
          BaseEventTool$WonderEditor.triggerComponentEvent(component2, (function (param) {
                  return SceneTreeEventTool$WonderEditor.triggerDragStart(firstCubeDomIndex, param);
                }));
          BaseEventTool$WonderEditor.triggerComponentEvent(component2, (function (param) {
                  return SceneTreeEventTool$WonderEditor.triggerDragEnter(firstCameraDomIndex, param);
                }));
          return BaseEventTool$WonderEditor.triggerComponentEvent(component2, (function (param) {
                        return SceneTreeEventTool$WonderEditor.triggerDragDrop(firstCameraDomIndex, param);
                      }));
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
        };
        RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "get scene tree from engine", /* tuple */[
              _simulateTwiceDragEvent,
              _beforeEach,
              (function () {
                  return /* () */0;
                })
            ], BuildComponentForCurryTool$WonderEditor.buildSceneTree);
        describe("fix bug", (function () {
                var execChangeTransformWork = function () {
                  var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
                  var transformComponent = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
                  BaseEventTool$WonderEditor.triggerComponentEvent(transformComponent, (function (param) {
                          return TransformEventTool$WonderEditor.triggerChangePositionX("11.25", param);
                        }));
                  return BaseEventTool$WonderEditor.triggerComponentEvent(transformComponent, (function (param) {
                                return TransformEventTool$WonderEditor.triggerBlurPositionX("11.25", param);
                              }));
                };
                beforeEach((function () {
                        MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                        return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode);
                      }));
                return Wonder_jest.test("the workflow:\n        click treeNote set currentSceneTreeNode;\n        change material color;\n        change transform x value;\n        click undo, engineState is error", (function () {
                              var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
                              var newColor = {
                                hex: "#7df1e8",
                                rgb: {
                                  r: 125,
                                  g: 241,
                                  b: 232
                                }
                              };
                              PickColorEventTool$WonderEditor.triggerChangeLightMaterialColor(currentGameObjectMaterial, newColor);
                              execChangeTransformWork(/* () */0);
                              StateHistoryToolEditor$WonderEditor.undo(/* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                        return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial, param);
                                                      })))), newColor.hex);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
