'use strict';

import * as React       from "react";
import * as Caml_obj    from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";

var Method = /* module */[];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorMaterial");

function render(_, _$1, _$2, _$3) {
  return React.createElement("article", {
              className: "transform-component"
            }, React.createElement("input", undefined));
}

function shouldUpdate(oldNewSelf) {
  return Caml_obj.caml_notequal(oldNewSelf[/* oldSelf */0][/* retainedProps */5], oldNewSelf[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, materialCOmponent, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, materialCOmponent, self);
    });
  newrecord[/* retainedProps */11] = /* record */[/* color */"#fff"];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/* component Not a pure module */
