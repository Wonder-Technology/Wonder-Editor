

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as OptionService$WonderEditor from "../../../src/service/primitive/OptionService.js";
import * as AppExtensionUtils$WonderEditor from "../../../src/core/utils/extension/AppExtensionUtils.js";
import * as MainEditorDatabaseTool$WonderEditor from "../../tool/MainEditorDatabaseTool.js";

describe("editor: operate database", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                MainEditorDatabaseTool$WonderEditor.buildFakeLocalStorage(/* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.test("the extension value set in database should == get extension value", (function () {
                      var value = "this is the value";
                      AppExtensionUtils$WonderEditor.setExtension(MainEditorDatabaseTool$WonderEditor.getExtensionTestKey(/* () */0), value);
                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(AppExtensionUtils$WonderEditor.getExtension(MainEditorDatabaseTool$WonderEditor.getExtensionTestKey(/* () */0)))), value);
                    }));
      }));

export {
  
}
/*  Not a pure module */
