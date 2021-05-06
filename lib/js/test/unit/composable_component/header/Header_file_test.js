'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var HeaderTool$WonderEditor = require("./tool/HeaderTool.js");
var SettingTool$WonderEditor = require("../../tool/SettingTool.js");
var DetectOSTool$WonderEditor = require("./tool/DetectOSTool.js");
var ReactTestTool$WonderEditor = require("../../../tool/ReactTestTool.js");
var BuildComponentTool$WonderEditor = require("../../../tool/BuildComponentTool.js");
var StateEditorService$WonderEditor = require("../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../tool/MainEditorSceneTool.js");

Wonder_jest.describe("Header File", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        return Wonder_jest.describe("test File", (function (param) {
                      return Wonder_jest.describe("test Controls", (function (param) {
                                    return Wonder_jest.describe("test modal content", (function (param) {
                                                  var _test = function (setOSFunc) {
                                                    Curry._1(setOSFunc, /* () */0);
                                                    StateEditorService$WonderEditor.setState(SettingTool$WonderEditor.setSetting(undefined, undefined, undefined, /* array */[
                                                              /* record */[
                                                                /* name */"focus",
                                                                /* values : array */["f"]
                                                              ],
                                                              /* record */[
                                                                /* name */"undo",
                                                                /* values : array */[
                                                                  "ctrl+z",
                                                                  "command+z"
                                                                ]
                                                              ]
                                                            ], /* () */0));
                                                    return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildUI(HeaderTool$WonderEditor.buildFileComponent(HeaderTool$WonderEditor.buildHeaderFileState(true, /* () */0), Sinon.createEmptyStubWithJsObjSandbox(sandbox), undefined, undefined, /* () */0)));
                                                  };
                                                  Wonder_jest.test("if os is mac, should show command hot keys", (function (param) {
                                                          return _test(DetectOSTool$WonderEditor.setOSToBeMac);
                                                        }));
                                                  return Wonder_jest.test("else, shouldn't show command hot keys", (function (param) {
                                                                return _test(DetectOSTool$WonderEditor.setOSToBeWin);
                                                              }));
                                                }));
                                  }));
                    }));
      }));

/*  Not a pure module */
