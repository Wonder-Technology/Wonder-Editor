

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";

var Method = /* module */[];

var component = ReasonReact.statelessComponent("AssetBundleInspector");

function render(name, type_, param, _self) {
  return React.createElement("article", {
              className: "inspector-asset-wdb"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("AssetBundle")), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, React.createElement("span", {
                          className: ""
                        }, DomHelper$WonderEditor.textEl("Name:"))), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          type: "text",
                          value: name,
                          onBlur: param[1],
                          onChange: param[0]
                        }))), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, React.createElement("span", {
                          className: ""
                        }, DomHelper$WonderEditor.textEl("Type:"))), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("span", {
                          className: ""
                        }, DomHelper$WonderEditor.textEl(type_)))));
}

function make(name, type_, onChangeFunc, onBlurFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (_self) {
              return render(name, type_, /* tuple */[
                          onChangeFunc,
                          onBlurFunc
                        ], _self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
