

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ConsoleTool$WonderEditor from "../../unit/tool/external/ConsoleTool.js";
import * as ControllerTool$WonderEditor from "../../unit/composable_component/controller/tool/ControllerTool.js";
import * as MainEditorSceneTool$WonderEditor from "../../tool/MainEditorSceneTool.js";
import * as HeaderExportSceneUtils$WonderEditor from "../../../src/core/composable_component/header/utils/export/HeaderExportSceneUtils.js";

describe("header export scene", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
                return MainEditorSceneTool$WonderEditor.prepareScene(sandbox);
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("if is run", (function () {
                return Wonder_jest.test("warn", (function () {
                              ConsoleTool$WonderEditor.notShowMessage(/* () */0);
                              var warn = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "warn");
                              ControllerTool$WonderEditor.run(/* () */0);
                              HeaderExportSceneUtils$WonderEditor.exportScene("aaa");
                              return Sinon.toCalledWith(/* array */["should export scene when stop, but now is run!"], Wonder_jest.Expect[/* expect */0](warn));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
