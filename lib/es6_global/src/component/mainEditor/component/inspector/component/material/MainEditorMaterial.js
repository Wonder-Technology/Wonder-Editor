'use strict';

import * as React                    from "react";
import * as Caml_obj                 from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact              from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog            from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as StringInput$WonderEditor from "../../../../../../ui/component/stringInput/StringInput.js";

function change(value) {
  Log$WonderLog.print(value);
  return /* () */0;
}

var Method = /* module */[/* change */change];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorMaterial");

function render(_, _$1, _$2, self) {
  return React.createElement("article", {
              className: "transform-component"
            }, ReasonReact.element(/* None */0, /* None */0, StringInput$WonderEditor.make(/* Some */[self[/* retainedProps */5][/* color */0]], /* Some */["color"], /* None */0, /* Some */[change], /* array */[])));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, materialComponent, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, materialComponent, self);
    });
  newrecord[/* retainedProps */11] = /* record */[/* color */"#ffffff"];
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
