'use strict';

import * as Curry                   from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as ReasonReact             from "../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as UiTool$WonderEditor     from "../utils/uiTool.js";
import * as AppStore$WonderEditor   from "../store/appStore.js";
import * as IndexStore$WonderEditor from "../store/indexStore.js";

((require('./app.css')));

var component = ReasonReact.statelessComponent("App");

function make(state, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", undefined, React.createElement("div", undefined, UiTool$WonderEditor.textEl("strings: " + state[/* notACounter */0])), React.createElement("button", {
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
                    }, UiTool$WonderEditor.textEl("add b")), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, IndexStore$WonderEditor.TravelBackward);
                        })
                    }, UiTool$WonderEditor.textEl("undo")), React.createElement("button", {
                      onClick: (function () {
                          return Curry._1(dispatch, IndexStore$WonderEditor.TravelForward);
                        })
                    }, UiTool$WonderEditor.textEl("redo")));
    });
  return newrecord;
}

export {
  component ,
  make      ,
  
}
/*  Not a pure module */
