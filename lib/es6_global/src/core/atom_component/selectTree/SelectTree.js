

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../external/DomHelper.js";
import * as StringService$WonderEditor from "../../../service/atom/StringService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as NodeSelectTreeService$WonderEditor from "../../../service/record/ui/selectTree/NodeSelectTreeService.js";
import * as RootTreeSelectTreeService$WonderEditor from "../../../service/record/ui/selectTree/RootTreeSelectTreeService.js";
import * as FolderNodeSelectTreeService$WonderEditor from "../../../service/record/ui/selectTree/FolderNodeSelectTreeService.js";

function _hasChildren(node) {
  var match = FolderNodeSelectTreeService$WonderEditor.isFolderNode(node);
  if (match) {
    return FolderNodeSelectTreeService$WonderEditor.getChildren(node).length > 0;
  } else {
    return false;
  }
}

function _isSelected(node) {
  if (node.tag) {
    return node[1][/* isSelect */0];
  } else {
    return node[1][/* isSelect */1];
  }
}

function _toggleSelect($$event, node, toggleSelectFunc) {
  var checked = $$event.target.checked;
  return Curry._2(toggleSelectFunc, checked, node);
}

function _getIcon(node, getValueNodeIconFunc, editorState) {
  if (node.tag) {
    var nodeData = node[1];
    return Curry._3(getValueNodeIconFunc, nodeData[/* type_ */2], nodeData[/* value */3], editorState);
  } else {
    return "./public/img/selectFolder.png";
  }
}

function _build(allNodes, param) {
  var toggleSelectFunc = param[1];
  var getValueNodeIconFunc = param[0];
  return allNodes.map((function (node) {
                var match = StateLogicService$WonderEditor.getEditorState((function (param) {
                        return _getIcon(node, getValueNodeIconFunc, param);
                      }));
                var match$1 = _hasChildren(node);
                return React.createElement("ul", {
                            key: StringService$WonderEditor.intToString(NodeSelectTreeService$WonderEditor.getNodeId(node)),
                            className: "wonder-tree-node"
                          }, React.createElement("li", undefined, React.createElement("div", {
                                    className: "tree-container"
                                  }, React.createElement("input", {
                                        defaultChecked: _isSelected(node),
                                        type: "checkbox",
                                        onClick: (function (e) {
                                            return _toggleSelect(e, node, toggleSelectFunc);
                                          })
                                      }), match !== undefined ? React.createElement("img", {
                                          className: "treeNode-icon",
                                          src: match
                                        }) : null, DomHelper$WonderEditor.textEl(NodeSelectTreeService$WonderEditor.getNodeName(node)))), _build(match$1 ? FolderNodeSelectTreeService$WonderEditor.getChildren(node) : /* array */[], /* tuple */[
                                getValueNodeIconFunc,
                                toggleSelectFunc
                              ]));
              }));
}

function buildTreeArray(tree, param) {
  return _build(/* array */[RootTreeSelectTreeService$WonderEditor.getRootNode(tree)], /* tuple */[
              param[0],
              param[1]
            ]);
}

var Method = /* module */[
  /* _hasChildren */_hasChildren,
  /* _isSelected */_isSelected,
  /* _toggleSelect */_toggleSelect,
  /* _getIcon */_getIcon,
  /* _build */_build,
  /* buildTreeArray */buildTreeArray
];

var component = ReasonReact.statelessComponent("SelectTree");

function render(tree, param, _self) {
  return React.createElement("article", {
              key: "selectTreeRoot",
              className: "wonder-selectTree"
            }, buildTreeArray(tree, /* tuple */[
                  param[0],
                  param[1]
                ]));
}

function make(tree, getValueNodeIconFunc, toggleSelectFunc, _children) {
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
              return render(tree, /* tuple */[
                          getValueNodeIconFunc,
                          toggleSelectFunc
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
