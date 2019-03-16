

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Zip$WonderBsJszip from "../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as FetchUtils$WonderEditor from "../../utils/FetchUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as PublishLocalModal$WonderEditor from "../../../../atom_component/publishLocalModal/PublishLocalModal.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as HeaderPublishLocalUtils$WonderEditor from "../../utils/publish/local/HeaderPublishLocalUtils.js";

function buildPublishComponentSelectNav(send, languageType) {
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowLocalModal */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("publish-local", languageType)))));
}

var Method = /* module */[/* buildPublishComponentSelectNav */buildPublishComponentSelectNav];

var component = ReasonReact.reducerComponent("HeaderPublish");

function reducer(action, state) {
  if (action) {
    return /* Update */Block.__(0, [/* record */[/* isShowLocalModal */false]]);
  } else {
    return /* Update */Block.__(0, [/* record */[/* isShowLocalModal */true]]);
  }
}

function render(param, param$1, param$2) {
  var send = param$2[/* send */3];
  var hoverNavFunc = param$1[2];
  var toggleShowNavFunc = param$1[1];
  var isPublishNav = param$1[0];
  var className = isPublishNav ? "item-title item-active" : "item-title";
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = param$2[/* state */1][/* isShowLocalModal */0];
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
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("header-publish", languageType)))), isPublishNav ? buildPublishComponentSelectNav(send, languageType) : null, match ? ReasonReact.element(undefined, undefined, PublishLocalModal$WonderEditor.make((function (param) {
                          return Curry._1(send, /* HideLocalModal */1);
                        }), LanguageUtils$WonderEditor.getHeaderLanguageDataByType("publish-local", languageType), (function (zipName, useWorker) {
                          HeaderPublishLocalUtils$WonderEditor.Publish[/* publishZip */2](/* tuple */[
                                zipName,
                                useWorker
                              ], Zip$WonderBsJszip.create, FetchUtils$WonderEditor.fetch);
                          return Curry._1(send, /* HideLocalModal */1);
                        }), "WonderLocal", false, /* array */[])) : null);
}

function make(uiState, dispatchFunc, isPublishNav, toggleShowNavFunc, hoverNavFunc, _children) {
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
                          isPublishNav,
                          toggleShowNavFunc,
                          hoverNavFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* isShowLocalModal */false];
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
