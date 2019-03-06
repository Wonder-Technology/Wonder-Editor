

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as UIStateService$WonderEditor from "../../../../../../../../../../service/state/ui/UIStateService.js";
import * as TextureWrapUtils$WonderEditor from "../utils/TextureWrapUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as TextureFilterUtils$WonderEditor from "../utils/TextureFilterUtils.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";
import * as InspectorChangeTextureWrapSEventHandler$WonderEditor from "../eventHandler/InspectorChangeTextureWrapSEventHandler.js";
import * as InspectorChangeTextureWrapTEventHandler$WonderEditor from "../eventHandler/InspectorChangeTextureWrapTEventHandler.js";
import * as InspectorChangeTextureMagFilterEventHandler$WonderEditor from "../eventHandler/InspectorChangeTextureMagFilterEventHandler.js";
import * as InspectorChangeTextureMinFilterEventHandler$WonderEditor from "../eventHandler/InspectorChangeTextureMinFilterEventHandler.js";

function renderWrapSSelect(dispatchFunc, textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("WrapS", TextureWrapUtils$WonderEditor.getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureComponent, param);
                      })), (function (value) {
                    return Curry._3(InspectorChangeTextureWrapSEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
                                UIStateService$WonderEditor.getState(/* () */0),
                                dispatchFunc
                              ], /* () */0, /* tuple */[
                                textureComponent,
                                value
                              ]);
                  }), /* array */[]));
}

function renderWrapTSelect(dispatchFunc, textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("WrapT", TextureWrapUtils$WonderEditor.getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapT(textureComponent, param);
                      })), (function (value) {
                    return Curry._3(InspectorChangeTextureWrapTEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
                                UIStateService$WonderEditor.getState(/* () */0),
                                dispatchFunc
                              ], /* () */0, /* tuple */[
                                textureComponent,
                                value
                              ]);
                  }), /* array */[]));
}

function renderMagFilterSelect(dispatchFunc, textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Mag Filter", TextureFilterUtils$WonderEditor.getMagFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureComponent, param);
                      })), (function (value) {
                    return Curry._3(InspectorChangeTextureMagFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
                                UIStateService$WonderEditor.getState(/* () */0),
                                dispatchFunc
                              ], /* () */0, /* tuple */[
                                textureComponent,
                                value
                              ]);
                  }), /* array */[]));
}

function renderMinFilterSelect(dispatchFunc, textureComponent) {
  return ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Min Filter", TextureFilterUtils$WonderEditor.getMinFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureComponent, param);
                      })), (function (value) {
                    return Curry._3(InspectorChangeTextureMinFilterEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithTwoHandleFunc */2], /* tuple */[
                                UIStateService$WonderEditor.getState(/* () */0),
                                dispatchFunc
                              ], /* () */0, /* tuple */[
                                textureComponent,
                                value
                              ]);
                  }), /* array */[]));
}

var Method = /* module */[
  /* renderWrapSSelect */renderWrapSSelect,
  /* renderWrapTSelect */renderWrapTSelect,
  /* renderMagFilterSelect */renderMagFilterSelect,
  /* renderMinFilterSelect */renderMinFilterSelect
];

var component = ReasonReact.statelessComponent("TextureInspector");

function render(param, name, textureComponent, _self) {
  var dispatchFunc = param[0];
  return React.createElement("article", {
              key: "TextureInspector",
              className: "wonder-texture-assetTree"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Texture")), React.createElement("hr", undefined), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(name, "Name", undefined, param[1], false, /* array */[])), renderWrapSSelect(dispatchFunc, textureComponent), renderWrapTSelect(dispatchFunc, textureComponent), renderMagFilterSelect(dispatchFunc, textureComponent), renderMinFilterSelect(dispatchFunc, textureComponent));
}

function make(uiState, dispatchFunc, name, textureComponent, renameFunc, _children) {
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
