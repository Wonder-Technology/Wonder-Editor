'use strict';

import * as React       from "react";
import * as ReasonReact from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";

var component = ReasonReact.statelessComponent("Tester");

function make() {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "fck"
                }, React.createElement("div", {
                      className: "fff number-input-input"
                    }, "xxx"));
    });
  return newrecord;
}

export {
  component ,
  make      ,
  
}
/* component Not a pure module */
