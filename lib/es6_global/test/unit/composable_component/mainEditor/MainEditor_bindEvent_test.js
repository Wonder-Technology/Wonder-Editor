

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as MainEditor$WonderEditor from "../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as EventEditorService$WonderEditor from "../../../../src/service/state/editor/event/EventEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "../../../tool/MainEditorSceneTool.js";
import * as ManageEventEngineService$WonderEditor from "../../../../src/service/state/engine/event/ManageEventEngineService.js";
import * as CreateCustomEventEngineService$WonderEditor from "../../../../src/service/state/engine/event/CreateCustomEventEngineService.js";

describe("test mainEditor->bind event", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _prepareState = function () {
          return MainEditorSceneTool$WonderEditor.initState(sandbox, undefined, undefined, /* () */0);
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("bind refresh_inspector event", (function () {
                return Wonder_jest.test("should dispatch", (function () {
                              _prepareState(/* () */0);
                              var dispatchFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                              MainEditor$WonderEditor.Method[/* bindRefreshInspectorEvent */4](dispatchFunc);
                              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
                              ManageEventEngineService$WonderEditor.triggerCustomGlobalEvent(CreateCustomEventEngineService$WonderEditor.create(EventEditorService$WonderEditor.getRefreshInspectorEventName(/* () */0), undefined), engineState);
                              return Sinon.toCalledOnce(Wonder_jest.Expect[/* expect */0](dispatchFunc));
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
