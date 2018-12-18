

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ValueService$WonderEditor from "../../../../../../../../service/atom/ValueService.js";
import * as AssetNodeUtils$WonderEditor from "../../../../bottom_components/composable_component/project/composable_component/asset/utils/AssetNodeUtils.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as MaterialInspector$WonderEditor from "../atom_component/material_Inspector/ui/MaterialInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/StateEngineService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as OperateTextureLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/OperateTextureLogicService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/TreeRootAssetEditorService.js";
import * as AssetRenameNodeEventHandler$WonderEditor from "./eventHandler/AssetRenameNodeEventHandler.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/WDBNodeMapAssetEditorService.js";
import * as FolderNodeMapAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/FolderNodeMapAssetEditorService.js";
import * as MaterialNodeMapAssetLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/asset/MaterialNodeMapAssetLogicService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

var renameAssetTreeNode = AssetRenameNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function _isFolderNameDisabled(nodeId) {
  return TreeAssetEditorService$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId), nodeId);
}

function buildFolderComponent(state, send, currentNodeId, folderNodeMap) {
  return React.createElement("div", {
              className: "inspector-asset-folder"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Folder")), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, React.createElement("span", undefined, DomHelper$WonderEditor.textEl("Name"))), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          disabled: TreeAssetEditorService$WonderEditor.isIdEqual(StateLogicService$WonderEditor.getEditorState(TreeRootAssetEditorService$WonderEditor.getRootTreeNodeId), currentNodeId),
                          type: "text",
                          value: state[/* inputValue */0],
                          onBlur: (function (_e) {
                              return Curry._1(send, /* Blur */0);
                            }),
                          onChange: (function (_e) {
                              return Curry._1(send, change(_e));
                            })
                        }))));
}

function buildTextureComponent(param, param$1, state, textureNodeMap) {
  var currentNodeId = param$1[0];
  var dispatchFunc = param[1];
  var store = param[0];
  var match = SparseMapService$WonderCommonlib.unsafeGet(currentNodeId, textureNodeMap);
  return ReasonReact.element(undefined, undefined, TextureInspector$WonderEditor.make(store, dispatchFunc, state[/* inputValue */0], match[/* textureComponent */0], Curry._2(renameAssetTreeNode, /* tuple */[
                      store,
                      dispatchFunc
                    ], /* tuple */[
                      currentNodeId,
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

function buildWDBComponent(state, send, currentNodeId, wdbNodeMap) {
  return React.createElement("div", {
              className: "inspector-asset-wdb"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl("Model")), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, React.createElement("span", {
                          className: ""
                        }, DomHelper$WonderEditor.textEl("Name:"))), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          type: "text",
                          value: state[/* inputValue */0],
                          onBlur: (function (_e) {
                              return Curry._1(send, /* Blur */0);
                            }),
                          onChange: (function (_e) {
                              return Curry._1(send, change(_e));
                            })
                        }))));
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
  var partial_arg_000 = function (param) {
    return buildFolderComponent(state, send, currentNodeId, param);
  };
  var partial_arg_001 = function (param) {
    return buildTextureComponent(reduxTuple, partial_arg, state, param);
  };
  var partial_arg_002 = function (param) {
    return buildMaterialComponent(reduxTuple, partial_arg$1, state, param);
  };
  var partial_arg_003 = function (param) {
    return buildWDBComponent(state, send, currentNodeId, param);
  };
  var partial_arg$2 = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002,
    partial_arg_003
  ];
  return StateLogicService$WonderEditor.getEditorState((function (param) {
                return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, partial_arg$2, param);
              }));
}

function initFolderName(currentNodeId, folderNodeMap) {
  var folderName = FolderNodeMapAssetEditorService$WonderEditor.getFolderName(currentNodeId, folderNodeMap);
  return /* record */[
          /* inputValue */folderName,
          /* originalName */folderName
        ];
}

function initTextureName(currentNodeId, textureNodeMap) {
  var baseName = OperateTextureLogicService$WonderEditor.getTextureBaseName(currentNodeId, textureNodeMap);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initMaterialName(currentNodeId, engineState, materialNodeMap) {
  var baseName = MaterialNodeMapAssetLogicService$WonderEditor.getMaterialBaseName(currentNodeId, engineState, materialNodeMap);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initWDBName(currentNodeId, wdbNodeMap) {
  var baseName = WDBNodeMapAssetEditorService$WonderEditor.getWDBBaseName(currentNodeId, wdbNodeMap);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

var Method = /* module */[
  /* change */change,
  /* renameAssetTreeNode */renameAssetTreeNode,
  /* _isFolderNameDisabled */_isFolderNameDisabled,
  /* buildFolderComponent */buildFolderComponent,
  /* buildTextureComponent */buildTextureComponent,
  /* buildMaterialComponent */buildMaterialComponent,
  /* buildWDBComponent */buildWDBComponent,
  /* showAssetNodeComponent */showAssetNodeComponent,
  /* initFolderName */initFolderName,
  /* initTextureName */initTextureName,
  /* initMaterialName */initMaterialName,
  /* initWDBName */initWDBName
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
                    /* originalName */state[/* originalName */1]
                  ]]);
      });
  } else {
    return (function (state) {
        var value = state[/* inputValue */0];
        if (value === "") {
          return /* Update */Block.__(0, [/* record */[
                      /* inputValue */state[/* originalName */1],
                      /* originalName */state[/* originalName */1]
                    ]]);
        } else {
          var match = ValueService$WonderEditor.isValueEqual(/* String */0, state[/* originalName */1], state[/* inputValue */0]);
          if (match) {
            return /* NoUpdate */0;
          } else {
            return ReasonReactUtils$WonderEditor.updateWithSideEffects(/* record */[
                        /* inputValue */state[/* inputValue */0],
                        /* originalName */value
                      ], (function (_state) {
                          return Curry._3(renameAssetTreeNode, /* tuple */[
                                      store,
                                      dispatchFunc
                                    ], /* tuple */[
                                      currentNodeId,
                                      nodeType
                                    ], value);
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

function make(store, dispatchFunc, currentNodeId, nodeType, _children) {
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
          /* initialState */(function (param) {
              var editorState = StateEditorService$WonderEditor.getState(/* () */0);
              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
              return AssetNodeUtils$WonderEditor.handleSpeficFuncByAssetNodeType(nodeType, /* tuple */[
                          (function (param) {
                              return initFolderName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initTextureName(currentNodeId, param);
                            }),
                          (function (param) {
                              return initMaterialName(currentNodeId, engineState, param);
                            }),
                          (function (param) {
                              return initWDBName(currentNodeId, param);
                            })
                        ], editorState);
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
