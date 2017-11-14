'use strict';

import * as Curry                    from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                    from "react";
import * as ReasonReact              from "../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as CamlinternalOO           from "../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as Ant$WonderEditor         from "../../utils/ant.js";
import * as UiTool$WonderEditor      from "../../utils/uiTool.js";
import * as AppConfig$WonderEditor   from "../../../config/composableComponent/appConfig.js";
import * as IndexStore$WonderEditor  from "../../store/indexStore.js";
import * as MainEditor$WonderEditor  from "../../../editor/mainEditor/ui/mainEditor.js";
import * as NumberInput$WonderEditor from "../../uiComponent/numberInput/numberInput.js";

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
  var fck = function () {
    console.log(AppConfig$WonderEditor.appRecord);
    return /* () */0;
  };
  var fck2 = function (value) {
    console.log(value);
    return /* () */0;
  };
  var undo = function () {
    return Curry._1(dispatch, IndexStore$WonderEditor.TravelBackward);
  };
  var buildReactComponent = function () {
    return React.createElement("div", undefined, UiTool$WonderEditor.textEl("hehe"));
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("div", {
                  className: "app"
                }, buildReactComponent(/* () */0), ReasonReact.element(/* None */0, /* None */0, Ant$WonderEditor.Button[/* make */0](/* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* Some */["small"], /* Some */[fck], /* Some */["primary"], /* array */[UiTool$WonderEditor.textEl("xne")])), ReasonReact.element(/* None */0, /* None */0, NumberInput$WonderEditor.make(/* None */0, /* Some */["X"], /* Some */[fck2], /* array */[])), ReasonReact.element(/* None */0, /* None */0, MainEditor$WonderEditor.make(state[/* stringState */0], dispatch, /* array */[])), React.createElement("button", {
                      onClick: undo
                    }, UiTool$WonderEditor.textEl("undo")));
    });
  return newrecord;
}

export {
  importCss ,
  component ,
  make      ,
  
}
/*  Not a pure module */
