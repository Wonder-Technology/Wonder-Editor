

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as TransformEventTool$WonderEditor from "../../../../../../tool/TransformEventTool.js";
import * as MainEditorTransformBaseTestTool$WonderEditor from "../tool/MainEditorTransformBaseTestTool.js";

describe("MainEditorTransform position", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return MainEditorTransformBaseTestTool$WonderEditor.transformBaseTest(sandbox, "test change position value", /* tuple */[
                    0,
                    TransformUtils$WonderEditor.getTransformPositionData
                  ], /* tuple */[
                    TransformEventTool$WonderEditor.triggerChangePositionX,
                    TransformEventTool$WonderEditor.triggerChangePositionY,
                    TransformEventTool$WonderEditor.triggerChangePositionZ
                  ]);
      }));

export {
  
}
/*  Not a pure module */
