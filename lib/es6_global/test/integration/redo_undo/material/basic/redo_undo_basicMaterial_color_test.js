

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../../tool/BuildCanvasTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../../../tool/BuildComponentTool.js";
import * as PickColorEventTool$WonderEditor from "../../../../tool/PickColorEventTool.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("redo_undo: basicMaterial color", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _changeColorAndPushUndoStack = function (component, materialComponent, color) {
          BaseEventTool$WonderEditor.triggerComponentEvent(component, PickColorEventTool$WonderEditor.triggerShowColorPickEvent);
          PickColorEventTool$WonderEditor.triggerChangeBasicMaterialColor(materialComponent, color);
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, PickColorEventTool$WonderEditor.triggerCloseColorPickEvent);
        };
        var _simulateTwiceChangeColor = function () {
          BuildCanvasTool$WonderEditor.buildFakeCanvas(sandbox);
          var currentGameObjectMaterial = GameObjectTool$WonderEditor.getCurrentGameObjectBasicMaterial(/* () */0);
          var component = BuildComponentTool$WonderEditor.buildBasicMaterial(currentGameObjectMaterial);
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
          _changeColorAndPushUndoStack(component, currentGameObjectMaterial, color1);
          return _changeColorAndPushUndoStack(component, currentGameObjectMaterial, color2);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                  MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                  return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                }));
          StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                  return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                }));
          MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(/* () */0);
          MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
          return /* () */0;
        };
        var _afterEach = function () {
          StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeColor,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildBasicMaterial);
      }));

export {
  
}
/*  Not a pure module */
