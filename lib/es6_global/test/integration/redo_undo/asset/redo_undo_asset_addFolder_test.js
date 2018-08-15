

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as AssetTreeEventTool$WonderEditor from "../../asset/tool/AssetTreeEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

describe("redo_undo: add folder", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateAddFolderTwice = function () {
          MainEditorAssetTool$WonderEditor.buildTwoLayerAssetTreeRoot(/* () */0);
          var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
          BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerAddFolderClick);
          return BaseEventTool$WonderEditor.triggerComponentEvent(component, AssetTreeEventTool$WonderEditor.triggerAddFolderClick);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        var _afterEach = function () {
          Curry._1(Sinon.restoreSandbox, sandbox[0]);
          StateEditorService$WonderEditor.setState(AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(AssetCurrentNodeDataEditorService$WonderEditor.clearCurrentNodeData(StateEditorService$WonderEditor.getState(/* () */0))));
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateAddFolderTwice,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentTool$WonderEditor.buildAssetComponent);
      }));

export {
  
}
/*  Not a pure module */
