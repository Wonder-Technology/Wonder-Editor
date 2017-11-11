'use strict';

import * as Jest                from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as ReasonReact         from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Tester$WonderEditor from "./Tester.js";
import * as ReactTestRenderer   from "react-test-renderer";

describe("reactTestRenderer", (function () {
        Jest.test("create returns ReactTestInstance", (function () {
                var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, Tester$WonderEditor.make(/* array */[])));
                return Jest.ExpectJs[/* toContainProperties */29](/* array */["_component"])(Jest.ExpectJs[/* expect */0](component));
              }));
        return Jest.test("toJSON returns test rendered JSON", (function () {
                      var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, Tester$WonderEditor.make(/* array */[])));
                      var json = component.toJSON();
                      JSON.parse("\n      {\n        \"type\": \"div\",\n        \"props\": {\n          \"className\":\"fck\"\n        },\n            \"children\":[\n                {\n                   \"type\":\"div\",\n                   \"props\":{\n                       \"className\":\"fff number-input-input\"\n                    },\n                   \"children\":[\"xxx\"]\n                }\n            ]\n      }\n    ");
                      return Jest.ExpectJs[/* toMatchSnapshot */16](Jest.ExpectJs[/* expect */0](json));
                    }));
      }));

export {
  
}
/*  Not a pure module */
