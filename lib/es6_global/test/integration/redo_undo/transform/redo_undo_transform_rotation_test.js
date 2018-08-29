

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as SceneTreeTool$WonderEditor from "../../../tool/SceneTreeTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as TransformEventTool$WonderEditor from "../../../tool/TransformEventTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: transform rotation", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateTwiceChangeRotation = function () {
          var currentGameObjectTransform = GameObjectTool$WonderEditor.getCurrentSceneTreeNodeTransform(/* () */0);
          var component = BuildComponentTool$WonderEditor.buildMainEditorTransformComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), currentGameObjectTransform);
          var firstValue = "11.25";
          var secondValue = "15";
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return TransformEventTool$WonderEditor.triggerChangeRotationX(firstValue, param);
                }));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return TransformEventTool$WonderEditor.triggerBlurRotationX(firstValue, param);
                }));
          BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                  return TransformEventTool$WonderEditor.triggerChangeRotationY(secondValue, param);
                }));
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                        return TransformEventTool$WonderEditor.triggerBlurRotationY(secondValue, param);
                      }));
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                  return /* () */0;
                }));
          return SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0));
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "test simulate set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeRotation,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildMainEditorTransformComponent);
      }));

export {
  
}
/*  Not a pure module */
