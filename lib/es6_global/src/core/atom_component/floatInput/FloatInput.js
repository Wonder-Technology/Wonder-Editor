

import * as Block from "../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Pervasives from "../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Caml_format from "../../../../../../node_modules/bs-platform/lib/es6/caml_format.js";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomExtend$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/external/DomExtend.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as InputUtils$WonderEditor from "../utils/InputUtils.js";
import * as ConsoleUtils$WonderEditor from "../../utils/ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as ReasonReactUtils$WonderEditor from "../../utils/ui/ReasonReactUtils.js";
import * as MouseEventService$WonderEditor from "../../../service/record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../service/state/editor/LanguageEditorService.js";

function getFloatRegEx(param) {
  return (/^-?(0|[1-9][0-9]*)(\.[0-9]{0,6})?$/);
}

function handleSpecificFuncByCanBeZero(state, value, canBeZero, param) {
  if (canBeZero) {
    return Curry._1(param[0], value);
  } else {
    return Curry._1(param[1], value);
  }
}

function handleChangeAction(state, onChangeFunc, canBeZero, value) {
  if (value !== undefined) {
    var value$1 = value;
    switch (value$1) {
      case "" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */undefined,
                      /* originValue */state[/* originValue */1],
                      /* isDragStart */state[/* isDragStart */2],
                      /* canBeZero */state[/* canBeZero */3]
                    ]]);
      case "-" : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */"-",
                      /* originValue */state[/* originValue */1],
                      /* isDragStart */state[/* isDragStart */2],
                      /* canBeZero */state[/* canBeZero */3]
                    ]]);
      case "0" : 
          return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                      (function (value) {
                          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ], (function (_state) {
                                        return InputUtils$WonderEditor.triggerOnChange(value, /* tuple */[
                                                    Caml_format.caml_float_of_string,
                                                    onChangeFunc
                                                  ]);
                                      }));
                        }),
                      (function (value) {
                          return /* Update */Block.__(0, [/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ]]);
                        })
                    ]);
      case "0." : 
          return handleSpecificFuncByCanBeZero(state, "0.", canBeZero, /* tuple */[
                      (function (value) {
                          return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ], (function (_state) {
                                        return InputUtils$WonderEditor.triggerOnChange(value, /* tuple */[
                                                    Caml_format.caml_float_of_string,
                                                    onChangeFunc
                                                  ]);
                                      }));
                        }),
                      (function (value) {
                          return /* Update */Block.__(0, [/* record */[
                                      /* inputValue */value,
                                      /* originValue */state[/* originValue */1],
                                      /* isDragStart */state[/* isDragStart */2],
                                      /* canBeZero */state[/* canBeZero */3]
                                    ]]);
                        })
                    ]);
      default:
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */value$1,
                    /* originValue */state[/* originValue */1],
                    /* isDragStart */state[/* isDragStart */2],
                    /* canBeZero */state[/* canBeZero */3]
                  ], (function (_state) {
                      return InputUtils$WonderEditor.triggerOnChange(value$1, /* tuple */[
                                  Caml_format.caml_float_of_string,
                                  onChangeFunc
                                ]);
                    }));
    }
  } else {
    return /* NoUpdate */0;
  }
}

function handleBlurAction(state, param, canBeZero, languageType) {
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
      case "0" : 
      case "0." : 
          exit = 2;
          break;
      default:
        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                    /* inputValue */state[/* inputValue */0],
                    /* originValue */value,
                    /* isDragStart */state[/* isDragStart */2],
                    /* canBeZero */state[/* canBeZero */3]
                  ], (function (_state) {
                      return InputUtils$WonderEditor.triggerOnBlur(value, /* tuple */[
                                  Caml_format.caml_float_of_string,
                                  onBlurFunc
                                ]);
                    }));
    }
  } else {
    exit = 1;
  }
  switch (exit) {
    case 1 : 
        return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                    (function (value) {
                        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                    /* inputValue */value,
                                    /* originValue */state[/* originValue */1],
                                    /* isDragStart */state[/* isDragStart */2],
                                    /* canBeZero */state[/* canBeZero */3]
                                  ], (function (_state) {
                                      InputUtils$WonderEditor.triggerOnChange(value, /* tuple */[
                                            Caml_format.caml_float_of_string,
                                            onChangeFunc
                                          ]);
                                      return InputUtils$WonderEditor.triggerOnBlur(value, /* tuple */[
                                                  Caml_format.caml_float_of_string,
                                                  onBlurFunc
                                                ]);
                                    }));
                      }),
                    (function (value) {
                        return /* Update */Block.__(0, [/* record */[
                                    /* inputValue */state[/* originValue */1],
                                    /* originValue */state[/* originValue */1],
                                    /* isDragStart */state[/* isDragStart */2],
                                    /* canBeZero */state[/* canBeZero */3]
                                  ]]);
                      })
                  ]);
    case 2 : 
        return handleSpecificFuncByCanBeZero(state, "0", canBeZero, /* tuple */[
                    (function (value) {
                        return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                                    /* inputValue */value,
                                    /* originValue */state[/* originValue */1],
                                    /* isDragStart */state[/* isDragStart */2],
                                    /* canBeZero */state[/* canBeZero */3]
                                  ], (function (_state) {
                                      return InputUtils$WonderEditor.triggerOnBlur(value, /* tuple */[
                                                  Caml_format.caml_float_of_string,
                                                  onBlurFunc
                                                ]);
                                    }));
                      }),
                    (function (_value) {
                        StateLogicService$WonderEditor.getEditorState((function (param) {
                                return ConsoleUtils$WonderEditor.warn("shouldn't be zero", param);
                              }));
                        return /* Update */Block.__(0, [/* record */[
                                    /* inputValue */state[/* originValue */1],
                                    /* originValue */state[/* originValue */1],
                                    /* isDragStart */state[/* isDragStart */2],
                                    /* canBeZero */state[/* canBeZero */3]
                                  ]]);
                      })
                  ]);
    
  }
}

function _getReplacedZero(param) {
  return 0.001;
}

function _isNearlyZero(value) {
  return Math.abs(value) <= 0.001;
}

function computeNewValue(currentValue, canBeZero, param) {
  var newValue = currentValue + param[0] / 100.0 - param[1] / 100.0;
  if (canBeZero) {
    return newValue;
  } else {
    var match = Math.abs(newValue) <= 0.001;
    if (match) {
      return 0.001;
    } else {
      return newValue;
    }
  }
}

function handleDragStart($$event, send) {
  return InputUtils$WonderEditor.handleDragStart($$event, /* DragStart */0, send);
}

function handleDragDrop($$event, param, onDragDropFunc) {
  var state = param[1];
  var match = state[/* isDragStart */2];
  if (match) {
    DomExtend$Wonderjs.exitPointerLock(/* () */0);
    Curry._1(onDragDropFunc, Caml_format.caml_float_of_string(OptionService$WonderEditor.unsafeGet(state[/* inputValue */0])));
    Curry._1(param[0], /* DragDrop */2);
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function handleDragOver($$event, param) {
  var state = param[1];
  var match = state[/* isDragStart */2];
  if (match) {
    Curry._1(param[0], /* Change */[Pervasives.string_of_float(computeNewValue(Caml_format.caml_float_of_string(OptionService$WonderEditor.unsafeGet(state[/* inputValue */0])), state[/* canBeZero */3], MouseEventService$WonderEditor.getMovementDeltaWhenPointerLockedAndFixBug($$event)))]);
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
                  className: "input-component float-input",
                  type: "text",
                  value: match !== undefined ? match : "",
                  onBlur: (function (_e) {
                      return Curry._1(send, /* Blur */1);
                    }),
                  onChange: (function (e) {
                      return Curry._1(send, InputUtils$WonderEditor.changeInput(getFloatRegEx(/* () */0), e));
                    })
                }));
}

var Method = /* module */[
  /* getFloatRegEx */getFloatRegEx,
  /* handleSpecificFuncByCanBeZero */handleSpecificFuncByCanBeZero,
  /* handleChangeAction */handleChangeAction,
  /* handleBlurAction */handleBlurAction,
  /* _getReplacedZero */_getReplacedZero,
  /* _isNearlyZero */_isNearlyZero,
  /* computeNewValue */computeNewValue,
  /* handleDragStart */handleDragStart,
  /* handleDragDrop */handleDragDrop,
  /* handleDragOver */handleDragOver,
  /* renderLabel */renderLabel,
  /* renderContent */renderContent
];

var component = ReasonReact.reducerComponent("FloatInput");

function reducer(param, canBeZero, action, state) {
  var onChangeFunc = param[0];
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* originValue */state[/* originValue */1],
                      /* isDragStart */true,
                      /* canBeZero */state[/* canBeZero */3]
                    ]]);
      case 1 : 
          return handleBlurAction(state, /* tuple */[
                      onChangeFunc,
                      param[1]
                    ], canBeZero, languageType);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* inputValue */0],
                      /* originValue */state[/* originValue */1],
                      /* isDragStart */false,
                      /* canBeZero */state[/* canBeZero */3]
                    ]]);
      
    }
  } else {
    return handleChangeAction(state, onChangeFunc, canBeZero, action[0]);
  }
}

function render(label, title, param, param$1) {
  var send = param$1[/* send */3];
  var state = param$1[/* state */1];
  return React.createElement("article", {
              className: "inspector-item wonder-float-input"
            }, renderLabel(/* tuple */[
                  send,
                  state
                ], label, title, param[1]), renderContent(/* tuple */[
                  send,
                  state
                ]));
}

function make($staropt$star, $staropt$star$1, defaultValue, label, onChange, onBlur, title, _children) {
  var canBeZero = $staropt$star !== undefined ? $staropt$star : true;
  var onDragDrop = $staropt$star$1 !== undefined ? $staropt$star$1 : (function (param) {
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
                var value = defaultValue;
                return /* record */[
                        /* inputValue */value,
                        /* originValue */value,
                        /* isDragStart */false,
                        /* canBeZero */canBeZero
                      ];
              } else {
                return /* record */[
                        /* inputValue */"0",
                        /* originValue */"0",
                        /* isDragStart */false,
                        /* canBeZero */canBeZero
                      ];
              }
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg, canBeZero, param, param$1);
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
