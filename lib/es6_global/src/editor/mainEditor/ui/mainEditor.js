'use strict';

import * as Curry                 from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                 from "react";
import * as ReasonReact           from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as UiTool$WonderEditor   from "../../../ui/utils/uiTool.js";
import * as AppStore$WonderEditor from "../../../ui/store/appStore.js";

var component = ReasonReact.statelessComponent("mainEditor");

function make(state, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined, React.createElement("div", {
                      className: "fck"
                    }, UiTool$WonderEditor.textEl("what the fck: " + state[/* text */0])), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      AppStore$WonderEditor.StringAction,
                                      /* A */0
                                    ]);
                        })
                    }, UiTool$WonderEditor.textEl("add a")), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, [
                                      AppStore$WonderEditor.StringAction,
                                      /* B */1
                                    ]);
                        })
                    }, UiTool$WonderEditor.textEl("add b")));
    });
  return newrecord;
}

export {
  component ,
  make      ,
  
}
/* component Not a pure module */
