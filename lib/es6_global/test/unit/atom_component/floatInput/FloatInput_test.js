

import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Wonder_jest from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer from "react-test-renderer";
import * as FloatInput$WonderEditor from "../../../../src/core/atom_component/floatInput/FloatInput.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as ReactTestTool$WonderEditor from "../../../tool/ReactTestTool.js";

describe("FloatInput", (function () {
        var _triggerChangeInputEvent = function (value, domChildren) {
          var input = domChildren[1];
          return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
        };
        describe("test FloatInput component set float value", (function () {
                Wonder_jest.test("if float value's decimal digits <= 6, can set the whole value", (function () {
                        var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make("2", "xyz", undefined, undefined, undefined, /* array */[])));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                return _triggerChangeInputEvent("351687.54654", param);
                              }));
                        BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                var value = "351687.54654";
                                var domChildren = param;
                                var input = domChildren[1];
                                return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
                              }));
                        return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                      }));
                return Wonder_jest.test("else, can't set the value", (function () {
                              var component = ReactTestRenderer.create(ReasonReact.element(undefined, undefined, FloatInput$WonderEditor.make("0", "xyz", undefined, undefined, undefined, /* array */[])));
                              BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                                      return _triggerChangeInputEvent("3.524584654", param);
                                    }));
                              return ReactTestTool$WonderEditor.createSnapshotAndMatch(component);
                            }));
              }));
        return /* () */0;
      }));

export {
  
}
/*  Not a pure module */
