'use strict';

import * as Curry                   from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as ReasonReact             from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as CamlinternalOO          from "../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as UiTool$WonderEditor     from "../../utils/uiTool.js";
import * as AppStore$WonderEditor   from "../../store/appStore.js";
import * as IndexStore$WonderEditor from "../../store/indexStore.js";

var class_tables = [
  0,
  0,
  0
];

function importCss() {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

importCss("./app.scss");

var component = ReasonReact.statelessComponent("App");

function make(state, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "app"
                }, React.createElement("div", {
                      className: "fck"
                    }, UiTool$WonderEditor.textEl("strings: " + state[/* notACounter */0])), React.createElement("button", {
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
  importCss ,
  component ,
  make      ,
  
}
/*  Not a pure module */
