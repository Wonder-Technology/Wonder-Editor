'use strict';

import * as Block                  from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry                  from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                  from "react";
import * as ReasonReact            from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Css$WonderEditor       from "../../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";

Css$WonderEditor.importCss("./css/componentBox.css");

function showComponent() {
  return /* ShowComponent */0;
}

var Method = /* module */[/* showComponent */showComponent];

var component = ReasonReact.reducerComponent("ComponentBox");

function reducer(_, state) {
  var match = state[/* isShowComponent */0];
  if (match !== 0) {
    return /* Update */Block.__(0, [/* record */[
                /* isShowComponent : false */0,
                /* triangleDirection */"triangle-right"
              ]]);
  } else {
    return /* Update */Block.__(0, [/* record */[
                /* isShowComponent : true */1,
                /* triangleDirection */"triangle-bottom"
              ]]);
  }
}

function render(header, closable, gameObjectComponent, param) {
  var state = param[/* state */4];
  var match = state[/* isShowComponent */0];
  return React.createElement("article", {
              className: "componentBox-component"
            }, React.createElement("div", {
                  className: "header"
                }, React.createElement("div", {
                      className: "header-triangle",
                      onClick: Curry._1(param[/* reduce */3], showComponent)
                    }, React.createElement("span", {
                          className: state[/* triangleDirection */1]
                        })), React.createElement("div", {
                      className: "header-title"
                    }, DomHelper$WonderEditor.textEl(header)), closable !== 0 ? React.createElement("span", {
                        className: "header-close"
                      }, DomHelper$WonderEditor.textEl("x")) : null), match !== 0 ? gameObjectComponent : null);
}

function make(header, closable, gameObjectComponent, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(header, closable, gameObjectComponent, self);
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* isShowComponent : true */1,
              /* triangleDirection */"triangle-bottom"
            ];
    });
  newrecord[/* reducer */12] = reducer;
  return newrecord;
}

export {
  Method    ,
  component ,
  reducer   ,
  render    ,
  make      ,
  
}
/*  Not a pure module */
