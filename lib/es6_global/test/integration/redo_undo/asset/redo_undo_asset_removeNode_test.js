

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorAssetTreeTool$WonderEditor from "../../asset/tool/MainEditorAssetTreeTool.js";
import * as MainEditorAssetHeaderOperateNodeTool$WonderEditor from "../../asset/tool/MainEditorAssetHeaderOperateNodeTool.js";

describe("redo_undo: asset remove node", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateTwiceRemoveFolder = function () {
          var assetTreeData = Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* buildTwoFolderAssetTree */1], /* () */0);
          MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getFirstFolderNodeId */3], assetTreeData), /* () */0);
          return MainEditorAssetHeaderOperateNodeTool$WonderEditor.removeFolderNode(undefined, undefined, Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Folder */5][/* TwoLayer */0][/* getSecondFolderNodeId */4], assetTreeData), /* () */0);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorAssetTool$WonderEditor.initAssetTree);
          return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
        };
        var _afterEach = function () {
          return Curry._1(Sinon.restoreSandbox, sandbox[0]);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceRemoveFolder,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentTool$WonderEditor.buildAssetComponent);
      }));

export {
  
}
/*  Not a pure module */
