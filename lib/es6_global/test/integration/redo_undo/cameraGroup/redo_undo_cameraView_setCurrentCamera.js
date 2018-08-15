

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as HeaderTool$WonderEditor from "../../../unit/composable_component/header/tool/HeaderTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as SceneTreeTool$WonderEditor from "../../../tool/SceneTreeTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as AddableComponentTool$WonderEditor from "../../inspector/atom_component/addableComponent/tool/AddableComponentTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "../../../tool/domIndex/SceneTreeNodeDomTool.js";
import * as MainEditorCameraViewTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/cameraGroup/cameraView/tool/MainEditorCameraViewTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: cameraView set currentCamera", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateSetFirstCameraBeCurrentCamera = function () {
          MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode(/* () */0);
          return MainEditorCameraViewTool$WonderEditor.triggerClickSetCurrentCameraEvent(/* () */0);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCameraTobeCurrentSceneTreeNode);
          HeaderTool$WonderEditor.triggerAddBox(/* () */0);
          SceneTreeTool$WonderEditor.clearCurrentGameObjectAndSetTreeSpecificGameObject(SceneTreeNodeDomTool$WonderEditor.OperateDefaultScene[/* getNewGameObjectDomIndex */4](/* () */0));
          return AddableComponentTool$WonderEditor.addCameraGroupInBox(/* () */0);
        };
        var _afterEach = function () {
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode to be camera", /* tuple */[
                    _simulateSetFirstCameraBeCurrentCamera,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildCameraView);
      }));

export {
  
}
/*  Not a pure module */
