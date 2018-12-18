

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as ConsoleUtils$WonderEditor from "../../../src/core/utils/ui/ConsoleUtils.js";
import * as ReactTestTool$WonderEditor from "../../tool/ReactTestTool.js";
import * as ConsoleStoreTool$WonderEditor from "./tool/ConsoleStoreTool.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "../../tool/BuildComponentTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";

describe("test console unread count", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
                return ConsoleTool$WonderEditor.notShowMessage(/* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("should show unread count in bottom header", (function (param) {
                beforeEach((function (param) {
                        BuildComponentTool$WonderEditor.buildBottom(undefined, undefined, /* () */0);
                        return /* () */0;
                      }));
                Wonder_jest.test("if console one message, unread count should + 1", (function (param) {
                        ConsoleStoreTool$WonderEditor.buildStore(/* Project */0, /* () */0);
                        var partial_arg = "warn message";
                        StateLogicService$WonderEditor.getEditorState((function (param) {
                                return ConsoleUtils$WonderEditor.warn(partial_arg, param);
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildBottomHeader(TestTool$WonderEditor.buildEmptyAppState(/* () */0), undefined, /* () */0));
                      }));
                return Wonder_jest.test("\n        1.warn\n        2.show Console ui\n\n        unread count should be clear to 0\n        ", (function (param) {
                              var store = ConsoleStoreTool$WonderEditor.buildStore(/* Console */1, /* () */0);
                              var partial_arg = "warn message";
                              StateLogicService$WonderEditor.getEditorState((function (param) {
                                      return ConsoleUtils$WonderEditor.warn(partial_arg, param);
                                    }));
                              BuildComponentTool$WonderEditor.buildConsole(store, undefined, /* () */0);
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(BuildComponentTool$WonderEditor.buildBottomHeader(store, undefined, /* () */0));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
