

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../tool/external/ConsoleTool.js";
import * as Wonder_Console$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Wonder_Console.js";
import * as ExtensionTool$WonderEditor from "../../tool/ExtensionTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("PanelExtension", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return Curry._1(Wonder_Console$WonderLog.makeObjInToWindow, /* () */0);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test build component", (function () {
                Wonder_jest.test("accord to user json data, build component", (function () {
                        var extensionText = ExtensionTool$WonderEditor.getExtensionText(/* () */0);
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ExtensionTool$WonderEditor.buildSpecificExtesion("App", extensionText, 0, ExtensionTool$WonderEditor.buildFakeExtensionAppState(extensionText))));
                      }));
                return Wonder_jest.test("if the parent is different from the one specified in extensionText, don't render", (function () {
                              var extensionText = ExtensionTool$WonderEditor.getExtensionText(/* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(ReactTestRenderer.create(ExtensionTool$WonderEditor.buildSpecificExtesion("MainEditor", extensionText, 0, ExtensionTool$WonderEditor.buildFakeExtensionAppState(extensionText))));
                            }));
              }));
        describe("deal with specific case", (function () {
                describe("test exception", (function () {
                        describe("test error", (function () {
                                var _test = function (extensionText, expectedMsg) {
                                  var error = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "error");
                                  ReactTestRenderer.create(ExtensionTool$WonderEditor.buildSpecificExtesion("App", extensionText, 0, ExtensionTool$WonderEditor.buildFakeExtensionAppState(extensionText)));
                                  return Wonder_jest.Expect[/* toContain */10](expectedMsg)(Wonder_jest.Expect[/* expect */0](ConsoleTool$WonderEditor.getMessage(error)));
                                };
                                Wonder_jest.test("if extension not add text for div, log error message and continue", (function () {
                                        return _test(ExtensionTool$WonderEditor.getNoDivTextCaseText(/* () */0), "buildDiv");
                                      }));
                                Wonder_jest.test("if extension not add text for button, log error message and continue", (function () {
                                        return _test(ExtensionTool$WonderEditor.getNoButtonTextCaseText(/* () */0), "buildButton");
                                      }));
                                Wonder_jest.test("if extension add error atom component name, log error message and continue", (function () {
                                        return _test(ExtensionTool$WonderEditor.getNotFindAtomCaseText(/* () */0), "_getUniqueAtomAttribute");
                                      }));
                                Wonder_jest.test("if extension add error atom component type, log error message and continue", (function () {
                                        return _test(ExtensionTool$WonderEditor.getAttributeTypeErrorCaseText(/* () */0), "_createArgumentArray");
                                      }));
                                return Wonder_jest.test("if extension not set function in methodExtension, log error message and continue", (function () {
                                              return _test(ExtensionTool$WonderEditor.getNotFindFunctionInMethodExtensionCaseText(/* () */0), "the specific function onChange : changeHandle not exist in appState->mapState->componentsMap");
                                            }));
                              }));
                        describe("test fatal", (function () {
                                Wonder_jest.test("if can't set map in the store, fatal", (function () {
                                        return Wonder_jest.Expect[/* toThrowMessageRe */21]((/appState->mapState->componentsMap is none/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                          var extensionText = ExtensionTool$WonderEditor.getExtensionText(/* () */0);
                                                          return ReactTestRenderer.create(ExtensionTool$WonderEditor.buildSpecificExtesion("App", extensionText, 0, TestTool$WonderEditor.buildEmptyAppState(/* () */0)));
                                                        })));
                                      }));
                                return Wonder_jest.test("if can't find the specific map in the state componentsMap, fatal", (function () {
                                              return Wonder_jest.Expect[/* toThrowMessageRe */21]((/_getUniqueMapByComponentName/img), Wonder_jest.Expect[/* expect */0]((function () {
                                                                var extensionText = ExtensionTool$WonderEditor.getExtensionText(/* () */0);
                                                                var specificExtensionText = ExtensionTool$WonderEditor.getExtensionSpecificCaseText(/* () */0);
                                                                return ReactTestRenderer.create(ExtensionTool$WonderEditor.buildSpecificExtesion("App", extensionText, 0, ExtensionTool$WonderEditor.buildFakeExtensionAppState(specificExtensionText)));
                                                              })));
                                            }));
                              }));
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
