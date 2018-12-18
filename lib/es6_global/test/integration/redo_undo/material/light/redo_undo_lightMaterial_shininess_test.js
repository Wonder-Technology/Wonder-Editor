

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as MainEditorAssetTool$WonderEditor from "../../../asset/tool/MainEditorAssetTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as MainEditorLightMaterialTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/renderGroup/material/tool/MainEditorLightMaterialTool.js";

describe("redo_undo: lightMaterial shininess", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _changeShininess = function (value) {
          GameObjectTool$WonderEditor.getCurrentGameObjectLightMaterial(/* () */0);
          MainEditorLightMaterialTool$WonderEditor.changeShininess(undefined, value, /* () */0);
          return MainEditorLightMaterialTool$WonderEditor.blurShininess(undefined, undefined, undefined, value, /* () */0);
        };
        var _simulateTwiceChangeShininess = function (param) {
          _changeShininess(1.1);
          return _changeShininess(12.12);
        };
        var _beforeEach = function (param) {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, (function (param) {
                        MainEditorAssetTool$WonderEditor.initAssetTree(/* () */0);
                        return MainEditorSceneTool$WonderEditor.setFirstBoxToBeCurrentSceneTreeNode(/* () */0);
                      }));
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
                    _simulateTwiceChangeShininess,
                    _beforeEach,
                    (function (param) {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildLightMaterial);
      }));

export {
  
}
/*  Not a pure module */
