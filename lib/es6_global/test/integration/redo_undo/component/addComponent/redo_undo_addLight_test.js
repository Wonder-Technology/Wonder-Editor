

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as SceneTreeTool$WonderEditor from "../../../../tool/SceneTreeTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../../inspector/atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";

describe("redo_undo: add light component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateAddLightComponent = function () {
          return AddableComponentTool$WonderEditor.addDirectionLightInBox(/* () */0);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                  return /* () */0;
                }));
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                }));
          return SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getFirstCubeDomIndex */1](/* () */0));
        };
        var _afterEach = function () {
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateAddLightComponent,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
      }));

export {
  
}
/*  Not a pure module */
