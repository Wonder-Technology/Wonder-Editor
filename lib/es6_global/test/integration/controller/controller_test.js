

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainUtils$WonderEditor from "../../../src/core/utils/engine/MainUtils.js";
import * as ReactTestTool$WonderEditor from "../../tool/ReactTestTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as NoWorkerJobConfigToolEngine$WonderEditor from "../../tool/engine/NoWorkerJobConfigToolEngine.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../src/service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";

describe("controller", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function () {
          MainEditorSceneTool$WonderEditor.initStateWithJob(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n            [\n        {\n          \"name\": \"default\",\n          \"jobs\": [\n            {\n              \"name\": \"init_transform_gizmos\"\n            }\n          ]\n        }\n      ]\n            ", undefined, undefined, undefined, /* () */0), undefined, undefined, false, undefined, /* () */0);
          return MainEditorSceneTool$WonderEditor.createDefaultScene(sandbox, MainEditorSceneTool$WonderEditor.setFirstCubeToBeCurrentSceneTreeNode);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                _prepareState(/* () */0);
                return StateLogicService$WonderEditor.getAndSetEngineState(MainUtils$WonderEditor._handleEngineState);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test TransformGizmoCoordinateSystemSwitch", (function () {
                return Wonder_jest.test("if current gizmo type is scale, disable ui", (function () {
                              StateLogicService$WonderEditor.getAndSetEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.markScale);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildController(/* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
