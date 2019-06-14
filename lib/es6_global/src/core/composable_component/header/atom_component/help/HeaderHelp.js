

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Modal$WonderEditor from "../../../../atom_component/modal/Modal.js";
import * as Copyright$WonderEditor from "../../../../../Copyright.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ModalUtils$WonderEditor from "../../../../utils/ui/ModalUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";

function buildHelpComponentSelectNav(send, languageType) {
  return React.createElement("div", {
              className: "item-content item-help"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowAboutWonderModal */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("help-about", languageType)))));
}

function getAboutWonderModalArray(param) {
  return /* array */[
          /* tuple */[
            "Version",
            Copyright$WonderEditor.getVersion(/* () */0),
            false,
            ""
          ],
          /* tuple */[
            "Website",
            "www.wonder-3d.com/",
            true,
            "http://www.wonder-3d.com/"
          ],
          /* tuple */[
            "Feedback",
            "forum.wonder-3d.com/",
            true,
            "https://forum.wonder-3d.com/"
          ],
          /* tuple */[
            "Editor Github",
            "github.com/Wonder-Technology/Wonder-Editor",
            true,
            "https://github.com/Wonder-Technology/Wonder-Editor"
          ],
          /* tuple */[
            "Engine Github",
            "github.com/Wonder-Technology/Wonder.js",
            true,
            "https://github.com/Wonder-Technology/Wonder.js"
          ]
        ];
}

var Method = /* module */[
  /* buildHelpComponentSelectNav */buildHelpComponentSelectNav,
  /* getAboutWonderModalArray */getAboutWonderModalArray
];

var component = ReasonReact.reducerComponent("HeaderHelp");

function reducer(action, state) {
  if (action) {
    return /* Update */Block.__(0, [/* record */[/* isShowAboutWonderModal */false]]);
  } else {
    return /* Update */Block.__(0, [/* record */[/* isShowAboutWonderModal */true]]);
  }
}

function render(param, param$1, param$2) {
  var send = param$2[/* send */3];
  var hoverNavFunc = param$1[2];
  var toggleShowNavFunc = param$1[1];
  var isHelpNav = param$1[0];
  var className = isHelpNav ? "item-title item-active" : "item-title";
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = param$2[/* state */1][/* isShowAboutWonderModal */0];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function (e) {
                          return Curry._1(toggleShowNavFunc, /* () */0);
                        }),
                      onMouseOver: (function (e) {
                          return Curry._1(hoverNavFunc, /* () */0);
                        })
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("header-help", languageType)))), isHelpNav ? buildHelpComponentSelectNav(send, languageType) : null, match ? ReasonReact.element(undefined, undefined, Modal$WonderEditor.make(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("help-about", languageType), ModalUtils$WonderEditor.iterateModalArrayBuildComponent(getAboutWonderModalArray(/* () */0)), (function (param) {
                          return Curry._1(send, /* HideAboutWonderModal */1);
                        }), undefined, /* array */[])) : null);
}

function make(uiState, dispatchFunc, isHelpNav, toggleShowNavFunc, hoverNavFunc, _children) {
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
                          uiState,
                          dispatchFunc
                        ], /* tuple */[
                          isHelpNav,
                          toggleShowNavFunc,
                          hoverNavFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* isShowAboutWonderModal */false];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
