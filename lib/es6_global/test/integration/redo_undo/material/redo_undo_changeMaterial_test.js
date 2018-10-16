

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorBasicMaterialTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorBasicMaterialTool.js";

describe("redo_undo: change material", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _simulateChangeMaterial = function () {
          return MainEditorBasicMaterialTool$WonderEditor.changeMaterialTypeToBeBasicMaterial(/* () */0);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function () {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                      }));
        };
        var _afterEach = function () {
          return /* () */0;
        };
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateChangeMaterial,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildMaterial);
      }));

export {
  
}
/*  Not a pure module */
