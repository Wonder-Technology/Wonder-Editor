

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_format from "../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomExtend$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/external/DomExtend.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as InputUtils$WonderEditor from "../utils/InputUtils.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";
import * as MouseEventService$WonderEditor from "../../../service/record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../service/state/editor/LanguageEditorService.js";

function getIntRegEx(param) {
  return (/^-?(0|[1-9][0-9]*)$/);
}

function handleChangeAction(state, onChangeFunc, value) {
  if (value !== undefined) {
    var value$1 = value;
    switch (value$1) {
      case "" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */undefined,
                      /* isDragStart */state[/* isDragStart */1]
                    ]]);
      case "-" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */"-",
                      /* isDragStart */state[/* isDragStart */1]
                    ]]);
      default:
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */value$1,
                    /* isDragStart */state[/* isDragStart */1]
                  ], (function (_state) {
                      return InputUtils$WonderEditor.triggerOnChange(value$1, /* tuple */[
                                  Caml_format.caml_int_of_string,
                                  onChangeFunc
                                ]);
                    }));
    }
  } else {
    return /* NoUpdate */0;
  }
}

function handleBlurAction(state, param, languageType) {
  var onBlurFunc = param[1];
  var onChangeFunc = param[0];
  var match = state[/* inputValue */0];
  var exit = 0;
  if (match !== undefined) {
    var value = match;
    switch (value) {
      case "" : 
      case "-" : 
          exit = 1;
          break;
      default:
        return ReasonReactUtils$WonderEditor.sideEffects((function (_state) {
                      return InputUtils$WonderEditor.triggerOnBlur(value, /* tuple */[
                                  Caml_format.caml_int_of_string,
                                  onBlurFunc
                                ]);
                    }));
    }
  } else {
    exit = 1;
  }
  if (exit === 1) {
    var value$1 = "0";
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* inputValue */value$1,
                /* isDragStart */state[/* isDragStart */1]
              ], (function (_state) {
                  InputUtils$WonderEditor.triggerOnChange(value$1, /* tuple */[
                        Caml_format.caml_int_of_string,
                        onChangeFunc
                      ]);
                  return InputUtils$WonderEditor.triggerOnBlur(value$1, /* tuple */[
                              Caml_format.caml_int_of_string,
                              onBlurFunc
                            ]);
                }));
  }
  
}

function computeNewValue(currentValue, param) {
  return (currentValue + param[0] | 0) - param[1] | 0;
}

function handleDragStart($$event, send) {
  return InputUtils$WonderEditor.handleDragStart($$event, /* DragStart */0, send);
}

function handleDragDrop($$event, param, onDragDropFunc) {
  var state = param[1];
  var match = state[/* isDragStart */1];
  if (match) {
    DomExtend$Wonderjs.exitPointerLock(/* () */0);
    Curry._1(onDragDropFunc, Caml_format.caml_int_of_string(OptionService$WonderEditor.unsafeGet(state[/* inputValue */0])));
    Curry._1(param[0], /* DragDrop */2);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function handleDragOver($$event, param) {
  var state = param[1];
  var match = state[/* isDragStart */1];
  if (match) {
    Curry._1(param[0], /* Change */[String(computeNewValue(Caml_format.caml_int_of_string(OptionService$WonderEditor.unsafeGet(state[/* inputValue */0])), MouseEventService$WonderEditor.getMovementDeltaWhenPointerLockedAndFixBug($$event)))]);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function renderLabel(param, label, title, onDragDropFunc) {
  if (label !== undefined) {
    var state = param[1];
    var send = param[0];
    return React.createElement("div", {
                className: "item-header component-label",
                title: title !== undefined ? title : "",
                onMouseDown: (function ($$event) {
                    return InputUtils$WonderEditor.handleDragStart($$event, /* DragStart */0, send);
                  }),
                onMouseMove: (function ($$event) {
                    return handleDragOver($$event, /* tuple */[
                                send,
                                state
                              ]);
                  }),
                onMouseUp: (function ($$event) {
                    return handleDragDrop($$event, /* tuple */[
                                send,
                                state
                              ], onDragDropFunc);
                  })
              }, DomHelper$WonderEditor.textEl(label));
  } else {
    return null;
  }
}

function renderContent(param) {
  var send = param[0];
  var match = param[1][/* inputValue */0];
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("input", {
                  className: "input-component int-input",
                  type: "text",
                  value: match !== undefined ? match : "",
                  onBlur: (function (_e) {
                      return Curry._1(send, /* Blur */1);
                    }),
                  onChange: (function (e) {
                      return Curry._1(send, InputUtils$WonderEditor.changeInput(getIntRegEx(/* () */0), e));
                    })
                }));
}

var Method = /* module */[
  /* getIntRegEx */getIntRegEx,
  /* handleChangeAction */handleChangeAction,
  /* handleBlurAction */handleBlurAction,
  /* computeNewValue */computeNewValue,
  /* handleDragStart */handleDragStart,
  /* handleDragDrop */handleDragDrop,
  /* handleDragOver */handleDragOver,
  /* renderLabel */renderLabel,
  /* renderContent */renderContent
];

var component = ReasonReact.reducerComponent("IntInput");

function reducer(param, action, state) {
  var onChangeFunc = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* isDragStart */true
                    ]]);
      case 1 : 
          return handleBlurAction(state, /* tuple */[
                      onChangeFunc,
                      param[1]
                    ], languageType);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* isDragStart */false
                    ]]);
      
    }
  } else {
    return handleChangeAction(state, onChangeFunc, action[0]);
  }
}

function render(label, title, param, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  return React.createElement("article", {
              className: "inspector-item wonder-int-input"
            }, renderLabel(/* tuple */[
                  send,
                  state
                ], label, title, param[1]), renderContent(/* tuple */[
                  send,
                  state
                ]));
}

function make($staropt$star, defaultValue, label, onChange, onBlur, title, _children) {
  var onDragDrop = $staropt$star !== undefined ? $staropt$star : (function (param) {
        return /* () */0;
      });
  var partial_arg = /* tuple */[
    onChange,
    onBlur
  ];
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
              return render(label, title, /* tuple */[
                          onBlur,
                          onDragDrop
                        ], self);
            }),
          /* initialState */(function (param) {
              if (defaultValue !== undefined) {
                return /* record */[
                        /* inputValue */defaultValue,
                        /* isDragStart */false
                      ];
              } else {
                return /* record */[
                        /* inputValue */"0",
                        /* isDragStart */false
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, param, param$1);
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
