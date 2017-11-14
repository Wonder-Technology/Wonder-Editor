'use strict';

import * as ReasonReact              from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Wonder_jest              from "../../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/wonder_jest.js";
import * as ReactTestRenderer        from "react-test-renderer";
import * as NumberInput$WonderEditor from "../../../../src/ui/component/numberInput/numberInput.js";

describe("reactTestRenderer", (function () {
        Wonder_jest.test("create returns ReactTestInstance", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* None */0, /* None */0, /* array */[])));
                return Wonder_jest.ExpectJs[/* toContainProperties */29](/* array */["_component"])(Wonder_jest.ExpectJs[/* expect */0](component));
              }));
        Wonder_jest.test("numberInput component has no argument", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* None */0, /* None */0, /* array */[])));
                var json = component.toJSON();
                return Wonder_jest.ExpectJs[/* toMatchSnapshot */16](Wonder_jest.ExpectJs[/* expect */0](json));
              }));
        Wonder_jest.test("numberInput component has defaultValue", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* Some */["12.2"], /* None */0, /* None */0, /* array */[])));
                var json = component.toJSON();
                return Wonder_jest.ExpectJs[/* toMatchSnapshot */16](Wonder_jest.ExpectJs[/* expect */0](json));
              }));
        Wonder_jest.test("numberInput component has label", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* Some */["xyz"], /* None */0, /* array */[])));
                var json = component.toJSON();
                return Wonder_jest.ExpectJs[/* toMatchSnapshot */16](Wonder_jest.ExpectJs[/* expect */0](json));
              }));
        return Wonder_jest.test("numberInput component has defaultValue and label", (function () {
                      var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* Some */["22"], /* Some */["xyz"], /* None */0, /* array */[])));
                      var json = component.toJSON();
                      return Wonder_jest.ExpectJs[/* toMatchSnapshot */16](Wonder_jest.ExpectJs[/* expect */0](json));
                    }));
      }));

export {
  
}
/*  Not a pure module */
