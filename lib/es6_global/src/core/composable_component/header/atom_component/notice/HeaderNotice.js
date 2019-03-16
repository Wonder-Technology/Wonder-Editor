

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Modal$WonderEditor from "../../../../atom_component/modal/Modal.js";
import * as Copyright$WonderEditor from "../../../../../Copyright.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as LocalStorage$WonderEditor from "../../../../external/LocalStorage.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";

function getWelComeUserKey(param) {
  return "welcomeUser";
}

function getVersionKey(param) {
  return "version";
}

function getVersion(param) {
  return LocalStorage$WonderEditor.getValue("version");
}

function _buildLinkContent(languageType) {
  return /* array */[
          React.createElement("div", {
                key: "text2",
                className: "content-white"
              }),
          React.createElement("div", {
                key: "text3",
                className: "content-text"
              }, React.createElement("a", {
                    href: "https://www.wonder-3d.com/",
                    target: "view_window"
                  }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("notice-website", languageType)))),
          React.createElement("div", {
                key: "text4",
                className: "content-small-white"
              }),
          React.createElement("div", {
                key: "text5",
                className: "content-text"
              }, React.createElement("a", {
                    href: "https://forum.wonder-3d.com/",
                    target: "view_window"
                  }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("notice-forum", languageType)))),
          React.createElement("div", {
                key: "text6",
                className: "content-small-white"
              }),
          React.createElement("div", {
                key: "text7",
                className: "content-text"
              }, React.createElement("a", {
                    href: "https://www.wonder-3d.com/docs/docs/doc1-1/",
                    target: "view_window"
                  }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("notice-doc", languageType)))),
          React.createElement("div", {
                key: "text8",
                className: "content-small-white"
              }),
          React.createElement("div", {
                key: "text9",
                className: "content-text"
              }, React.createElement("a", {
                    href: "https://github.com/Wonder-Technology",
                    target: "view_window"
                  }, DomHelper$WonderEditor.textEl("Github")))
        ];
}

function buildWelComeUserModalContent(languageType) {
  var __x = /* array */[React.createElement("div", {
          key: "text1",
          className: "content-text"
        }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("welcome-content", languageType)))];
  return ArrayService$WonderEditor.fastConcat(__x, _buildLinkContent(languageType));
}

function buildVersionUpgradeModalContent(languageType) {
  var newVersion = Copyright$WonderEditor.getVersion(/* () */0);
  var __x = /* array */[React.createElement("div", {
          key: "text1",
          className: "content-text"
        }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderVersionUpgradeContentLanguageDataByType(newVersion, languageType)))];
  return ArrayService$WonderEditor.fastConcat(__x, _buildLinkContent(languageType));
}

var Method = /* module */[
  /* getWelComeUserKey */getWelComeUserKey,
  /* getVersionKey */getVersionKey,
  /* getVersion */getVersion,
  /* _buildLinkContent */_buildLinkContent,
  /* buildWelComeUserModalContent */buildWelComeUserModalContent,
  /* buildVersionUpgradeModalContent */buildVersionUpgradeModalContent
];

var component = ReasonReact.reducerComponent("HeaderNotice");

function reducer(action, state) {
  return /* Update */Block.__(0, [/* record */[
              /* isShowWelComeUserModal */false,
              /* isShowVersionUpgradeModal */false
            ]]);
}

function render(param, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* isShowWelComeUserModal */0];
  var tmp;
  if (match) {
    tmp = ReasonReact.element(undefined, undefined, Modal$WonderEditor.make(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("notice-welcome", languageType), buildWelComeUserModalContent(languageType), (function (param) {
                return Curry._1(send, /* HideWelComeUserModal */0);
              }), undefined, /* array */[]));
  } else {
    var match$1 = state[/* isShowVersionUpgradeModal */1];
    tmp = match$1 ? ReasonReact.element(undefined, undefined, Modal$WonderEditor.make(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("notice-version", languageType), buildVersionUpgradeModalContent(languageType), (function (param) {
                  return Curry._1(send, /* HideVersionUpgradeModal */1);
                }), undefined, /* array */[])) : null;
  }
  return React.createElement("div", {
              className: "header-item"
            }, tmp);
}

function make(uiState, dispatchFunc, _children) {
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
                        ], self);
            }),
          /* initialState */(function (param) {
              var match = LocalStorage$WonderEditor.getValue("welcomeUser");
              var match$1 = LocalStorage$WonderEditor.getValue("version");
              var tmp;
              if (match$1 !== undefined) {
                var match$2 = match$1 === Copyright$WonderEditor.getVersion(/* () */0);
                if (match$2) {
                  tmp = false;
                } else {
                  LocalStorage$WonderEditor.setValue("version", Copyright$WonderEditor.getVersion(/* () */0));
                  tmp = true;
                }
              } else {
                LocalStorage$WonderEditor.setValue("version", Copyright$WonderEditor.getVersion(/* () */0));
                tmp = true;
              }
              return /* record */[
                      /* isShowWelComeUserModal */match !== undefined ? match !== "ok" : (LocalStorage$WonderEditor.setValue("welcomeUser", "ok"), true),
                      /* isShowVersionUpgradeModal */tmp
                    ];
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
