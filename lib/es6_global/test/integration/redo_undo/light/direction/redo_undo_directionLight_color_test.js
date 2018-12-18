

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../../tool/engine/DirectorToolEngine.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorDirectionLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/direction/tool/MainEditorDirectionLightTool.js";

describe("redo_undo: directionLight color", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColor = function (color) {
          var currentGameObjectDirectionLightComponent = GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent(/* () */0);
          var sourceColor = MainEditorDirectionLightTool$WonderEditor.getColor(currentGameObjectDirectionLightComponent);
          MainEditorDirectionLightTool$WonderEditor.changeColor(currentGameObjectDirectionLightComponent, color);
          return MainEditorDirectionLightTool$WonderEditor.closeColorPicker(currentGameObjectDirectionLightComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function (param) {
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
          _changeColor(color1);
          return _changeColor(color2);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                  return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
                }));
          return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildDirectionLight);
      }));

export {
  
}
/*  Not a pure module */
