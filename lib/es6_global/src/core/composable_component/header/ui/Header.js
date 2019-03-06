

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomUtils$WonderEditor from "../../../utils/ui/DomUtils.js";
import * as HeaderEdit$WonderEditor from "../atom_component/edit/HeaderEdit.js";
import * as HeaderFile$WonderEditor from "../atom_component/file/HeaderFile.js";
import * as HeaderHelp$WonderEditor from "../atom_component/help/HeaderHelp.js";
import * as EventHelper$WonderEditor from "../../../external/EventHelper.js";
import * as HeaderNotice$WonderEditor from "../atom_component/notice/HeaderNotice.js";
import * as HeaderPublish$WonderEditor from "../atom_component/publish/HeaderPublish.js";

function isHeaderDom(target) {
  return DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("item-title"));
}

function isImportPackageDom(target) {
  return DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("section-fileLoad"));
}

var Method = /* module */[
  /* isHeaderDom */isHeaderDom,
  /* isImportPackageDom */isImportPackageDom
];

var component = ReasonReact.reducerComponent("Header");

function reducer(action, state) {
  if (typeof action === "number") {
    return /* Update */Block.__(0, [/* record */[
                /* isSelectNav */false,
                /* currentSelectNav : None */0
              ]]);
  } else if (action.tag) {
    var match = state[/* isSelectNav */0];
    if (match) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */false,
                  /* currentSelectNav : None */0
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */true,
                  /* currentSelectNav */action[0]
                ]]);
    }
  } else {
    var match$1 = state[/* isSelectNav */0];
    if (match$1) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */state[/* isSelectNav */0],
                  /* currentSelectNav */action[0]
                ]]);
    } else {
      return /* NoUpdate */0;
    }
  }
}

function render(uiState, dispatchFunc, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              key: "header",
              className: "wonder-header-component"
            }, React.createElement("div", {
                  className: "header-nav"
                }, ReasonReact.element(undefined, undefined, HeaderFile$WonderEditor.make(uiState, dispatchFunc, state[/* currentSelectNav */1] === /* File */1, (function (param) {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* File */1]));
                          }), (function (param) {
                            return Curry._1(send, /* HoverNav */Block.__(0, [/* File */1]));
                          }), /* array */[])), ReasonReact.element(undefined, undefined, HeaderEdit$WonderEditor.make(uiState, dispatchFunc, state[/* currentSelectNav */1] === /* Edit */2, (function (param) {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Edit */2]));
                          }), (function (param) {
                            return Curry._1(send, /* HoverNav */Block.__(0, [/* Edit */2]));
                          }), (function (param) {
                            return Curry._1(send, /* BlurNav */0);
                          }), /* array */[])), ReasonReact.element(undefined, undefined, HeaderPublish$WonderEditor.make(uiState, dispatchFunc, state[/* currentSelectNav */1] === /* Publish */3, (function (param) {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Publish */3]));
                          }), (function (param) {
                            return Curry._1(send, /* HoverNav */Block.__(0, [/* Publish */3]));
                          }), /* array */[])), ReasonReact.element(undefined, undefined, HeaderHelp$WonderEditor.make(uiState, dispatchFunc, state[/* currentSelectNav */1] === /* Help */4, (function (param) {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Help */4]));
                          }), (function (param) {
                            return Curry._1(send, /* HoverNav */Block.__(0, [/* Help */4]));
                          }), /* array */[])), ReasonReact.element(undefined, undefined, HeaderNotice$WonderEditor.make(uiState, dispatchFunc, /* array */[]))));
}

function make(uiState, dispatchFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return EventHelper$WonderEditor.addEventListener(document, "click", (function (e) {
                            var target = e.target;
                            var match = DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("item-title")) || DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("section-fileLoad"));
                            if (match) {
                              return /* () */0;
                            } else {
                              return Curry._1(send, /* BlurNav */0);
                            }
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(uiState, dispatchFunc, self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isSelectNav */false,
                      /* currentSelectNav : None */0
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
