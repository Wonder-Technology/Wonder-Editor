

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as PickColorTool$WonderEditor from "../../../../tool/PickColorTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeDataAssetEditorService.js";
import * as CurrentNodeParentIdAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/CurrentNodeParentIdAssetEditorService.js";

describe("redo_undo: basicMaterial color", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeColorAndPushUndoStack = function (materialComponent, color) {
          var sourceColor = MainEditorBasicMaterialTool$WonderEditor.getColor(materialComponent);
          MainEditorBasicMaterialTool$WonderEditor.changeColor(materialComponent, color);
          return MainEditorBasicMaterialTool$WonderEditor.closeColorPicker(materialComponent, sourceColor, undefined, undefined, /* () */0);
        };
        var _simulateTwiceChangeColor = function (param) {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectBasicMaterial(/* () */0);
          var color1 = PickColorTool$WonderEditor.buildColor1(/* () */0);
          var color2 = PickColorTool$WonderEditor.buildColor2(/* () */0);
          _changeColorAndPushUndoStack(currentGameObjectMaterial, color1);
          return _changeColorAndPushUndoStack(currentGameObjectMaterial, color2);
        };
        var _beforeEach = function (param) {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                  MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                  return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                }));
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                }));
          return MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(undefined, undefined, /* () */0);
        };
        var _afterEach = function (param) {
          StateEditorService$WonderEditor.setState(CurrentNodeParentIdAssetEditorService$WonderEditor.clearCurrentNodeParentId(CurrentNodeDataAssetEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildBasicMaterial);
      }));

export {
  
}
/*  Not a pure module */
