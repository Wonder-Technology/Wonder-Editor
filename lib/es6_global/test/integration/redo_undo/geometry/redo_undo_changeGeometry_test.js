

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as RedoUndoTool$WonderEditor from "../tool/RedoUndoTool.js";
import * as GameObjectTool$WonderEditor from "../../../tool/GameObjectTool.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as MainEditorGeometryTool$WonderEditor from "../../inspector/composable_component/sceneTree_inspector/geometry/tool/MainEditorGeometryTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../tool/BuildComponentForCurryTool.js";

describe("redo_undo: change geometry", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _simulateChangeGeometry = function () {
          return MainEditorGeometryTool$WonderEditor.changeGeometry(GameObjectTool$WonderEditor.getCurrentGameObjectGeometry(/* () */0), MainEditorGeometryTool$WonderEditor.getDefaultSphereGeometryComponent(undefined, /* () */0), undefined, undefined, undefined, /* () */0);
        };
        var _beforeEach = function () {
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        var _afterEach = function () {
          return /* () */0;
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return RedoUndoTool$WonderEditor.testRedoUndoOneStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateChangeGeometry,
                    _beforeEach,
                    _afterEach
                  ], BuildComponentForCurryTool$WonderEditor.buildGeometry);
      }));

export {
  
}
/*  Not a pure module */
