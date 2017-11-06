'use strict';

import * as Curry                   from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                   from "react";
import * as ReasonReact             from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as CamlinternalOO          from "../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as Ant$WonderEditor        from "../../utils/ant.js";
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

import '../../../../../../src/ui/component/app/app.scss';

var component = ReasonReact.statelessComponent("App");

function make(state, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "app"
                }, ReasonReact.element(/* None */0, /* None */0, Ant$WonderEditor.Button[/* make */0](/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */["small"], /* Some */[(function () {
                              console.log("hehe");
                              return /* () */0;
                            })], /* Some */["primary"], /* array */[UiTool$WonderEditor.textEl("xne")])), ReasonReact.element(/* None */0, /* None */0, Ant$WonderEditor.InputNumber[/* make */0](/* Some */[44.0], /* None */0, /* Some */[200.0], /* Some */[0.0], /* None */0, /* None */0, /* Some */[0.1], /* Some */[2.11], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* array */[])), React.createElement("div", {
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

