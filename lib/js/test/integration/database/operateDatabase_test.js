'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var AppExtensionUtils$WonderEditor = require("../../../src/core/utils/extension/AppExtensionUtils.js");
var MainEditorDatabaseTool$WonderEditor = require("../../tool/MainEditorDatabaseTool.js");

Wonder_jest.describe("editor: operate database", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                MainEditorDatabaseTool$WonderEditor.buildFakeLocalStorage(/* () */0);
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.test("the extension value set in database should == get extension value", (function (param) {
                      var value = "this is the value";
                      AppExtensionUtils$WonderEditor.setExtension(MainEditorDatabaseTool$WonderEditor.getExtensionTestKey(/* () */0), value);
                      return Curry._2(Wonder_jest.Expect[/* Operators */25][/* = */5], Wonder_jest.Expect[/* expect */0](OptionService$WonderEditor.unsafeGet(AppExtensionUtils$WonderEditor.getExtension(MainEditorDatabaseTool$WonderEditor.getExtensionTestKey(/* () */0)))), value);
                    }));
      }));

/*  Not a pure module */
