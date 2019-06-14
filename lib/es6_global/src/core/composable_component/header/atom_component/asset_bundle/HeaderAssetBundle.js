

import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_option from "../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SelectTreeUtils$WonderEditor from "../../../../atom_component/selectTree/utils/SelectTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as IdSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/IdSelectTreeService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as GeometryEngineService$WonderEditor from "../../../../../service/state/engine/GeometryEngineService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../../service/state/editor/asset/TreeAssetEditorService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../../../service/record/editor/asset/IterateTreeAssetService.js";
import * as TextureNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/TextureNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as ValueNodeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/ValueNodeSelectTreeService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as FolderNodeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/FolderNodeSelectTreeService.js";
import * as OperateTreeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/OperateTreeSelectTreeService.js";
import * as HeaderAssetBundleGenerateAllAB$WonderEditor from "./HeaderAssetBundleGenerateAllAB.js";
import * as ScriptAttributeNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/ScriptAttributeNodeAssetService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as HeaderAssetBundleGenerateSingleRAB$WonderEditor from "./HeaderAssetBundleGenerateSingleRAB.js";
import * as HeaderAssetBundleGenerateSingleSAB$WonderEditor from "./HeaderAssetBundleGenerateSingleSAB.js";
import * as ScriptEventFunctionNodeAssetService$WonderEditor from "../../../../../service/record/editor/asset/ScriptEventFunctionNodeAssetService.js";

function buildAssetBundleComponentSelectNav(send, languageType) {
  return React.createElement("div", {
              className: "item-content item-help"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowGenerateSingleRABModal */0);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("generate-single-rab", languageType)))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowGenerateSingleSABModal */2);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("generate-single-sab", languageType)))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function (_e) {
                      return Curry._1(send, /* ShowGenerateAllABModal */4);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("generate-all-ab", languageType)))));
}

function _getGeometryName(geometry, engineState) {
  return Js_option.getWithDefault("geometry_" + (String(geometry) + ""), GeometryEngineService$WonderEditor.getGeometryName(geometry, engineState));
}

function _buildGeometryFolderChildren(assetNode, folderNodeId, engineState) {
  return ArrayService$WonderCommonlib.reduceOneParam((function (param, gameObject) {
                var geometry = GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState);
                var newNodeId = IdSelectTreeService$WonderEditor.generateNodeId(param[0]);
                var childNodeArr = ArrayService$WonderEditor.push(ValueNodeSelectTreeService$WonderEditor.buildNode(newNodeId, _getGeometryName(geometry, engineState), false, "geometry", geometry), param[1]);
                return /* tuple */[
                        newNodeId,
                        childNodeArr
                      ];
              }), /* tuple */[
              folderNodeId,
              ArrayService$WonderCommonlib.createEmpty(/* () */0)
            ], HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(WDBNodeAssetService$WonderEditor.getWDBGameObject(assetNode), engineState).filter((function (gameObject) {
                    return GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
                  })));
}

function _buildWDBGeometryFolderName(wdbAssetNodeName) {
  return "" + (String(wdbAssetNodeName) + "_Geometrys");
}

function _convertAssetPathToAssetBundlePath(assetNodeData, assetPath) {
  return (assetPath + ("/" + (AssetBundleNodeAssetService$WonderEditor.getNodeName(assetNodeData) + ("." + AssetBundleNodeAssetService$WonderEditor.getTypeStr(assetNodeData).toLowerCase())))).replace("Assets/", "");
}

function buildSelectTreeForGenerateSingleRAB(param) {
  var engineState = param[1];
  var editorState = param[0];
  return IterateTreeAssetService$WonderEditor.foldWithParentFolderNodeWithoutRootNode(SelectTreeUtils$WonderEditor.handleFoldFolderAssetNode, SelectTreeUtils$WonderEditor.buildInitAccData(editorState), TreeAssetEditorService$WonderEditor.unsafeGetTree(editorState), undefined, (function (parentFolderNode, param, nodeId, nodeData) {
                  var assetNode = TextureNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData);
                  return SelectTreeUtils$WonderEditor.handleFoldAssetNode(parentFolderNode, /* tuple */[
                              param[0],
                              param[1],
                              param[2]
                            ], /* tuple */[
                              assetNode,
                              "texture",
                              /* record */[
                                /* textureComponent */TextureNodeAssetService$WonderEditor.getTextureComponent(assetNode),
                                /* imageDataIndex */TextureNodeAssetService$WonderEditor.getImageDataIndex(assetNode)
                              ]
                            ], engineState);
                }), (function (parentFolderNode, param, nodeId, nodeData) {
                  var assetNode = MaterialNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData);
                  var match = MaterialNodeAssetService$WonderEditor.getMaterialType(assetNode);
                  return SelectTreeUtils$WonderEditor.handleFoldAssetNode(parentFolderNode, /* tuple */[
                              param[0],
                              param[1],
                              param[2]
                            ], /* tuple */[
                              assetNode,
                              match ? "lightMaterial" : "basicMaterial",
                              /* record */[
                                /* materialComponent */MaterialNodeAssetService$WonderEditor.getMaterialComponent(assetNode),
                                /* imageDataIndex */MaterialNodeAssetService$WonderEditor.getImageDataIndex(assetNode)
                              ]
                            ], engineState);
                }), (function (parentFolderNode, param, nodeId, nodeData) {
                  var assetNode = ScriptEventFunctionNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData);
                  return SelectTreeUtils$WonderEditor.handleFoldAssetNode(parentFolderNode, /* tuple */[
                              param[0],
                              param[1],
                              param[2]
                            ], /* tuple */[
                              assetNode,
                              "scriptEventFunction",
                              /* record */[
                                /* name */ScriptEventFunctionNodeAssetService$WonderEditor.getNodeName(assetNode),
                                /* eventFunctionData */ScriptEventFunctionNodeAssetService$WonderEditor.getEventFunctionData(assetNode)
                              ]
                            ], engineState);
                }), (function (parentFolderNode, param, nodeId, nodeData) {
                  var assetNode = ScriptAttributeNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData);
                  return SelectTreeUtils$WonderEditor.handleFoldAssetNode(parentFolderNode, /* tuple */[
                              param[0],
                              param[1],
                              param[2]
                            ], /* tuple */[
                              assetNode,
                              "scriptAttribute",
                              /* record */[
                                /* name */ScriptAttributeNodeAssetService$WonderEditor.getNodeName(assetNode),
                                /* attribute */ScriptAttributeNodeAssetService$WonderEditor.getAttribute(assetNode)
                              ]
                            ], engineState);
                }), (function (parentFolderNode, param, nodeId, nodeData) {
                  var folderTreeMap = param[1];
                  var assetNode = WDBNodeAssetService$WonderEditor.buildNodeByNodeData(nodeId, nodeData);
                  var assetNodeName = NodeNameAssetLogicService$WonderEditor.getNodeName(assetNode, engineState);
                  var folderNodeId = IdSelectTreeService$WonderEditor.generateNodeId(param[0]);
                  var match = _buildGeometryFolderChildren(assetNode, folderNodeId, engineState);
                  var selectTree = OperateTreeSelectTreeService$WonderEditor.insertNode(SelectTreeUtils$WonderEditor.unsafeGetSelectTreeNodeIdFromFolderTreeMap(parentFolderNode, folderTreeMap), FolderNodeSelectTreeService$WonderEditor.buildNode(folderNodeId, _buildWDBGeometryFolderName(assetNodeName), false, match[1], /* () */0), param[2]);
                  return /* tuple */[
                          match[0],
                          folderTreeMap,
                          selectTree
                        ];
                }), (function (parentFolderNode, acc, nodeId, nodeData) {
                  return acc;
                }), undefined, /* () */0)[2];
}

function buildSelectTreeForGenerateAllAB(param) {
  return SelectTreeUtils$WonderEditor.buildSelectTreeForAssetBundle(_convertAssetPathToAssetBundlePath, /* tuple */[
              param[0],
              param[1]
            ]);
}

var Method = /* module */[
  /* buildAssetBundleComponentSelectNav */buildAssetBundleComponentSelectNav,
  /* _getGeometryName */_getGeometryName,
  /* _buildGeometryFolderChildren */_buildGeometryFolderChildren,
  /* _buildWDBGeometryFolderName */_buildWDBGeometryFolderName,
  /* _convertAssetPathToAssetBundlePath */_convertAssetPathToAssetBundlePath,
  /* buildSelectTreeForGenerateSingleRAB */buildSelectTreeForGenerateSingleRAB,
  /* buildSelectTreeForGenerateAllAB */buildSelectTreeForGenerateAllAB
];

var component = ReasonReact.reducerComponent("HeaderAssetBundle");

function render(param, param$1, param$2) {
  var send = param$2[/* send */3];
  var state = param$2[/* state */1];
  var hoverNavFunc = param$1[2];
  var toggleShowNavFunc = param$1[1];
  var isAssetBundleNav = param$1[0];
  var className = isAssetBundleNav ? "item-title item-active" : "item-title";
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  var match = state[/* isShowGenerateSingleRABModal */0];
  var match$1 = state[/* isShowGenerateSingleSABModal */1];
  var match$2 = state[/* isShowGenerateAllABModal */2];
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
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("header-asset-bundle", languageType)))), isAssetBundleNav ? buildAssetBundleComponentSelectNav(send, languageType) : null, match ? ReasonReact.element(undefined, undefined, HeaderAssetBundleGenerateSingleRAB$WonderEditor.make(StateLogicService$WonderEditor.getStateToGetData(buildSelectTreeForGenerateSingleRAB), (function (param) {
                          return Curry._1(send, /* HideGenerateSingleRABModal */1);
                        }), (function (param) {
                          return Curry._1(send, /* HideGenerateSingleRABModal */1);
                        }), /* array */[])) : null, match$1 ? ReasonReact.element(undefined, undefined, HeaderAssetBundleGenerateSingleSAB$WonderEditor.make((function (param) {
                          return Curry._1(send, /* HideGenerateSingleSABModal */3);
                        }), (function (param) {
                          return Curry._1(send, /* HideGenerateSingleSABModal */3);
                        }), /* array */[])) : null, match$2 ? ReasonReact.element(undefined, undefined, HeaderAssetBundleGenerateAllAB$WonderEditor.make(StateLogicService$WonderEditor.getStateToGetData(buildSelectTreeForGenerateAllAB), (function (param) {
                          return Curry._1(send, /* HideGenerateAllABModal */5);
                        }), (function (param) {
                          return Curry._1(send, /* HideGenerateAllABModal */5);
                        }), /* array */[])) : null);
}

function reducer(action, state) {
  switch (action) {
    case 0 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowGenerateSingleRABModal */true,
                    /* isShowGenerateSingleSABModal */state[/* isShowGenerateSingleSABModal */1],
                    /* isShowGenerateAllABModal */state[/* isShowGenerateAllABModal */2]
                  ]]);
    case 1 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowGenerateSingleRABModal */false,
                    /* isShowGenerateSingleSABModal */state[/* isShowGenerateSingleSABModal */1],
                    /* isShowGenerateAllABModal */state[/* isShowGenerateAllABModal */2]
                  ]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowGenerateSingleRABModal */state[/* isShowGenerateSingleRABModal */0],
                    /* isShowGenerateSingleSABModal */true,
                    /* isShowGenerateAllABModal */state[/* isShowGenerateAllABModal */2]
                  ]]);
    case 3 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowGenerateSingleRABModal */state[/* isShowGenerateSingleRABModal */0],
                    /* isShowGenerateSingleSABModal */false,
                    /* isShowGenerateAllABModal */state[/* isShowGenerateAllABModal */2]
                  ]]);
    case 4 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowGenerateSingleRABModal */state[/* isShowGenerateSingleRABModal */0],
                    /* isShowGenerateSingleSABModal */state[/* isShowGenerateSingleSABModal */1],
                    /* isShowGenerateAllABModal */true
                  ]]);
    case 5 : 
        return /* Update */Block.__(0, [/* record */[
                    /* isShowGenerateSingleRABModal */state[/* isShowGenerateSingleRABModal */0],
                    /* isShowGenerateSingleSABModal */state[/* isShowGenerateSingleSABModal */1],
                    /* isShowGenerateAllABModal */false
                  ]]);
    
  }
}

function make(uiState, dispatchFunc, isAssetBundleNav, toggleShowNavFunc, hoverNavFunc, _children) {
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
                          isAssetBundleNav,
                          toggleShowNavFunc,
                          hoverNavFunc
                        ], self);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* isShowGenerateSingleRABModal */false,
                      /* isShowGenerateSingleSABModal */false,
                      /* isShowGenerateAllABModal */false
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
  render ,
  reducer ,
  make ,
  
}
/* component Not a pure module */
