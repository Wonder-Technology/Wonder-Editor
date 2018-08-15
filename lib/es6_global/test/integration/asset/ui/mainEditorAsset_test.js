

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as OldNewSelfTool$WonderEditor from "../../../unit/tool/OldNewSelfTool.js";
import * as MainEditorAsset$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/asset/ui/MainEditorAsset.js";
import * as EventListenerTool$WonderEditor from "../../../unit/tool/EventListenerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";

describe("MainEditorAsset", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, /* () */0);
                Curry._1(EventListenerTool$WonderEditor.stubGetElementByIdReturnFakeDom, Curry._1(EventListenerTool$WonderEditor.buildFakeDom, /* () */0));
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test should update", (function () {
                Wonder_jest.test("if reatinedProps updateTypeArr include All, should update", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAsset$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* All */0]]))), true);
                      }));
                Wonder_jest.test("else if reatinedProps updateTypeArr include Asset, should update", (function () {
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAsset$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* Asset */2]]))), true);
                      }));
                return Wonder_jest.test("else, should not update", (function () {
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainEditorAsset$WonderEditor.shouldUpdate(OldNewSelfTool$WonderEditor.buildNewSelf(/* record */[/* updateTypeArr : array */[/* SceneTree */3]]))), false);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
