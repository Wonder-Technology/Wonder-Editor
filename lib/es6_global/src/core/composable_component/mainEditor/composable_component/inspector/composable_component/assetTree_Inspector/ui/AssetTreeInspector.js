

import * as Block from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as ValueService$WonderEditor from "../../../../../../../../service/atom/ValueService.js";
import * as WDBInspector$WonderEditor from "../atom_component/wdb_inspector/ui/WDBInspector.js";
import * as LanguageUtils$WonderEditor from "../../../../../../../utils/language/LanguageUtils.js";
import * as NodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/NodeAssetService.js";
import * as ReasonReactUtils$WonderEditor from "../../../../../../../utils/ui/ReasonReactUtils.js";
import * as TextureInspector$WonderEditor from "../atom_component/texture_Inspector/ui/TextureInspector.js";
import * as MaterialInspector$WonderEditor from "../atom_component/material_Inspector/ui/MaterialInspector.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as AssetBundleInspector$WonderEditor from "../atom_component/assetBundle_inspector/ui/AssetBundleInspector.js";
import * as LanguageEditorService$WonderEditor from "../../../../../../../../service/state/editor/LanguageEditorService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as ScriptAttributeInspector$WonderEditor from "../atom_component/scriptAttribute_inspector/ui/ScriptAttributeInspector.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/RootTreeAssetEditorService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as AssetRenameNodeEventHandler$WonderEditor from "./eventHandler/AssetRenameNodeEventHandler.js";
import * as ScriptEventFunctionInspector$WonderEditor from "../atom_component/scriptEventFunction_inspector/ui/ScriptEventFunctionInspector.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../../../../../../service/record/editor/asset/ScriptEventFunctionNodeAssetService.js";

function change($$event) {
  var inputVal = $$event.target.value;
  return /* Change */[inputVal];
}

var renameAssetTreeNode = AssetRenameNodeEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0];

function buildFolderComponent(state, send, languageType, currentNodeId, param, param$1) {
  return React.createElement("div", {
              className: "inspector-asset-folder"
            }, React.createElement("h1", undefined, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getAssetLanguageDataByType("asset-folder", languageType))), React.createElement("hr", undefined), React.createElement("div", {
                  className: "inspector-item"
                }, React.createElement("div", {
                      className: "item-header"
                    }, DomHelper$WonderEditor.textEl("Name")), React.createElement("div", {
                      className: "item-content"
                    }, React.createElement("input", {
                          className: "input-component float-input",
                          disabled: NodeAssetService$WonderEditor.isIdEqual(NodeAssetService$WonderEditor.getNodeId(StateLogicService$WonderEditor.getEditorState(RootTreeAssetEditorService$WonderEditor.getRootNode)), currentNodeId),
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

function buildTextureComponent(param, state, currentNodeId, param$1) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, TextureInspector$WonderEditor.make(uiState, dispatchFunc, state[/* inputValue */0], param$1[/* textureComponent */0], Curry._2(renameAssetTreeNode, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], currentNodeId), /* array */[]));
}

function buildMaterialComponent(param, state, currentNodeId, param$1) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, MaterialInspector$WonderEditor.make(uiState, dispatchFunc, currentNodeId, state[/* inputValue */0], param$1[/* type_ */0], param$1[/* materialComponent */1], Curry._2(renameAssetTreeNode, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], currentNodeId), /* array */[]));
}

function buildScriptEventFunctionComponent(param, state, currentNodeId, param$1) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, ScriptEventFunctionInspector$WonderEditor.make(uiState, dispatchFunc, currentNodeId, state[/* inputValue */0], param$1[/* eventFunctionData */1], Curry._2(renameAssetTreeNode, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], currentNodeId), /* array */[]));
}

function buildScriptAttributeComponent(param, state, currentNodeId, param$1) {
  var dispatchFunc = param[1];
  var uiState = param[0];
  return ReasonReact.element(undefined, undefined, ScriptAttributeInspector$WonderEditor.make(uiState, dispatchFunc, currentNodeId, state[/* inputValue */0], param$1[/* attribute */1], Curry._2(renameAssetTreeNode, /* tuple */[
                      uiState,
                      dispatchFunc
                    ], currentNodeId), /* array */[]));
}

function buildWDBComponent(param, param$1, currentNodeId, param$2) {
  var send = param$1[1];
  return ReasonReact.element(undefined, undefined, WDBInspector$WonderEditor.make(param[1], param$1[0][/* inputValue */0], (function (_e) {
                    return Curry._1(send, change(_e));
                  }), (function (_e) {
                    return Curry._1(send, /* Blur */0);
                  }), currentNodeId, param$2[/* wdbGameObject */1], /* array */[]));
}

function buildAssetBundleComponent(param, currentNodeId, nodeData) {
  var send = param[1];
  return ReasonReact.element(undefined, undefined, AssetBundleInspector$WonderEditor.make(param[0][/* inputValue */0], AssetBundleNodeAssetService$WonderEditor.getTypeStr(nodeData), (function (_e) {
                    return Curry._1(send, change(_e));
                  }), (function (_e) {
                    return Curry._1(send, /* Blur */0);
                  }), /* array */[]));
}

function showAssetNodeComponent(reduxTuple, currentNode, languageType, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  var partial_arg = /* tuple */[
    state,
    send
  ];
  var partial_arg$1 = /* tuple */[
    state,
    send
  ];
  return NodeAssetService$WonderEditor.handleNode(currentNode, (function (param, param$1) {
                return buildTextureComponent(reduxTuple, state, param, param$1);
              }), (function (param, param$1) {
                return buildMaterialComponent(reduxTuple, state, param, param$1);
              }), (function (param, param$1) {
                return buildScriptEventFunctionComponent(reduxTuple, state, param, param$1);
              }), (function (param, param$1) {
                return buildScriptAttributeComponent(reduxTuple, state, param, param$1);
              }), (function (param, param$1) {
                return buildWDBComponent(reduxTuple, partial_arg, param, param$1);
              }), (function (param, param$1) {
                return buildAssetBundleComponent(partial_arg$1, param, param$1);
              }), (function (param, param$1, param$2) {
                return buildFolderComponent(state, send, languageType, param, param$1, param$2);
              }));
}

function initFolderName(currentNodeId, currentNodeData, param) {
  var folderName = FolderNodeAssetService$WonderEditor.getNodeName(currentNodeData);
  return /* record */[
          /* inputValue */folderName,
          /* originalName */folderName
        ];
}

function initTextureName(engineState, param, param$1) {
  var baseName = NodeNameAssetLogicService$WonderEditor.getTextureNodeName(param$1[/* textureComponent */0], engineState);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initMaterialName(engineState, param, param$1) {
  var baseName = NodeNameAssetLogicService$WonderEditor.getMaterialNodeName(param$1[/* materialComponent */1], param$1[/* type_ */0], engineState);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initScriptEventFunctionNodeName(engineState, param, nodeData) {
  var baseName = ScriptEventFunctionNodeAssetService$WonderEditor.getNodeNameByData(nodeData);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initScriptAttributeNodeName(engineState, param, nodeData) {
  var baseName = ScriptAttributeNodeAssetService$WonderEditor.getNodeNameByData(nodeData);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initWDBName(currentNodeId, currentNodeData) {
  var baseName = NodeNameAssetLogicService$WonderEditor.getWDBNodeName(WDBNodeAssetService$WonderEditor.buildNodeByNodeData(currentNodeId, currentNodeData));
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

function initAssetBundleName(_currentNodeId, currentNodeData) {
  var baseName = AssetBundleNodeAssetService$WonderEditor.getNodeName(currentNodeData);
  return /* record */[
          /* inputValue */baseName,
          /* originalName */baseName
        ];
}

var Method = /* module */[
  /* change */change,
  /* renameAssetTreeNode */renameAssetTreeNode,
  /* buildFolderComponent */buildFolderComponent,
  /* buildTextureComponent */buildTextureComponent,
  /* buildMaterialComponent */buildMaterialComponent,
  /* buildScriptEventFunctionComponent */buildScriptEventFunctionComponent,
  /* buildScriptAttributeComponent */buildScriptAttributeComponent,
  /* buildWDBComponent */buildWDBComponent,
  /* buildAssetBundleComponent */buildAssetBundleComponent,
  /* showAssetNodeComponent */showAssetNodeComponent,
  /* initFolderName */initFolderName,
  /* initTextureName */initTextureName,
  /* initMaterialName */initMaterialName,
  /* initScriptEventFunctionNodeName */initScriptEventFunctionNodeName,
  /* initScriptAttributeNodeName */initScriptAttributeNodeName,
  /* initWDBName */initWDBName,
  /* initAssetBundleName */initAssetBundleName
];

var component = ReasonReact.reducerComponent("AssetTreeInspector");

function reducer(param, currentNode, action) {
  var dispatchFunc = param[1];
  var uiState = param[0];
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
                                      uiState,
                                      dispatchFunc
                                    ], NodeAssetService$WonderEditor.getNodeId(currentNode), value);
                        }));
          }
        }
      });
  }
}

function render(param, currentNode, self) {
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return React.createElement("article", {
              key: "AssetTreeInspector",
              className: "wonder-inspector-assetTree"
            }, showAssetNodeComponent(/* tuple */[
                  param[0],
                  param[1]
                ], currentNode, languageType, self));
}

function make(uiState, dispatchFunc, currentNode, _children) {
  var partial_arg = /* tuple */[
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
                        ], currentNode, self);
            }),
          /* initialState */(function (param) {
              StateEditorService$WonderEditor.getState(/* () */0);
              var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
              return NodeAssetService$WonderEditor.handleNode(currentNode, (function (param, param$1) {
                            return initTextureName(engineState, param, param$1);
                          }), (function (param, param$1) {
                            return initMaterialName(engineState, param, param$1);
                          }), (function (param, param$1) {
                            return initScriptEventFunctionNodeName(engineState, param, param$1);
                          }), (function (param, param$1) {
                            return initScriptAttributeNodeName(engineState, param, param$1);
                          }), initWDBName, initAssetBundleName, initFolderName);
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */(function (param) {
              return reducer(partial_arg, currentNode, param);
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
