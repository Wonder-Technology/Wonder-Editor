

import * as Most from "most";
import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Js_dict from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as ReasonReact from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor from "../../../utils/AssetUtils.js";
import * as FileReader$WonderEditor from "../../../../../../../external/FileReader.js";
import * as IndexAssetService$WonderEditor from "../../../../../../../../service/state/asset/IndexAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../utils/AssetTreeNodeUtils.js";
import * as AssetTreeRootAssetService$WonderEditor from "../../../../../../../../service/state/asset/AssetTreeRootAssetService.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as CurrentNodeParentIdAssetService$WonderEditor from "../../../../../../../../service/state/asset/CurrentNodeParentIdAssetService.js";

function isCurrentNodeIdEqualRootId(assetState) {
  var match = CurrentNodeDataAssetService$WonderEditor.getCurrentNodeData(assetState);
  if (match) {
    return AssetUtils$WonderEditor.isIdEqual(match[0][/* currentNodeId */0], AssetTreeRootAssetService$WonderEditor.getRootTreeNodeId(assetState));
  } else {
    return true;
  }
}

function addFolder(dispatchFunc, _) {
  StateLogicService$WonderEditor.getAndSetAssetState((function (assetState) {
          var assetState$1 = IndexAssetService$WonderEditor.increaseIndex(assetState);
          var nextIndex = IndexAssetService$WonderEditor.getIndex(assetState$1);
          return AssetTreeNodeUtils$WonderEditor.createNodeAndAddToCurrentNodeParent(nextIndex, /* Folder */0, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(nextIndex, assetState$1));
        }));
  Curry._1(dispatchFunc, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _isRemoveAssetTreeNode(currentNodeId, currentNodeParentId) {
  return AssetUtils$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
}

function remove(dispatchFunc, _) {
  StateLogicService$WonderEditor.getAndSetAssetState((function (assetState) {
          var match = CurrentNodeDataAssetService$WonderEditor.unsafeGetCurrentNodeData(assetState);
          var currentNodeId = match[/* currentNodeId */0];
          var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNode(currentNodeId, AssetTreeRootAssetService$WonderEditor.unsafeGetAssetTreeRoot(assetState));
          var newAssetTreeRoot = match$1[0];
          var assetState$1 = AssetUtils$WonderEditor.deepRemoveTreeNode(match$1[1]);
          var currentNodeParentId = AssetUtils$WonderEditor.getTargetTreeNodeId(assetState$1);
          var match$2 = AssetUtils$WonderEditor.isIdEqual(currentNodeParentId, currentNodeId);
          if (match$2) {
            return CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, CurrentNodeParentIdAssetService$WonderEditor.clearCurrentNodeParentId(assetState$1)));
          } else {
            return CurrentNodeDataAssetService$WonderEditor.clearCurrentNodeData(AssetTreeRootAssetService$WonderEditor.setAssetTreeRoot(newAssetTreeRoot, assetState$1));
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
                                                                /* result */result
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
                      disabled: StateLogicService$WonderEditor.getAssetState(isCurrentNodeIdEqualRootId),
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
                          _fileLoad(dispatchFunc, e);
                          return /* () */0;
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
