

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEngineService$WonderEditor from "../../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as DirectionLightEngineService$WonderEditor from "../../../../../src/service/state/engine/DirectionLightEngineService.js";
import * as MainEditorDirectionLightTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/light/direction/tool/MainEditorDirectionLightTool.js";

describe("redo_undo: directionLight intensity", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeIntensity = function (value) {
          var light = GameObjectTool$WonderEditor.getCurrentGameObjectDirectionLightComponent(/* () */0);
          return MainEditorDirectionLightTool$WonderEditor.changeIntensityAndBlur(light, DirectionLightEngineService$WonderEditor.getDirectionLightIntensity(light, StateEngineService$WonderEditor.unsafeGetState(/* () */0)), value, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeIntensity = function () {
          _changeIntensity(10.1);
          return _changeIntensity(12.12);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        return GameObjectTool$WonderEditor.setCurrentSceneTreeNode(StateLogicService$WonderEditor.getEngineStateToGetData(MainEditorSceneTool$WonderEditor.getDirectionLightInDefaultScene));
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
                    _simulateTwiceChangeIntensity,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildDirectionLight);
      }));

export {
  
}
/*  Not a pure module */
