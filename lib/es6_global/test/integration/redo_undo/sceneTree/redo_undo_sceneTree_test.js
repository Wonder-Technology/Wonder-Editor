

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Color$WonderEditor from "../../../../src/core/external/Color.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as PickColorTool$WonderEditor from "../../../tool/PickColorTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorSceneTreeTool$WonderEditor from "../../../unit/tool/MainEditorSceneTreeTool.js";
import * as MainEditorTransformTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/transform/tool/MainEditorTransformTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as LightMaterialEngineService$WonderEditor from "../../../../src/service/state/engine/LightMaterialEngineService.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";

describe("redo_undo: sceneTree", (function () {
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
        describe("fix bug", (function () {
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
                              MainEditorLightMaterialTool$WonderEditor.changeColor(currentGameObjectMaterial, newColor);
                              execChangeTransformWork(/* () */0);
                              RedoUndoTool$WonderEditor.undoHistoryState(undefined, undefined, undefined, undefined, /* () */0);
                              return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                                                        return LightMaterialEngineService$WonderEditor.getLightMaterialDiffuseColor(currentGameObjectMaterial, param);
                                                      })))), newColor.hex);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
