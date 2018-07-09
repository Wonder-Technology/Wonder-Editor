

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as TextureWrapUtils$WonderEditor from "../utils/TextureWrapUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as TextureFilterUtils$WonderEditor from "../utils/TextureFilterUtils.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function renderWrapSSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["WrapS Mode"], TextureWrapUtils$WonderEditor.getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureId, param);
                      })), (function (param) {
                    return TextureWrapUtils$WonderEditor.changeWrapS(textureId, param);
                  }), /* array */[]));
}

function renderWrapTSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["WrapT Mode"], TextureWrapUtils$WonderEditor.getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapT(textureId, param);
                      })), (function (param) {
                    return TextureWrapUtils$WonderEditor.changeWrapT(textureId, param);
                  }), /* array */[]));
}

function renderFilterMagSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["Filter Mag Mode"], TextureFilterUtils$WonderEditor.getFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureId, param);
                      })), (function (param) {
                    return TextureFilterUtils$WonderEditor.changeFilterMag(textureId, param);
                  }), /* array */[]));
}

function renderFilterMinSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["Filter Min Mode"], TextureFilterUtils$WonderEditor.getFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureId, param);
                      })), (function (param) {
                    return TextureFilterUtils$WonderEditor.changeFilterMin(textureId, param);
                  }), /* array */[]));
}

var Method = /* module */[
  /* renderWrapSSelect */renderWrapSSelect,
  /* renderWrapTSelect */renderWrapTSelect,
  /* renderFilterMagSelect */renderFilterMagSelect,
  /* renderFilterMinSelect */renderFilterMinSelect
];

var component = ReasonReact.statelessComponent("TextureInspector");

function render(param, name, textureId, _) {
  return React.createElement("article", {
              key: "TextureInspector",
              className: "wonder-texture-assetTree"
            }, React.createElement("div", {
                  className: ""
                }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Texture")), React.createElement("hr", undefined), React.createElement("div", {
                      className: ""
                    }, ReasonReact.element(/* None */0, /* None */0, StringInput$WonderEditor.make(/* Some */[name], /* Some */["name"], /* None */0, /* Some */[param[1]], /* Some */[false], /* array */[]))), React.createElement("div", {
                      className: ""
                    }, renderWrapSSelect(textureId)), React.createElement("div", {
                      className: ""
                    }, renderWrapTSelect(textureId)), React.createElement("div", {
                      className: ""
                    }, renderFilterMagSelect(textureId)), React.createElement("div", {
                      className: ""
                    }, renderFilterMinSelect(textureId))));
}

function make(_, dispatchFunc, name, textureId, renameFunc, _$1) {
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
          /* render */(function (self) {
              return render(/* tuple */[
                          dispatchFunc,
                          renameFunc
                        ], name, textureId, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
