'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");
var MainEditorDatabaseTool$WonderEditor = require("../../../tool/MainEditorDatabaseTool.js");

Wonder_jest.describe("Header Notice", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorDatabaseTool$WonderEditor.buildFakeLocalStorage(/* () */0);
                return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test show notice", (function (param) {
                      return Wonder_jest.describe("if localStorage have no welcomeUser key", (function (param) {
                                    return Wonder_jest.test("show welcome user notice, should not show version upgrade notice", (function (param) {
                                                  return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildHeaderNotice(/* () */0));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
