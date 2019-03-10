

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as CamlinternalOO from "../../../../../../../../node_modules/bs-platform/lib/es6/camlinternalOO.js";
import * as Modal$WonderEditor from "../../../../atom_component/modal/Modal.js";
import * as Copyright$WonderEditor from "../../../../../Copyright.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ModalUtils$WonderEditor from "../../../../utils/ui/ModalUtils.js";

function buildHelpComponentSelectNav(send) {
  return React.createElement("div", {
              className: "item-content item-help"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowAboutWonderModal */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("About"))));
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

var class_tables = [
  0,
  0,
  0
];

function buildHelpComponent(state, send, uiState, dispatchFunc) {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env = CamlinternalOO.new_variable($$class, "");
    var env_init = function (env$1) {
      var self = CamlinternalOO.create_object_opt(0, $$class);
      self[env] = env$1;
      return self;
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

var Method = /* module */[
  /* buildHelpComponentSelectNav */buildHelpComponentSelectNav,
  /* getAboutWonderModalArray */getAboutWonderModalArray,
  /* buildHelpComponent */buildHelpComponent
];

var component = ReasonReact.reducerComponent("HeaderPublish");

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
                    }, DomHelper$WonderEditor.textEl("Help"))), isHelpNav ? buildHelpComponentSelectNav(send) : null, match ? ReasonReact.element(undefined, undefined, Modal$WonderEditor.make("About Wonder", ModalUtils$WonderEditor.iterateModalArrayBuildComponent(getAboutWonderModalArray(/* () */0)), (function (param) {
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
