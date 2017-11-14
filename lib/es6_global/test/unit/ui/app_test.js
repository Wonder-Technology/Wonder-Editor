'use strict';

import * as Jest                    from "../../../../../node_modules/wonder-bs-jest/lib/es6_global/src/jest.js";
import * as ReasonReact             from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
<<<<<<< HEAD
import * as App$WonderEditor        from "../../../src/ui/component/app/app.js";
=======
import * as App$WonderEditor        from "../../../src/ui/app.js";
>>>>>>> engine
import * as ReactTestRenderer       from "react-test-renderer";
import * as AppStore$WonderEditor   from "../../../src/ui/store/appStore.js";
import * as Reductive$WonderEditor  from "../../../src/ui/utils/reductive.js";
import * as IndexStore$WonderEditor from "../../../src/ui/store/indexStore.js";

describe("reactTestRenderer", (function () {
        return Jest.test("create returns ReactTestInstance", (function () {
                      var partial_arg = Reductive$WonderEditor.Store[/* dispatch */4];
                      var component = ReactTestRenderer.create(ReasonReact.element(/* None */0, /* None */0, App$WonderEditor.make(AppStore$WonderEditor.state, (function (param) {
                                      return partial_arg(IndexStore$WonderEditor.store, param);
                                    }), /* array */[])));
                      return Jest.ExpectJs[/* toContainProperties */29](/* array */["_component"])(Jest.ExpectJs[/* expect */0](component));
                    }));
      }));

export {
  
}
/*  Not a pure module */
