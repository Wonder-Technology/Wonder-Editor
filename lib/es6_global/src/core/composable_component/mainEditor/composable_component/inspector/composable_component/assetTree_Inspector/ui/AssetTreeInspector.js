

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../../bottom_components/asset/utils/AssetUtils.js";
import * as ValueService$WonderEditor from "../../../../../../../../service/atom/ValueService.js";
import * as AssetNodeUtils$WonderEditor from "../../../../bottom_components/asset/utils/AssetNodeUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as MaterialInspector$WonderEditor from "../atom_component/material_Inspector/ui/MaterialInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as AssetRenameNodeEventHandler$WonderEditor from "./eventHandler/AssetRenameNodeEventHandler.js";
import * as AssetWdbNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetWdbNodeMapEditorService.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as AssetFolderNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetFolderNodeMapEditorService.js";
import * as AssetMaterialNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetMaterialNodeMapEditorService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

var renameAssetTreeNode = AssetRenameNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildFolderComponent(state, send, currentNodeId, _) {
  return React.createElement("div", {
              className: ""
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                  className: "input-component float-input",
                  disabled: AssetUtils$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId), currentNodeId),
                  type: "text",
                  value: state[/* inputValue */0],
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */0);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, change(_e));
                    })
                }));
}

function buildJsonComponent(state, send, currentNodeId, jsonNodeMap) {
  var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, jsonNodeMap);
  return React.createElement("div", undefined, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Json")), React.createElement("hr", undefined), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                  className: "input-component float-input",
                  type: "text",
                  value: state[/* inputValue */0],
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */0);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, change(_e));
                    })
                }), React.createElement("p", undefined, DomHelper$WonderEditor.textEl(match[/* jsonResult */1])));
}

function buildTextureComponent(param, param$1, state, textureNodeMap) {
  var dispatchFunc = param[1];
  var store = param[0];
  var match = SparseMapService$WonderCommonlib.unsafeGet(param$1[0], textureNodeMap);
  var textureIndex = match[/* textureIndex */0];
  return ReasonReact.element(undefined, undefined, TextureInspector$WonderEditor.make(store, dispatchFunc, state[/* inputValue */0], textureIndex, Curry._2(renameAssetTreeNode, /* tuple */[
                      store,
                      dispatchFunc
                    ], /* tuple */[
                      textureIndex,
                      param$1[1]
                    ]), /* array */[]));
}

function buildMaterialComponent(param, param$1, state, materialNodeMap) {
  var currentNodeId = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, materialNodeMap);
  return ReasonReact.element(undefined, undefined, MaterialInspector$WonderEditor.make(store, dispatchFunc, currentNodeId, state[/* inputValue */0], match[/* type_ */1], match[/* materialComponent */2], Curry._2(renameAssetTreeNode, /* tuple */[
                      store,
                      dispatchFunc
                    ], /* tuple */[
                      currentNodeId,
                      param$1[1]
                    ]), /* array */[]));
}

function buildWdbComponent(state, send, _, _$1) {
  return React.createElement("div", undefined, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Model")), React.createElement("hr", undefined), React.createElement("span", {
                  className: ""
                }, DomHelper$WonderEditor.textEl("name:")), React.createElement("input", {
                  className: "input-component float-input",
                  type: "text",
                  value: state[/* inputValue */0],
                  onBlur: (function () {
                      return Curry._1(send, /* Blur */0);
                    }),
                  onChange: (function (_e) {
                      return Curry._1(send, change(_e));
                    })
                }));
}

function showAssetNodeComponent(reduxTuple, currentNodeId, nodeType, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var partial_arg = /* tuple */[
    currentNodeId,
    nodeType
  ];
  var partial_arg$1 = /* tuple */[
    currentNodeId,
    nodeType
  ];
  return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
              (function (param) {
                  return buildFolderComponent(state, send, currentNodeId, param);
                }),
              (function (param) {
                  return buildJsonComponent(state, send, currentNodeId, param);
                }),
              (function (param) {
                  return buildTextureComponent(reduxTuple, partial_arg, state, param);
                }),
              (function (param) {
                  return buildMaterialComponent(reduxTuple, partial_arg$1, state, param);
                }),
              (function (param) {
                  return buildWdbComponent(state, send, currentNodeId, param);
                })
            ]);
}

function initFolderName(currentNodeId, folderNodeMap) {
  var match = AssetFolderNodeMapEditorService$WonderEditor.getFolderBaseNameAndExtName(currentNodeId, folderNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

function initJsonName(currentNodeId, jsonNodeMap) {
  var match = AssetJsonNodeMapEditorService$WonderEditor.getJsonBaseNameAndExtName(currentNodeId, jsonNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

function initTextureName(currentNodeId, textureNodeMap) {
  var match = OperateTextureLogicService$WonderEditor.getTextureBaseNameAndExtName(currentNodeId, textureNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

function initMaterialName(currentNodeId, materialNodeMap) {
  var match = AssetMaterialNodeMapEditorService$WonderEditor.getMaterialBaseNameAndExtName(currentNodeId, materialNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

function initWdbName(currentNodeId, wdbNodeMap) {
  var match = AssetWdbNodeMapEditorService$WonderEditor.getWdbBaseNameAndExtName(currentNodeId, wdbNodeMap);
  var fileName = match[0];
  return /* record */[
          /* inputValue */fileName,
          /* originalName */fileName,
          /* postfix */match[1]
        ];
}

var Method = /* module */[
  /* change */change,
  /* renameAssetTreeNode */renameAssetTreeNode,
  /* buildFolderComponent */buildFolderComponent,
  /* buildJsonComponent */buildJsonComponent,
  /* buildTextureComponent */buildTextureComponent,
  /* buildMaterialComponent */buildMaterialComponent,
  /* buildWdbComponent */buildWdbComponent,
  /* showAssetNodeComponent */showAssetNodeComponent,
  /* initFolderName */initFolderName,
  /* initJsonName */initJsonName,
  /* initTextureName */initTextureName,
  /* initMaterialName */initMaterialName,
  /* initWdbName */initWdbName
];

var component = ReasonReact.reducerComponent("AssetTreeInspector");

function reducer(param, currentNodeId, nodeType, action) {
  var dispatchFunc = param[1];
  var store = param[0];
  if (action) {
    var value = action[0];
    return (function (state) {
        return /* Update */Block.__(0, [/* record */[
                    /* inputValue */value,
                    /* originalName */state[/* originalName */1],
                    /* postfix */state[/* postfix */2]
                  ]]);
      });
  } else {
    return (function (state) {
        var value = state[/* inputValue */0];
        if (value === "") {
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* originalName */1],
                      /* originalName */state[/* originalName */1],
                      /* postfix */state[/* postfix */2]
                    ]]);
        } else {
          var match = ValueService$WonderEditor.isValueEqual(/* String */0, state[/* originalName */1], state[/* inputValue */0]);
          if (match) {
            return /* NoUpdate */0;
          } else {
            return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                        /* inputValue */state[/* inputValue */0],
                        /* originalName */value,
                        /* postfix */state[/* postfix */2]
                      ], (function () {
                          return Curry._3(renameAssetTreeNode, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* tuple */[
                                      currentNodeId,
                                      nodeType
                                    ], value + state[/* postfix */2]);
                        }));
          }
        }
      });
  }
}

function render(param, currentNodeId, nodeType, self) {
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "wonder-inspector-assetTree"
            }, showAssetNodeComponent(/* tuple */[
                  param[0],
                  param[1]
                ], currentNodeId, nodeType, self));
}

function make(store, dispatchFunc, currentNodeId, nodeType, _) {
  var partial_arg = /* tuple */[
    store,
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
                          store,
                          dispatchFunc
                        ], currentNodeId, nodeType, self);
            }),
          /* initialState */(function () {
              return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
                          (function (param) {
                              return initFolderName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initJsonName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initTextureName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initMaterialName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initWdbName(currentNodeId, param);
                            })
                        ]);
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(partial_arg, currentNodeId, nodeType, param);
            }),
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
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
