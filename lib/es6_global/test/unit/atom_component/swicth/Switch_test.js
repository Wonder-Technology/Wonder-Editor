

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Sinon$1 from "sinon";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as Switch$WonderEditor from "../../../../src/core/atom_component/switch/Switch.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as ReactTool$WonderEditor from "../../../tool/ui/ReactTool.js";
import * as Wonder_Console$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Wonder_Console.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("Swicth", (function (param) {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var buildSwitch = function (isOpen) {
          return ReactTestRenderer.create(ReasonReact.element(undefined, undefined, Switch$WonderEditor.make("run", (function (param) {
                                return /* () */0;
                              }), "stop", (function (param) {
                                return /* () */0;
                              }), isOpen, /* array */[])));
        };
        beforeEach((function (param) {
                sandbox[0] = Sinon$1.sandbox.create();
                return Curry._1(Wonder_Console$WonderLog.makeObjInToWindow, /* () */0);
              }));
        afterEach((function (param) {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("test workflow", (function (param) {
                describe("test initial:is close", (function (param) {
                        Wonder_jest.test("show openText", (function (param) {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(buildSwitch(false));
                              }));
                        return Wonder_jest.test("click button should execute onOpen func", (function (param) {
                                      var onCloseFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var onOpenFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state = ReactTool$WonderEditor.getUpdateState(Switch$WonderEditor.reducer(onOpenFunc, onCloseFunc, /* ChangeState */0)(/* record */[/* isOpen */false]));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      Sinon.getCallCount(onOpenFunc),
                                                      state[/* isOpen */0]
                                                    ]), /* tuple */[
                                                  1,
                                                  true
                                                ]);
                                    }));
                      }));
                describe("test initial:is open", (function (param) {
                        Wonder_jest.test("show openText", (function (param) {
                                return ReactTestTool$WonderEditor.createSnapshotAndMatch(buildSwitch(true));
                              }));
                        return Wonder_jest.test("click button should execute onClose func", (function (param) {
                                      var onCloseFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var onOpenFunc = Sinon.createEmptyStubWithJsObjSandbox(sandbox);
                                      var state = ReactTool$WonderEditor.getUpdateState(Switch$WonderEditor.reducer(onOpenFunc, onCloseFunc, /* ChangeState */0)(/* record */[/* isOpen */true]));
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      Sinon.getCallCount(onCloseFunc),
                                                      state[/* isOpen */0]
                                                    ]), /* tuple */[
                                                  1,
                                                  false
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
