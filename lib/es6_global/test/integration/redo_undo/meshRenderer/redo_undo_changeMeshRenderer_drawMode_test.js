

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorMeshRendererTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/renderGroup/meshRenderer/tool/MainEditorMeshRendererTool.js";

describe("redo_undo: change meshRenderer drawMode", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateChangeTwiceDrawMode = function () {
          var lineType = MainEditorMeshRendererTool$WonderEditor.getDrawModeLineType(/* () */0);
          MainEditorMeshRendererTool$WonderEditor.changeMode(lineType, undefined, undefined, undefined, /* () */0);
          var triangleFanType = MainEditorMeshRendererTool$WonderEditor.getDrawModeTriangleFanType(/* () */0);
          return MainEditorMeshRendererTool$WonderEditor.changeMode(triangleFanType, undefined, undefined, undefined, /* () */0);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                      }));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateChangeTwiceDrawMode,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildMeshRenderer);
      }));

export {
  
}
/*  Not a pure module */
