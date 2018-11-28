

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as TransformUtils$WonderEditor from "../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/transform/utils/TransformUtils.js";
import * as MainEditorTransformTool$WonderEditor from "../tool/MainEditorTransformTool.js";
import * as MainEditorTransformTestTool$WonderEditor from "../tool/MainEditorTransformTestTool.js";

describe("MainEditorTransform position", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return MainEditorTransformTestTool$WonderEditor.transformBaseTest(sandbox, "test change position value", /* tuple */[
                    0,
                    TransformUtils$WonderEditor.getTransformPositionData
                  ], /* tuple */[
                    MainEditorTransformTool$WonderEditor.changePositionX,
                    MainEditorTransformTool$WonderEditor.changePositionY,
                    MainEditorTransformTool$WonderEditor.changePositionZ
                  ]);
      }));

export {
  
}
/*  Not a pure module */
