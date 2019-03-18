

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as PickColorTool$WonderEditor from "../../../../tool/PickColorTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeIdAssetEditorService.js";
import * as SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/SelectedFolderNodeIdInAssetTreeAssetEditorService.js";

describe("redo_undo: lightMaterial color", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _changeColorAndPushUndoStack = function (materialComponent, color) {
          var sourceColor = MainEditorLightMaterialTool$WonderEditor.getColor(materialComponent);
          MainEditorLightMaterialTool$WonderEditor.changeColor(materialComponent, color);
          return MainEditorLightMaterialTool$WonderEditor.closeColorPicker(materialComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function () {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
          BuildComponentTool$WonderEditor.buildLightMaterial(currentGameObjectMaterial);
          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
          _changeColorAndPushUndoStack(currentGameObjectMaterial, color1);
          return _changeColorAndPushUndoStack(currentGameObjectMaterial, color2);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        var _afterEach = function () {
          StateEditorService$WonderEditor.setState(SelectedFolderNodeIdInAssetTreeAssetEditorService$WonderEditor.clearSelectedFolderNodeIdInAssetTree(CurrentNodeIdAssetEditorService$WonderEditor.clearCurrentNodeId(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildLightMaterial);
      }));

export {
  
}
/*  Not a pure module */
