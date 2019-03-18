

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as HeaderTool$WonderEditor from "./tool/HeaderTool.js";
import * as SettingTool$WonderEditor from "../../tool/SettingTool.js";
import * as DetectOSTool$WonderEditor from "./tool/DetectOSTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";

describe("Header File", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test File", (function () {
                describe("test Controls", (function () {
                        describe("test modal content", (function () {
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
                        return /* () */0;
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
