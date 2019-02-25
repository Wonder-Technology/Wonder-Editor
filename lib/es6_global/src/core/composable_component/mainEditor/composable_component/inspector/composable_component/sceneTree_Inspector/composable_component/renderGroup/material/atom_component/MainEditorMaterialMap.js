

import * as Block from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Result$WonderEditor from "../../../../../../../../../../../module/Result.js";
import * as DomHelper$WonderEditor from "../../../../../../../../../../external/DomHelper.js";
import * as DragUtils$WonderEditor from "../../../../../../../../../../atom_component/dragTree/utils/DragUtils.js";
import * as ReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReactUtils.js";
import * as EventHelper$WonderEditor from "../../../../../../../../../../external/EventHelper.js";
import * as ResultUtils$WonderEditor from "../../../../../../../../../../utils/result/ResultUtils.js";
import * as ArrayService$WonderEditor from "../../../../../../../../../../../service/atom/ArrayService.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../../../../utils/ui/ReasonReactUtils.js";
import * as ImageDataMapUtils$WonderEditor from "../../../../../../../../../utils/ImageDataMapUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetWidgetService$WonderEditor from "../../../../../../../../../../../service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../../../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as TextureNodeAssetEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/asset/TextureNodeAssetEditorService.js";
import * as CurrentDragSourceEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/CurrentDragSourceEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/BasicSourceTextureEngineService.js";

function isWidget(startWidget) {
  if (startWidget !== undefined) {
    return startWidget === AssetWidgetService$WonderEditor.getWidget(/* () */0);
  } else {
    return false;
  }
}

function isTypeValid(startNodeId, editorState) {
  if (startNodeId !== undefined) {
    return OperateTreeAssetEditorService$WonderEditor.isNodeExistById(startNodeId, editorState);
  } else {
    return false;
  }
}

function _isTriggerAction(isWidgetFunc, isTypeValidFunc) {
  var match = CurrentDragSourceEditorService$WonderEditor.getCurrentDragSource(StateEditorService$WonderEditor.getState(/* () */0));
  if (Curry._1(isWidgetFunc, match[0])) {
    return Curry._2(isTypeValidFunc, match[1], StateEditorService$WonderEditor.getState(/* () */0));
  } else {
    return false;
  }
}

function handleDragEnter(isWidgetFunc, isTypeValidFunc, _) {
  var match = _isTriggerAction(isWidgetFunc, isTypeValidFunc);
  if (match) {
    return /* DragEnter */1;
  } else {
    return /* Nothing */0;
  }
}

function handleDragLeave(isWidgetFunc, isTypeValidFunc, $$event) {
  EventHelper$WonderEditor.stopPropagation($$event);
  var match = _isTriggerAction(isWidgetFunc, isTypeValidFunc);
  if (match) {
    return /* DragLeave */2;
  } else {
    return /* Nothing */0;
  }
}

var handleDragOver = EventHelper$WonderEditor.preventDefault;

function handleDragDrop(isWidgetFunc, isTypeValidFunc, $$event) {
  var startNodeId = DragUtils$WonderEditor.getDragedId($$event);
  EventHelper$WonderEditor.preventDefault($$event);
  var match = _isTriggerAction(isWidgetFunc, isTypeValidFunc);
  if (match) {
    return /* SetTextureToEngine */[
            startNodeId,
            TextureNodeAssetService$WonderEditor.getTextureComponent(StateLogicService$WonderEditor.getEditorState((function (param) {
                        return OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(startNodeId, param);
                      })))
          ];
  } else {
    return /* DragLeave */2;
  }
}

function showMapComponent(currentTextureComponent) {
  if (currentTextureComponent !== undefined) {
    var source = BasicSourceTextureEngineService$WonderEditor.unsafeGetSource(currentTextureComponent, StateEngineService$WonderEditor.unsafeGetState(/* () */0));
    return React.createElement("img", {
                src: source.src
              });
  } else {
    return null;
  }
}

function _sortByName(engineState, allTextureNodes) {
  return allTextureNodes.sort((function (textureNode1, textureNode2) {
                return NodeNameAssetLogicService$WonderEditor.getTextureNodeName(TextureNodeAssetService$WonderEditor.getTextureComponent(textureNode1), engineState).charAt(0).localeCompare(NodeNameAssetLogicService$WonderEditor.getTextureNodeName(TextureNodeAssetService$WonderEditor.getTextureComponent(textureNode2), engineState).charAt(0));
              }));
}

function _buildTextureUIComponent(param, send, engineState) {
  var textureComponent = param[2];
  var nodeId = param[1];
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0),
              className: param[0],
              onClick: (function () {
                  return Curry._1(send, /* SetTextureToEngine */[
                              nodeId,
                              textureComponent
                            ]);
                })
            }, React.createElement("img", {
                  className: "imgContent-img",
                  src: param[3]
                }), React.createElement("div", {
                  className: "imgContent-text"
                }, DomHelper$WonderEditor.textEl(NodeNameAssetLogicService$WonderEditor.getTextureNodeName(textureComponent, engineState))));
}

function _buildTextureUIComponentResult(param, send, param$1) {
  var engineState = param$1[1];
  var className = param[3];
  var textureComponent = param[1];
  var nodeId = param[0];
  return Result$WonderEditor.SameDataResult[/* either */4]((function (imgSrc) {
                return Result$WonderEditor.SameDataResult[/* success */0](_buildTextureUIComponent(/* tuple */[
                                className,
                                nodeId,
                                textureComponent,
                                imgSrc
                              ], send, engineState));
              }), ImageDataMapUtils$WonderEditor.getImgSrc(param[2], param$1[0]));
}

function showTextureAssets(state, send) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return ArrayService$WonderEditor.traverseSameDataResultAndCollectByApply((function (textureNode) {
                var match = TextureNodeAssetService$WonderEditor.getNodeData(textureNode);
                var imageDataIndex = match[/* imageDataIndex */1];
                var textureComponent = match[/* textureComponent */0];
                var nodeId = NodeAssetService$WonderEditor.getNodeId(textureNode);
                var match$1 = state[/* currentTextureComponent */2];
                if (match$1 !== undefined) {
                  var match$2 = match$1 === textureComponent;
                  var className = match$2 ? "select-item-imgContent select-item-active" : "select-item-imgContent";
                  return _buildTextureUIComponentResult(/* tuple */[
                              nodeId,
                              textureComponent,
                              imageDataIndex,
                              className
                            ], send, /* tuple */[
                              editorState,
                              engineState
                            ]);
                } else {
                  return _buildTextureUIComponentResult(/* tuple */[
                              nodeId,
                              textureComponent,
                              imageDataIndex,
                              "select-item-imgContent"
                            ], send, /* tuple */[
                              editorState,
                              engineState
                            ]);
                }
              }), _sortByName(engineState, TextureNodeAssetEditorService$WonderEditor.findAllTextureNodes(editorState)));
}

var Method = /* module */[
  /* isWidget */isWidget,
  /* isTypeValid */isTypeValid,
  /* _isTriggerAction */_isTriggerAction,
  /* handleDragEnter */handleDragEnter,
  /* handleDragLeave */handleDragLeave,
  /* handleDragOver */handleDragOver,
  /* handleDragDrop */handleDragDrop,
  /* showMapComponent */showMapComponent,
  /* _sortByName */_sortByName,
  /* _buildTextureUIComponent */_buildTextureUIComponent,
  /* _buildTextureUIComponentResult */_buildTextureUIComponentResult,
  /* showTextureAssets */showTextureAssets
];

var component = ReasonReact.reducerComponent("MainEditorMaterialMap");

function _handleSetTextureToEngine(param, param$1, param$2, state) {
  var onDropFunc = param$2[1];
  var materialComponent = param$2[0];
  var dispatchFunc = param$1[1];
  var uiState = param$1[0];
  var textureComponent = param[1];
  var textureNodeId = param[0];
  var match = state[/* currentTextureComponent */2];
  if (match !== undefined) {
    var match$1 = match === textureComponent;
    if (match$1) {
      return /* NoUpdate */0;
    } else {
      return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                  /* style */state[/* style */0],
                  /* isShowTextureGroup */state[/* isShowTextureGroup */1],
                  /* currentTextureComponent */textureComponent
                ], (function () {
                    return Curry._3(onDropFunc, /* tuple */[
                                uiState,
                                dispatchFunc
                              ], materialComponent, textureNodeId);
                  }));
    }
  } else {
    return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                /* style */state[/* style */0],
                /* isShowTextureGroup */state[/* isShowTextureGroup */1],
                /* currentTextureComponent */textureComponent
              ], (function () {
                  return Curry._3(onDropFunc, /* tuple */[
                              uiState,
                              dispatchFunc
                            ], materialComponent, textureNodeId);
                }));
  }
}

function reducer(param, param$1, action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* NoUpdate */0;
      case 1 : 
          return /* Update */Block.__(0, [/* record */[
                      /* style */ReactUtils$WonderEditor.addStyleProp("border", "2px solid coral", state[/* style */0]),
                      /* isShowTextureGroup */state[/* isShowTextureGroup */1],
                      /* currentTextureComponent */state[/* currentTextureComponent */2]
                    ]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* style */ReactUtils$WonderEditor.addStyleProp("border", "2px solid rgb(167,165,165)", state[/* style */0]),
                      /* isShowTextureGroup */state[/* isShowTextureGroup */1],
                      /* currentTextureComponent */state[/* currentTextureComponent */2]
                    ]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[
                      /* style */state[/* style */0],
                      /* isShowTextureGroup */true,
                      /* currentTextureComponent */state[/* currentTextureComponent */2]
                    ]]);
      case 4 : 
          return /* Update */Block.__(0, [/* record */[
                      /* style */state[/* style */0],
                      /* isShowTextureGroup */false,
                      /* currentTextureComponent */state[/* currentTextureComponent */2]
                    ]]);
      
    }
  } else {
    return _handleSetTextureToEngine(/* tuple */[
                action[0],
                action[1]
              ], /* tuple */[
                param[0],
                param[1]
              ], /* tuple */[
                param$1[0],
                param$1[1]
              ], state);
  }
}

function _renderDragableImage(_, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("div", {
              className: "texture-img",
              style: state[/* style */0],
              onClick: (function () {
                  return Curry._1(send, /* ShowTextureGroup */3);
                })
            }, React.createElement("div", {
                  className: "img-dragBg",
                  onDragEnter: (function (_e) {
                      return Curry._1(send, handleDragEnter(isWidget, isTypeValid, _e));
                    }),
                  onDragLeave: (function (_e) {
                      return Curry._1(send, handleDragLeave(isWidget, isTypeValid, _e));
                    }),
                  onDragOver: handleDragOver,
                  onDrop: (function (_e) {
                      return Curry._1(send, handleDragDrop(isWidget, isTypeValid, _e));
                    })
                }), showMapComponent(state[/* currentTextureComponent */2]));
}

function _renderTextureGroup(state, send) {
  return React.createElement("div", {
              className: "select-component-content"
            }, React.createElement("div", {
                  className: "select-component-item"
                }, React.createElement("div", {
                      className: "select-item-header"
                    }, DomHelper$WonderEditor.textEl("Texture")), React.createElement("div", {
                      className: "select-item-imgBody"
                    }, React.createElement("div", {
                          className: "imgBody-content"
                        }, ResultUtils$WonderEditor.handleError(showTextureAssets(state, send))))), React.createElement("div", {
                  className: "select-component-bg",
                  onClick: (function () {
                      return Curry._1(send, /* HideTextureGroup */4);
                    })
                }));
}

function render(param, param$1, param$2, self) {
  var state = self[/* state */1];
  var removeTextureFunc = param$2[1];
  var materialComponent = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  var match = state[/* isShowTextureGroup */1];
  return React.createElement("article", {
              className: "inspector-item"
            }, React.createElement("div", {
                  className: "item-header"
                }, DomHelper$WonderEditor.textEl(param$1[1])), React.createElement("div", {
                  className: "item-content item-texture"
                }, _renderDragableImage(uiState, self), React.createElement("button", {
                      className: "texture-remove",
                      onClick: (function () {
                          return Curry._3(removeTextureFunc, /* tuple */[
                                      uiState,
                                      dispatchFunc
                                    ], /* () */0, materialComponent);
                        })
                    }, DomHelper$WonderEditor.textEl("Remove"))), match ? _renderTextureGroup(state, self[/* send */3]) : null);
}

function make(uiState, dispatchFunc, materialComponent, label, getMapFunc, onDropFunc, removeTextureFunc, isShowTextureGroup, _) {
  var partial_arg = /* tuple */[
    materialComponent,
    onDropFunc
  ];
  var partial_arg$1 = /* tuple */[
    uiState,
    dispatchFunc
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
              return render(/* tuple */[
                          uiState,
                          dispatchFunc
                        ], /* tuple */[
                          materialComponent,
                          label
                        ], /* tuple */[
                          getMapFunc,
                          removeTextureFunc
                        ], self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* style */{
                        opacity: "1"
                      },
                      /* isShowTextureGroup */isShowTextureGroup,
                      /* currentTextureComponent */StateLogicService$WonderEditor.getEngineStateToGetData(Curry._1(getMapFunc, materialComponent))
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param, param$1) {
              return reducer(partial_arg$1, partial_arg, param, param$1);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  _handleSetTextureToEngine ,
  reducer ,
  _renderDragableImage ,
  _renderTextureGroup ,
  render ,
  make ,
  
}
/* component Not a pure module */
