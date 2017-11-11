'use strict';

import * as Jest                              from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as ReasonReact                       from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Tester$WonderEditor               from "./Tester.js";
import * as ReactTestRenderer$slashshallow    from "react-test-renderer/shallow";
import * as ReactShallowRenderer$WonderEditor from "../../external/ReactShallowRenderer.js";

var element = {
  type: "div",
  key: null,
  ref: null,
  props: { },
  _owner: null,
  _store: { }
};

describe("reactShallowRenderer", (function () {
        Jest.test("createRenderer", (function () {
                var renderer = ReactTestRenderer$slashshallow.createRenderer();
                return Jest.ExpectJs[/* toBeDefined */24](Jest.ExpectJs[/* expect */0](renderer));
              }));
        Jest.test("render accepts renderer", (function () {
                var renderer = ReactTestRenderer$slashshallow.createRenderer();
                var render = function (param) {
                  return renderer.render(param);
                };
                return Jest.ExpectJs[/* toBe */2]("function")(Jest.ExpectJs[/* expect */0](typeof render));
              }));
        Jest.test("render will render a component", (function () {
                var renderer = ReactTestRenderer$slashshallow.createRenderer();
                var component = renderer.render(ReasonReact.element(/* None */0, /* None */0, Tester$WonderEditor.make(/* array */[])));
                return Jest.ExpectJs[/* toMatchObject */30](element)(Jest.ExpectJs[/* expect */0](component));
              }));
        Jest.test("renderWithRenderer will render a component", (function () {
                var component = ReactShallowRenderer$WonderEditor.renderWithRenderer(ReasonReact.element(/* None */0, /* None */0, Tester$WonderEditor.make(/* array */[])));
                return Jest.ExpectJs[/* toMatchObject */30](element)(Jest.ExpectJs[/* expect */0](component));
              }));
        Jest.test("getRenderOutput returns element", (function () {
                var renderer = ReactTestRenderer$slashshallow.createRenderer();
                renderer.render(ReasonReact.element(/* None */0, /* None */0, Tester$WonderEditor.make(/* array */[])));
                var component = renderer.getRenderOutput();
                return Jest.ExpectJs[/* toMatchObject */30](element)(Jest.ExpectJs[/* expect */0](component));
              }));
        return Jest.test("unmount removes the node", (function () {
                      var renderer = ReactTestRenderer$slashshallow.createRenderer();
                      renderer.render(ReasonReact.element(/* None */0, /* None */0, Tester$WonderEditor.make(/* array */[])));
                      renderer.unmount();
                      var component = renderer.getRenderOutput();
                      return Jest.ExpectJs[/* toBeNull */26](Jest.ExpectJs[/* expect */0](component));
                    }));
      }));

export {
  element ,
  
}
/* element Not a pure module */
