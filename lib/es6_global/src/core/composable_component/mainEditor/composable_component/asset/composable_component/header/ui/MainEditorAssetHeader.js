

import * as Js from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js.js";
import * as Most from "most";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_dict from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as FileReader$WonderEditor from "../../../../../../../external/FileReader.js";
import * as OptionService$WonderEditor from "../../../../../../../../service/primitive/OptionService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../utils/AssetTreeNodeUtils.js";
import * as AssetNodeEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeEditorService.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";

function isCurrentNodeIdEqualRootId(editorState) {
  var match = AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId(editorState);
  if (match) {
    var match$1 = AssetUtils$WonderEditor.isIdEqual(match[0], AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState));
    if (match$1) {
      return Js.true_;
    } else {
      return Js.false_;
    }
  } else {
    return Js.true_;
  }
}

function addFolder(dispatchFunc, currentNodeParentId, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var editorState$1 = AssetIndexEditorService$WonderEditor.increaseIndex(editorState);
          var nextIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState$1);
          return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(currentNodeParentId, editorState$1), AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(nextIndex), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState$1)), AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(nextIndex, editorState$1));
        }));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function remove(dispatchFunc, currentNodeParentId, clearNodeParentId, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var currentNodeId = AssetCurrentNodeIdEditorService$WonderEditor.unsafeGetCurrentNodeId(editorState);
          var match = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(currentNodeId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
          AssetUtils$WonderEditor.deepRemoveTreeNodeChildren(match[1], AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState));
          var match$1 = AssetUtils$WonderEditor.isIdEqual(OptionService$WonderEditor.unsafeGet(currentNodeParentId), currentNodeId);
          if (match$1) {
            Curry._1(clearNodeParentId, /* () */0);
          }
          return AssetCurrentNodeIdEditorService$WonderEditor.clearCurrentNodeId(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], editorState));
        }));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _fileLoad(dispatchFunc, currentNodeParentId, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var fileInfoArr = Js_dict.values($$event.target.files).map(AssetTreeNodeUtils$WonderEditor.convertFileJsObjectToFileInfoRecord);
  return Most.forEach((function (param) {
                  return AssetTreeNodeUtils$WonderEditor.handleFileByType(currentNodeParentId, param);
                }), Most.flatMap((function (fileInfo) {
                      return Most.fromPromise(new Promise((function (resolve, _) {
                                        var reader = new FileReader();
                                        Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                                return resolve(/* record */[
                                                            /* name */fileInfo[/* name */0],
                                                            /* type_ */AssetTreeNodeUtils$WonderEditor.getAssetTreeAssetNodeTypeByAssetNodeType(fileInfo[/* type_ */1]),
                                                            /* result : Some */[result]
                                                          ]);
                                              }));
                                        return AssetTreeNodeUtils$WonderEditor.readFileByType(reader, fileInfo);
                                      })));
                    }), Most.from(fileInfoArr))).then((function () {
                return Promise.resolve(Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad));
              }));
}

function fileLoad(currentNodeParentId, dispatchFunc, $$event) {
  _fileLoad(dispatchFunc, currentNodeParentId, $$event);
  return /* () */0;
}

var Method = /* module */[
  /* isCurrentNodeIdEqualRootId */isCurrentNodeIdEqualRootId,
  /* addFolder */addFolder,
  /* remove */remove,
  /* _fileLoad */_fileLoad,
  /* fileLoad */fileLoad
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(_, currentNodeParentId, param, _$1) {
  var clearNodeParentId = param[1];
  var dispatchFunc = param[0];
  return React.createElement("article", {
              key: "assetHeader",
              className: "tree-header"
            }, React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      onClick: (function (param) {
                          return addFolder(dispatchFunc, currentNodeParentId, param);
                        })
                    }, DomHelper$WonderEditor.textEl("addFolder"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      disabled: StateLogicService$WonderEditor.getEditorState(isCurrentNodeIdEqualRootId),
                      onClick: (function (param) {
                          return remove(dispatchFunc, currentNodeParentId, clearNodeParentId, param);
                        })
                    }, DomHelper$WonderEditor.textEl("remove"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("input", {
                      className: "file-upload",
                      multiple: Js.true_,
                      type: "file",
                      onChange: (function (e) {
                          return fileLoad(currentNodeParentId, dispatchFunc, e);
                        })
                    })));
}

function make(store, dispatchFunc, currentNodeParentId, clearNodeParentId, _) {
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
              return render(store, currentNodeParentId, /* tuple */[
                          dispatchFunc,
                          clearNodeParentId
                        ], self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  make ,
  
}
/* component Not a pure module */
