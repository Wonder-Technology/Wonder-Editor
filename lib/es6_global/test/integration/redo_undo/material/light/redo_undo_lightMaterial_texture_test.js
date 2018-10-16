

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as MainEditorMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorMaterialTool.js";
import * as StateHistoryToolEditor$WonderEditor from "../../tool/StateHistoryToolEditor.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../../asset/tool/MainEditorAssetNodeTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("redo_undo: lightMaterial texture", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateTwiceDragTexture = function () {
          var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
          var firstTextureDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstTextureDomIndex */8](assetTreeDomRecord);
          var secondTextureDomIndex = MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getSecondTextureDomIndex */9](assetTreeDomRecord);
          MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(firstTextureDomIndex);
          MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
          MainEditorMaterialTool$WonderEditor.triggerFileDragStartEvent(secondTextureDomIndex);
          return MainEditorMaterialTool$WonderEditor.triggerDragTextureToGameObjectMaterial(/* () */0);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                  MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                  return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                }));
          return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* SceneTree */0, param);
                      }));
        };
        var _afterEach = function () {
          StateHistoryToolEditor$WonderEditor.clearAllState(/* () */0);
          StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceDragTexture,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildLightMaterial);
      }));

export {
  
}
/*  Not a pure module */
