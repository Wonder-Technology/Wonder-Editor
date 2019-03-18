

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../../tool/engine/DirectorToolEngine.js";
import * as MainEditorLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/tool/MainEditorLightTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorPointLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("redo_undo: pointLight color", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColor = function (color) {
          var currentGameObjectPointLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
          var sourceColor = MainEditorPointLightTool$WonderEditor.getColor(currentGameObjectPointLightComponent);
          MainEditorPointLightTool$WonderEditor.changeColor(currentGameObjectPointLightComponent, color);
          return MainEditorPointLightTool$WonderEditor.closeColorPicker(currentGameObjectPointLightComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function () {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var color1 = {
            hex: "#7df1e8",
            rgb: {
              r: 125,
              g: 241,
              b: 232
            }
          };
          var color2 = {
            hex: "#1918e8",
            rgb: {
              r: 25,
              g: 24,
              b: 232
            }
          };
          MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
          _changeColor(color1);
          return _changeColor(color2);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                }));
          return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildPointLight);
      }));

export {
  
}
/*  Not a pure module */
