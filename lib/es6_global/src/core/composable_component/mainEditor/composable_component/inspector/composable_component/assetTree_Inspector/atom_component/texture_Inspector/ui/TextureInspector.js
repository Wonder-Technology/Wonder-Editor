

import * as Curry from "../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Select$WonderEditor from "../../../../../../../../../atom_component/select/Select.js";
import * as AppStore$WonderEditor from "../../../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../external/DomHelper.js";
import * as StringInput$WonderEditor from "../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function changeTextureName(dispatchFunc, _, _$1) {
  return Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
}

function changeWrapS(textureId, value) {
  Log$WonderLog.print(/* tuple */[
        "select wraps ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureId],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapS(value, param, param$1);
              }));
}

function changeWrapT(textureId, value) {
  Log$WonderLog.print(/* tuple */[
        "select wrapt ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureId],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setWrapT(value, param, param$1);
              }));
}

function _getWrapOptions() {
  return /* array */[
          /* record */[
            /* key : REPEAT */2,
            /* value */"REPEAT"
          ],
          /* record */[
            /* key : MIRRORED_REPEAT */1,
            /* value */"MIRRORED_REPEAT"
          ],
          /* record */[
            /* key : CLAMP_TO_EDGE */0,
            /* value */"CLAMP_TO_EDGE"
          ]
        ];
}

function renderWrapSSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["WrapS Mode"], _getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapS(textureId, param);
                      })), (function (param) {
                    return changeWrapS(textureId, param);
                  }), /* array */[]));
}

function renderWrapTSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["WrapT Mode"], _getWrapOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getWrapT(textureId, param);
                      })), (function (param) {
                    return changeWrapT(textureId, param);
                  }), /* array */[]));
}

function _getFilterOptions() {
  return /* array */[
          /* record */[
            /* key : NEAREST */0,
            /* value */"NEAREST"
          ],
          /* record */[
            /* key : LINEAR */1,
            /* value */"LINEAR"
          ],
          /* record */[
            /* key : NEAREST_MIPMAP_NEAREST */2,
            /* value */"NEARESTMIPMAPNEAREST"
          ],
          /* record */[
            /* key : LINEAR_MIPMAP_NEAREST */3,
            /* value */"LINEARMIPMAPNEAREST"
          ],
          /* record */[
            /* key : NEAREST_MIPMAP_LINEAR */4,
            /* value */"NEARESTMIPMAPLINEAR"
          ],
          /* record */[
            /* key : LINEAR_MIPMAP_LINEAR */5,
            /* value */"LINEARMIPMAPLINEAR"
          ]
        ];
}

function changeFilterMag(textureId, value) {
  Log$WonderLog.print(/* tuple */[
        "select filter mag ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureId],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setMagFilter(value, param, param$1);
              }));
}

function changeFilterMin(textureId, value) {
  Log$WonderLog.print(/* tuple */[
        "select filter min ",
        value
      ]);
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithDiff(/* array */[/* record */[
                /* arguments : array */[textureId],
                /* type_ : Texture */3
              ]], (function (param, param$1) {
                return BasicSourceTextureEngineService$WonderEditor.setMinFilter(value, param, param$1);
              }));
}

function renderFilterMagSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["Filter Mag Mode"], _getFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMagFilter(textureId, param);
                      })), (function (param) {
                    return changeFilterMag(textureId, param);
                  }), /* array */[]));
}

function renderFilterMinSelect(textureId) {
  return ReasonReact.element(/* None */0, /* None */0, Select$WonderEditor.make(/* Some */["Filter Min Mode"], _getFilterOptions(/* () */0), StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
                        return BasicSourceTextureEngineService$WonderEditor.getMinFilter(textureId, param);
                      })), (function (param) {
                    return changeFilterMin(textureId, param);
                  }), /* array */[]));
}

var Method = /* module */[
  /* changeTextureName */changeTextureName,
  /* changeWrapS */changeWrapS,
  /* changeWrapT */changeWrapT,
  /* _getWrapOptions */_getWrapOptions,
  /* renderWrapSSelect */renderWrapSSelect,
  /* renderWrapTSelect */renderWrapTSelect,
  /* _getFilterOptions */_getFilterOptions,
  /* changeFilterMag */changeFilterMag,
  /* changeFilterMin */changeFilterMin,
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
