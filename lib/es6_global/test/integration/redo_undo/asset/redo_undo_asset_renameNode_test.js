

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../tool/ui/InspectorTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeEventTool$WonderEditor from "../../asset/tool/AssetTreeEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as AssetTreeInspectorTool$WonderEditor from "../../inspector/composable_component/assetTree_inspector/tool/AssetTreeInspectorTool.js";
import * as MainEditorAssetNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetNodeTool.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../src/service/state/editor/CurrentSelectSourceEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("redo_undo: asset rename node", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _triggerInspectorRenameEvent = function (inspectorComponent, newName) {
          BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                  return AssetTreeInspectorTool$WonderEditor.triggerRenameChangeEvent(newName, param);
                }));
          return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                        return AssetTreeInspectorTool$WonderEditor.triggerRenameBlurEvent(newName, param);
                      }));
        };
        var _simulateRenameNodeTwice = function () {
          var assetTreeDomRecord = MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
          var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
          MainEditorAssetTool$WonderEditor.clickAssetChildrenNodeToSetCurrentNode(MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstJsonDomIndex */10](assetTreeDomRecord));
          var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
          _triggerInspectorRenameEvent(inspectorComponent, "mickeyJson");
          MainEditorAssetTool$WonderEditor.clickAssetTreeNodeToSetCurrentNode(component, MainEditorAssetNodeTool$WonderEditor.OperateTwoLayer[/* getFirstFolderDomIndexForAssetTree */5](assetTreeDomRecord));
          var inspectorComponent$1 = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
          _triggerInspectorRenameEvent(inspectorComponent$1, "mickeyFolder");
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.clickRootAssetTreeNode);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
          return StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
                        return CurrentSelectSourceEditorService$WonderEditor.setCurrentSelectSource(/* Asset */1, param);
                      }));
        };
        var _afterEach = function () {
          StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateRenameNodeTwice,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentTool$WonderEditor.buildAssetComponent);
      }));

export {
  
}
/*  Not a pure module */
