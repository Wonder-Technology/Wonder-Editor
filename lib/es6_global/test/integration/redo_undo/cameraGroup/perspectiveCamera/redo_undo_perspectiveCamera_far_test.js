

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as RedoUndoTool$WonderEditor from "../../tool/RedoUndoTool.js";
import * as EventListenerTool$WonderEditor from "../../../../unit/tool/EventListenerTool.js";
import * as DirectorToolEngine$WonderEditor from "../../../../tool/engine/DirectorToolEngine.js";
import * as MainEditorSceneTool$WonderEditor from "../../../../tool/MainEditorSceneTool.js";
import * as BuildComponentForCurryTool$WonderEditor from "../../../../tool/BuildComponentForCurryTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as MainEditorCameraProjectionTool$WonderEditor from "../../../inspector/composable_component/sceneTree_inspector/cameraGroup/cameraProjection/tool/MainEditorCameraProjectionTool.js";

describe("redo_undo: perspectiveCamera far", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        var _changeFar = function (value) {
          var farDomIndex = MainEditorCameraProjectionTool$WonderEditor.getFarDomIndex(/* () */0);
          return MainEditorCameraProjectionTool$WonderEditor.triggerPerspectiveCameraChangeAndBlurEvent(farDomIndex, value);
        };
        var _simulateTwiceChangeFar = function () {
          _changeFar(10.112);
          return _changeFar(123.12);
        };
        var _beforeEach = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, undefined, undefined, undefined, undefined, /* () */0), undefined, undefined, undefined, /* () */0);
          Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
          MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setSceneFirstCameraToBeCurrentSceneTreeNode);
          return DirectorToolEngine$WonderEditor.prepareAndInitAllEnginState(/* () */0);
        };
        return RedoUndoTool$WonderEditor.testRedoUndoTwoStep(sandbox, "prepare first step: set currentSceneTreeNode", /* tuple */[
                    _simulateTwiceChangeFar,
                    _beforeEach,
                    (function () {
                        return /* () */0;
                      })
                  ], BuildComponentForCurryTool$WonderEditor.buildCameraProjection);
      }));

export {
  
}
/*  Not a pure module */
