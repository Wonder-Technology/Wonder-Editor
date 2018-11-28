

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as DirectorToolEngine$WonderEditor from "../../../../tool/engine/DirectorToolEngine.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/tool/MainEditorLightTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as PointLightEngineService$WonderEditor from "../../../../../src/service/state/engine/PointLightEngineService.js";
import * as MainEditorPointLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/point/tool/MainEditorPointLightTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";

describe("redo_undo: pointLight intensity", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeIntensity = function (value) {
          var light = GameObjectTool$WonderEditor.getCurrentGameObjectPointLightComponent(/* () */0);
          return MainEditorPointLightTool$WonderEditor.changeIntensityAndBlur(light, PointLightEngineService$WonderEditor.getPointLightIntensity(light, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), value, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeIntensity = function () {
          MainEditorLightTool$WonderEditor.setLightTypeToBePointLight(/* () */0);
          _changeIntensity(10.1);
          return _changeIntensity(12.12);
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
                    _simulateTwiceChangeIntensity,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildPointLight);
      }));

export {
  
}
/*  Not a pure module */
