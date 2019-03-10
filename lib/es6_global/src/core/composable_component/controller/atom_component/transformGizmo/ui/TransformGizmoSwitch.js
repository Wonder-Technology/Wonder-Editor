

import * as Curry from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as ClassNameService$WonderEditor from "../../../../../../service/atom/ClassNameService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../utils/ui/ReasonReactUtils.js";

function _getTypeClassName(type_) {
  switch (type_) {
    case 0 : 
        return "translation";
    case 1 : 
        return "rotation";
    case 2 : 
        return "scale";
    
  }
}

function _getTitle(type_) {
  switch (type_) {
    case 0 : 
        return "translation";
    case 1 : 
        return "rotation";
    case 2 : 
        return "scale";
    
  }
}

function renderContent(param, data) {
  var send = param[1];
  var state = param[0];
  return data.map((function (param) {
                var onChangeFunc = param[/* onChangeFunc */1];
                var type_ = param[/* type_ */0];
                var match = type_ === state[/* selectedType */0];
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: ClassNameService$WonderEditor.buildMultipleClassName(/* array */[
                                  _getTypeClassName(type_),
                                  match ? "select" : "not-select"
                                ]),
                            title: _getTitle(type_),
                            onClick: (function (_e) {
                                return Curry._1(send, /* Change */[
                                            type_,
                                            onChangeFunc
                                          ]);
                              })
                          });
              }));
}

var Method = /* module */[
  /* _getTypeClassName */_getTypeClassName,
  /* _getTitle */_getTitle,
  /* renderContent */renderContent
];

var component = ReasonReact.reducerComponent("TransformGizmoSwitch");

function reducer(action, state) {
  var onChangeFunc = action[1];
  var selectedType = action[0];
  return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[/* selectedType */selectedType], (function (_state) {
                return Curry._1(onChangeFunc, selectedType);
              }));
}

function render(data, param) {
  return React.createElement("article", {
              key: "TransformGizmoSwitch",
              className: "transform-gizmo-switch"
            }, renderContent(/* tuple */[
                  param[/* state */1],
                  param[/* send */3]
                ], data));
}

function make(data, defaultType, _children) {
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
              return render(data, self);
            }),
          /* initialState */(function (param) {
              return /* record */[/* selectedType */defaultType];
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
