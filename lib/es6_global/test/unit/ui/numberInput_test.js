'use strict';

import * as Jest                     from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as ReasonReact              from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as ReactTestRenderer        from "react-test-renderer";
import * as NumberInput$WonderEditor from "../../../src/ui/uiComponent/numberInput/numberInput.js";

describe("reactTestRenderer", (function () {
        Jest.test("create returns ReactTestInstance", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* None */0, /* None */0, /* array */[])));
                return Jest.ExpectJs[/* toContainProperties */29](/* array */["_component"])(Jest.ExpectJs[/* expect */0](component));
              }));
        Jest.test("numberInput component has no argument", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* None */0, /* None */0, /* array */[])));
                var json = component.toJSON();
                return Jest.ExpectJs[/* toMatchSnapshot */16](Jest.ExpectJs[/* expect */0](json));
              }));
        Jest.test("numberInput component has defaultValue", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* Some */["12.2"], /* None */0, /* None */0, /* array */[])));
                var json = component.toJSON();
                return Jest.ExpectJs[/* toMatchSnapshot */16](Jest.ExpectJs[/* expect */0](json));
              }));
        Jest.test("numberInput component has label", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* Some */["xyz"], /* None */0, /* array */[])));
                var json = component.toJSON();
                return Jest.ExpectJs[/* toMatchSnapshot */16](Jest.ExpectJs[/* expect */0](json));
              }));
        return Jest.test("numberInput component has defaultValue and label", (function () {
                      var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* Some */["22"], /* Some */["xyz"], /* None */0, /* array */[])));
                      var json = component.toJSON();
                      return Jest.ExpectJs[/* toMatchSnapshot */16](Jest.ExpectJs[/* expect */0](json));
                    }));
      }));

export {
  
}
/*  Not a pure module */
