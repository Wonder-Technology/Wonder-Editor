'use strict';

import * as Curry                           from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon                           from "../../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1                         from "sinon";
import * as Wonder_jest                     from "../../../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainToolEngine$WonderEditor     from "../../../../logic/engine/tool/mainToolEngine.js";
import * as TestToolEngine$WonderEditor     from "../../../../logic/engine/tool/testToolEngine.js";
import * as MainEditorViewTool$WonderEditor from "./tool/mainEditorViewTool.js";

describe("test: init main", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        Wonder_jest.test("set canvas id", (function () {
                TestToolEngine$WonderEditor.prepareTime(/* () */0);
                var querySelectorAll = TestToolEngine$WonderEditor.buildFakeDomForPassCanvasId(sandbox);
                MainEditorViewTool$WonderEditor.init(sandbox);
                return Sinon.toCalledWith(/* :: */[
                            "#webgl",
                            /* [] */0
                          ], Wonder_jest.Expect[/* expect */0](querySelectorAll));
              }));
        return Wonder_jest.test("set isTest to be true", (function () {
                      TestToolEngine$WonderEditor.prepare(sandbox);
                      MainEditorViewTool$WonderEditor.init(sandbox);
                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](MainToolEngine$WonderEditor.getIsTest(/* () */0)), /* true */1);
                    }));
      }));

export {
  
}
/*  Not a pure module */
