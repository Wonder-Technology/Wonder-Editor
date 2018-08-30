

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../tool/ui/InspectorTool.js";
import * as SceneTreeTool$WonderEditor from "../../../tool/SceneTreeTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as GameObjectRenameTool$WonderEditor from "../../../tool/GameObjectRenameTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: rename", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        var _simulateTwiceChangeName = function () {
          var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
          var name1 = "gameObject1";
          BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                  return GameObjectRenameTool$WonderEditor.triggerRenameChangeEvent(name1, param);
                }));
          BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                  return GameObjectRenameTool$WonderEditor.triggerRenameBlurEvent(name1, param);
                }));
          var name2 = "gameObject2";
          BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                  return GameObjectRenameTool$WonderEditor.triggerRenameChangeEvent(name2, param);
                }));
          return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                        return GameObjectRenameTool$WonderEditor.triggerRenameBlurEvent(name2, param);
                      }));
        };
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                  return /* () */0;
                }));
          return SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0));
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeName,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
      }));

export {
  
}
/*  Not a pure module */
