

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Switch$WonderEditor from "../../../../src/core/atom_component/switch/Switch.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as LogTool$WonderEditor from "../../tool/LogTool.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("Swicth", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var _triggerClickSwitch = function (domChildren) {
          return BaseEventTool$WonderEditor.triggerClickEvent(domChildren[0]);
        };
        var buildSwitch = function () {
          return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Switch$WonderEditor.make("run", (function () {
                                Log$WonderLog.log("start run");
                                return /* () */0;
                              }), "stop", (function () {
                                Log$WonderLog.log("start stop");
                                return /* () */0;
                              }), false, /* array */[])));
        };
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test workflow", (function () {
                describe("test initial:is close", (function () {
                        Wonder_jest.test("show openText", (function () {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(buildSwitch(/* () */0));
                              }));
                        return Wonder_jest.test("click button should execute openFunc", (function () {
                                      var log = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "log");
                                      var component = buildSwitch(/* () */0);
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickSwitch);
                                      return Wonder_jest.Expect[/* toContain */10]("start run")(Wonder_jest.Expect[/* expect */0](LogTool$WonderEditor.getMessage(log)));
                                    }));
                      }));
                describe("click button to open", (function () {
                        Wonder_jest.test("show closeText", (function () {
                                var component = buildSwitch(/* () */0);
                                BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickSwitch);
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                              }));
                        return Wonder_jest.test("click button should execute closeFunc", (function () {
                                      var component = buildSwitch(/* () */0);
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickSwitch);
                                      var log = Sinon.createMethodStubWithJsObjSandbox(sandbox, console, "log");
                                      BaseEventTool$WonderEditor.triggerComponentEvent(component, _triggerClickSwitch);
                                      return Wonder_jest.Expect[/* toContain */10]("start stop")(Wonder_jest.Expect[/* expect */0](LogTool$WonderEditor.getMessage(log)));
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
