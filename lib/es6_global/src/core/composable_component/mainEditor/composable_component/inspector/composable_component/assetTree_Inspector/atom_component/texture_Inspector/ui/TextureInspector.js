

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as TextureWrapUtils$WonderEditor from "../utils/TextureWrapUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as TextureFilterUtils$WonderEditor from "../utils/TextureFilterUtils.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function renderWrapSSelect(textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("WrapS", TextureWrapUtils$WonderEditor.getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, param);
                      })), (function (param) {
                    return TextureWrapUtils$WonderEditor.changeWrapS(textureComponent, param);
                  }), /* array */[]));
}

function renderWrapTSelect(textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("WrapT", TextureWrapUtils$WonderEditor.getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapT(textureComponent, param);
                      })), (function (param) {
                    return TextureWrapUtils$WonderEditor.changeWrapT(textureComponent, param);
                  }), /* array */[]));
}

function renderMagFilterSelect(textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Mag Filter", TextureFilterUtils$WonderEditor.getMagFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureComponent, param);
                      })), (function (param) {
                    return TextureFilterUtils$WonderEditor.changeMagFilter(textureComponent, param);
                  }), /* array */[]));
}

function renderMinFilterSelect(textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Min Filter", TextureFilterUtils$WonderEditor.getMinFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureComponent, param);
                      })), (function (param) {
                    return TextureFilterUtils$WonderEditor.changeMinFilter(textureComponent, param);
                  }), /* array */[]));
}

var Method = /* module */[
  /* renderWrapSSelect */renderWrapSSelect,
  /* renderWrapTSelect */renderWrapTSelect,
  /* renderMagFilterSelect */renderMagFilterSelect,
  /* renderMinFilterSelect */renderMinFilterSelect
];

var component = ReasonReact.statelessComponent("TextureInspector");

function render(param, name, textureComponent, _) {
  return React.createElement("article", {
              key: "TextureInspector",
              className: "wonder-texture-assetTree"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Texture")), React.createElement("hr", undefined), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(name, "Name", undefined, param[1], false, /* array */[])), renderWrapSSelect(textureComponent), renderWrapTSelect(textureComponent), renderMagFilterSelect(textureComponent), renderMinFilterSelect(textureComponent));
}

function make(_, dispatchFunc, name, textureComponent, renameFunc, _$1) {
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
                        ], name, textureComponent, self);
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
