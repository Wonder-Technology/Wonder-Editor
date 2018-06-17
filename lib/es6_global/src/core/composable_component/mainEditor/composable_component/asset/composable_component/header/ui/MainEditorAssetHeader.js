

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_dict from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as FileReader$WonderEditor from "../../../../../../../external/FileReader.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../utils/AssetTreeNodeUtils.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetNodeMapEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetNodeMapEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentNodeIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeIdEditorService.js";
import * as AssetCurrentNodeParentIdEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentNodeParentIdEditorService.js";

function isCurrentNodeIdEqualRootId(editorState) {
  var match = AssetCurrentNodeIdEditorService$WonderEditor.getCurrentNodeId(editorState);
  if (match) {
    return AssetUtils$WonderEditor.isIdEqual(match[0], AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState));
  } else {
    return true;
  }
}

function addFolder(dispatchFunc, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var editorState$1 = AssetIndexEditorService$WonderEditor.increaseIndex(editorState);
          var nextIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState$1);
          return AssetTreeNodeUtils$WonderEditor.createNodeAndAddToCurrentNodeParent(nextIndex, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(nextIndex, editorState$1));
        }));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _isRemoveAssetTreeNode(currentNodeId, currentNodeParentId) {
  return AssetUtils$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
}

function remove(dispatchFunc, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var currentNodeId = AssetCurrentNodeIdEditorService$WonderEditor.unsafeGetCurrentNodeId(editorState);
          var match = AssetUtils$WonderEditor.removeSpecificTreeNode(currentNodeId, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
          var newAssetTreeRoot = match[0];
          var editorState$1 = AssetNodeMapEditorService$WonderEditor.setNodeMap(AssetUtils$WonderEditor.deepRemoveTreeNode(match[1], AssetNodeMapEditorService$WonderEditor.unsafeGetNodeMap(editorState)), editorState);
          var currentNodeParentId = AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1);
          var match$1 = AssetUtils$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
          if (match$1) {
            return AssetCurrentNodeIdEditorService$WonderEditor.clearCurrentNodeId(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, AssetCurrentNodeParentIdEditorService$WonderEditor.clearCurrentNodeParentId(editorState$1)));
          } else {
            return AssetCurrentNodeIdEditorService$WonderEditor.clearCurrentNodeId(AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, editorState$1));
          }
        }));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _fileLoad(dispatchFunc, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var fileInfoArr = Js_dict.values($$event.target.files).map(AssetTreeNodeUtils$WonderEditor.convertFileJsObjectToFileInfoRecord);
  return Most.drain(Most.flatMap((function (fileResult) {
                      return Most.fromPromise(AssetTreeNodeUtils$WonderEditor.handleFileByType(fileResult));
                    }), Most.flatMap((function (fileInfo) {
                          return Most.fromPromise(new Promise((function (resolve, _) {
                                            var reader = new FileReader();
                                            Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                                    return resolve(/* record */[
                                                                /* name */fileInfo[/* name */0],
                                                                /* type_ */AssetTreeNodeUtils$WonderEditor.getAssetTreeAssetNodeTypeByFileType(fileInfo[/* type_ */1]),
                                                                /* result : Some */[result]
                                                              ]);
                                                  }));
                                            return AssetTreeNodeUtils$WonderEditor.readFileByType(reader, fileInfo);
                                          })));
                        }), Most.from(fileInfoArr)))).then((function () {
                return Promise.resolve(Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad));
              }));
}

function fileLoad(dispatchFunc, $$event) {
  _fileLoad(dispatchFunc, $$event);
  return /* () */0;
}

var Method = /* module */[
  /* isCurrentNodeIdEqualRootId */isCurrentNodeIdEqualRootId,
  /* addFolder */addFolder,
  /* _isRemoveAssetTreeNode */_isRemoveAssetTreeNode,
  /* remove */remove,
  /* _fileLoad */_fileLoad,
  /* fileLoad */fileLoad
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(param, _) {
  var dispatchFunc = param[1];
  return React.createElement("article", {
              key: "assetHeader",
              className: "wonder-asset-header"
            }, React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      onClick: (function (param) {
                          return addFolder(dispatchFunc, param);
                        })
                    }, DomHelper$WonderEditor.textEl("addFolder"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      disabled: StateLogicService$WonderEditor.getEditorState(isCurrentNodeIdEqualRootId),
                      onClick: (function (param) {
                          return remove(dispatchFunc, param);
                        })
                    }, DomHelper$WonderEditor.textEl("remove"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("input", {
                      className: "file-upload",
                      multiple: true,
                      type: "file",
                      onChange: (function (e) {
                          return fileLoad(dispatchFunc, e);
                        })
                    })));
}

function make(store, dispatchFunc, _) {
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
