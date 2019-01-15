

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as SceneTreeWidgetService$WonderEditor from "../../../../../src/service/record/editor/widget/SceneTreeWidgetService.js";
import * as MainEditorLeftHeaderTool$WonderEditor from "../../../../unit/composable_component/mainEditor/composable_component/leftHeader/tool/MainEditorLeftHeaderTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as MainEditorInspectorAddComponentTool$WonderEditor from "../../../inspector/atom_component/addableComponent/tool/MainEditorInspectorAddComponentTool.js";
import * as MainEditorInspectorRemoveComponentTool$WonderEditor from "../../../inspector/atom_component/addableComponent/tool/MainEditorInspectorRemoveComponentTool.js";

describe("redo_undo: remove cameraGroup component", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateRemoveSpecificComponent = function () {
          return MainEditorInspectorRemoveComponentTool$WonderEditor.removeCameraGroupComponent(undefined, undefined, undefined, /* () */0);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
          var partial_arg = SceneTreeWidgetService$WonderEditor.getWidget(/* () */0);
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(partial_arg, param);
                }));
          var newGameObject = GameObjectTool$WonderEditor.getNewGameObjectUid(undefined, /* () */0);
          MainEditorLeftHeaderTool$WonderEditor.addCube(undefined, undefined, /* () */0);
          MainEditorInspectorAddComponentTool$WonderEditor.addCameraGroupComponent(undefined, undefined, newGameObject, /* () */0);
          return MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode(/* () */0);
        };
        var _afterEach = function () {
          return /* () */0;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateRemoveSpecificComponent,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildInspectorComponent);
      }));

export {
  
}
/*  Not a pure module */
