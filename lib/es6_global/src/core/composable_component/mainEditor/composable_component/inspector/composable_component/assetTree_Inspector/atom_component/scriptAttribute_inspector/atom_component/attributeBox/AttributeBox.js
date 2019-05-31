

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Pervasives from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Select$WonderEditor from "../../../../../../../../../../atom_component/select/Select.js";
import * as IntInput$WonderEditor from "../../../../../../../../../../atom_component/intInput/IntInput.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../external/DomHelper.js";
import * as FloatInput$WonderEditor from "../../../../../../../../../../atom_component/floatInput/FloatInput.js";
import * as StringInput$WonderEditor from "../../../../../../../../../../atom_component/stringInput/StringInput.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../../../../utils/language/LanguageUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as ScriptAttributeTypeService$WonderEditor from "../../../../../../../../../../../service/primitive/ScriptAttributeTypeService.js";
import * as ScriptAttributeInspectorUtils$WonderEditor from "../../utils/ScriptAttributeInspectorUtils.js";

function submitAttribute(nodeId, fieldName, state, submitFunc) {
  var match = state[/* attributeType */0];
  if (match) {
    return Curry._1(submitFunc, /* tuple */[
                nodeId,
                fieldName,
                {
                  type: ScriptAttributeTypeService$WonderEditor.convertFieldTypeToJsObjStr(state[/* attributeType */0]),
                  defaultValue: state[/* defaultFloat */2]
                }
              ]);
  } else {
    return Curry._1(submitFunc, /* tuple */[
                nodeId,
                fieldName,
                {
                  type: ScriptAttributeTypeService$WonderEditor.convertFieldTypeToJsObjStr(state[/* attributeType */0]),
                  defaultValue: state[/* defaultInt */1]
                }
              ]);
  }
}

var Method = /* module */[/* submitAttribute */submitAttribute];

var component = ReasonReact.reducerComponent("AttributeBox");

function reducer(nodeId, fieldName, submitFunc, action, state) {
  switch (action.tag | 0) {
    case 0 : 
        return /* Update */Block.__(0, [/* record */[
                    /* attributeType */state[/* attributeType */0],
                    /* defaultInt */action[0],
                    /* defaultFloat */state[/* defaultFloat */2]
                  ]]);
    case 1 : 
        return /* Update */Block.__(0, [/* record */[
                    /* attributeType */state[/* attributeType */0],
                    /* defaultInt */state[/* defaultInt */1],
                    /* defaultFloat */action[0]
                  ]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[
                    /* attributeType */action[0],
                    /* defaultInt */state[/* defaultInt */1],
                    /* defaultFloat */state[/* defaultFloat */2]
                  ]]);
    
  }
}

function render(param, param$1, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var removeFunc = param$1[1];
  var renameFunc = param$1[0];
  var nodeId = param[2];
  var fieldName = param[1];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* attributeType */0];
  return React.createElement("article", {
              className: "attributeBox-component"
            }, React.createElement("div", {
                  className: "component-header"
                }, React.createElement("div", {
                      className: "header-title"
                    }, DomHelper$WonderEditor.textEl("Attribute")), React.createElement("div", {
                      className: "header-close"
                    }, React.createElement("img", {
                          src: "./public/img/close.png",
                          onClick: (function (_e) {
                              return Curry._1(removeFunc, /* tuple */[
                                          nodeId,
                                          fieldName
                                        ]);
                            })
                        }))), ReasonReact.element(undefined, undefined, StringInput$WonderEditor.make(fieldName, "Name", undefined, undefined, (function (value) {
                        return Curry._1(renameFunc, /* tuple */[
                                    nodeId,
                                    fieldName,
                                    value
                                  ]);
                      }), false, /* array */[])), React.createElement("div", {
                  className: "component-content"
                }, ReasonReact.element(undefined, undefined, Select$WonderEditor.make("Type", ScriptAttributeInspectorUtils$WonderEditor.getScriptAttributeOptions(/* () */0), state[/* attributeType */0], (function (value) {
                            return Curry._1(send, /* ChangeAttributeType */Block.__(2, [value]));
                          }), LanguageUtils$WonderEditor.getInspectorLanguageDataByType("texture-min-filter-describe", languageType), /* array */[]))), match ? ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, FloatInput$WonderEditor.make(true, (function (value) {
                          return Curry._1(send, /* ChangeDefaultFloat */Block.__(1, [value]));
                        }), Pervasives.string_of_float(state[/* defaultFloat */2]), "Value", undefined, (function (value) {
                          return Curry._1(send, /* ChangeDefaultFloat */Block.__(1, [value]));
                        }), undefined, /* array */[])) : ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, IntInput$WonderEditor.make((function (value) {
                          return Curry._1(send, /* ChangeDefaultInt */Block.__(0, [value]));
                        }), String(state[/* defaultInt */1]), "Value", undefined, (function (value) {
                          return Curry._1(send, /* ChangeDefaultInt */Block.__(0, [value]));
                        }), undefined, /* array */[])));
}

function make(fieldName, nodeId, field, renameFunc, removeFunc, submitFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */(function (param) {
              return submitAttribute(nodeId, fieldName, param[/* newSelf */1][/* state */1], submitFunc);
            }),
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(/* tuple */[
                          field,
                          fieldName,
                          nodeId
                        ], /* tuple */[
                          renameFunc,
                          removeFunc,
                          submitFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              var attributeType = field[/* type_ */0];
              if (attributeType) {
                return /* record */[
                        /* attributeType */attributeType,
                        /* defaultInt */0,
                        /* defaultFloat */field[/* defaultValue */1]
                      ];
              } else {
                return /* record */[
                        /* attributeType */attributeType,
                        /* defaultInt */field[/* defaultValue */1],
                        /* defaultFloat */0
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(nodeId, fieldName, submitFunc, param, param$1);
            }),
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
