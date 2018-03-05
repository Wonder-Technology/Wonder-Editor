'use strict';

import * as Curry                             from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                             from "react";
import * as ReasonReact                       from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as ParseComponentSystem$WonderEditor from "../../extension/system/parse_component/ParseComponentSystem.js";

var component = ReasonReact.statelessComponent("UserExtension");

function render(record, name, store, _) {
  Curry._1(record[/* willRender */4], /* () */0);
  return React.createElement("article", {
              key: "panelExtension"
            }, ParseComponentSystem$WonderEditor.buildSpecificComponents(record[/* render */2], name, store));
}

function make(record, name, store, _) {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function () {
      Curry._1(record[/* didMount */5], /* () */0);
      return /* NoUpdate */0;
    });
  newrecord[/* render */9] = (function (self) {
      return render(record, name, store, self);
    });
  newrecord[/* initialState */10] = (function () {
      return Curry._1(record[/* initialState */3], /* () */0);
    });
  return newrecord;
}

export {
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
