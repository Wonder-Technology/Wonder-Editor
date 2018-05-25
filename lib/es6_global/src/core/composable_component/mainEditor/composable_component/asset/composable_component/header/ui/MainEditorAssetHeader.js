'use strict';

import * as Most                                                          from "most";
import * as Curry                                                         from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                                                         from "react";
import * as Js_dict                                                       from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as ReasonReact                                                   from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as AppStore$WonderEditor                                         from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor                                        from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor                                       from "../../../utils/AssetUtils.js";
import * as FileReader$WonderEditor                                       from "../../../../../../../external/FileReader.js";
import * as StateLogicService$WonderEditor                                from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor                               from "../../../utils/AssetTreeNodeUtils.js";
import * as AssetNodeEditorService$WonderEditor                           from "../../../../../../../../service/state/editor/asset/AssetNodeEditorService.js";
import * as AssetIndexEditorService$WonderEditor                          from "../../../../../../../../service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor                       from "../../../../../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as AssetCurrentAssetTreeNodeEditorService$WonderEditor           from "../../../../../../../../service/state/editor/asset/AssetCurrentAssetTreeNodeEditorService.js";
import * as AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor from "../../../../../../../../service/state/editor/asset/AssetCurrentAssetChildrenNodeParentEditorService.js";

function isCurrentAssetTreeNodeIdEqualRootId(editorState) {
  var match = AssetCurrentAssetTreeNodeEditorService$WonderEditor.getCurrentAssetTreeNode(editorState);
  if (match) {
    var match$1 = AssetUtils$WonderEditor.isIdEqual(match[0], AssetTreeRootEditorService$WonderEditor.getRootTreeNodeId(editorState));
    if (match$1 !== 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function addFolder(dispatch, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var editorState$1 = AssetIndexEditorService$WonderEditor.increaseIndex(editorState);
          var nextIndex = AssetIndexEditorService$WonderEditor.getIndex(editorState$1);
          return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1), AssetNodeEditorService$WonderEditor.buildAssetTreeNodeByIndex(nextIndex), AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState$1)), AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(nextIndex, editorState$1));
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function remove(dispatch, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var currentAssetTreeNode = AssetCurrentAssetTreeNodeEditorService$WonderEditor.unsafeGetCurrentAssetTreeNode(editorState);
          var match = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(currentAssetTreeNode, AssetTreeRootEditorService$WonderEditor.unsafeGetAssetTreeRoot(editorState));
          var editorState$1 = AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], editorState);
          var match$1 = AssetUtils$WonderEditor.isIdEqual(AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor.unsafeGetCurrentAssetChildrenNodeParent(editorState$1), currentAssetTreeNode);
          if (match$1 !== 0) {
            return AssetCurrentAssetChildrenNodeParentEditorService$WonderEditor.clearCurrentAssetChildrenNodeParent(AssetCurrentAssetTreeNodeEditorService$WonderEditor.clearCurrentAssetTreeNode(editorState$1));
          } else {
            return AssetCurrentAssetTreeNodeEditorService$WonderEditor.clearCurrentAssetTreeNode(editorState$1);
          }
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _fileLoad(dispatch, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var fileInfoArr = Js_dict.values($$event.target.files).map(AssetTreeNodeUtils$WonderEditor.convertFileJsObjectToFileInfoRecord);
  return Most.forEach(AssetTreeNodeUtils$WonderEditor.handleFileByType, Most.flatMap((function (fileInfo) {
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
                return Promise.resolve(Curry._1(dispatch, AppStore$WonderEditor.ReLoad));
              }));
}

function fileLoad(dispatch, $$event) {
  _fileLoad(dispatch, $$event);
  return /* () */0;
}

var Method = /* module */[
  /* isCurrentAssetTreeNodeIdEqualRootId */isCurrentAssetTreeNodeIdEqualRootId,
  /* addFolder */addFolder,
  /* remove */remove,
  /* _fileLoad */_fileLoad,
  /* fileLoad */fileLoad
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(_, dispatch, _$1) {
  return React.createElement("article", {
              key: "assetHeader",
              className: "tree-header"
            }, React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      onClick: (function (param) {
                          return addFolder(dispatch, param);
                        })
                    }, DomHelper$WonderEditor.textEl("addFolder"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      disabled: StateLogicService$WonderEditor.getEditorState(isCurrentAssetTreeNodeIdEqualRootId),
                      onClick: (function (param) {
                          return remove(dispatch, param);
                        })
                    }, DomHelper$WonderEditor.textEl("remove"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("input", {
                      className: "file-upload",
                      multiple: true,
                      type: "file",
                      onChange: (function (e) {
                          return fileLoad(dispatch, e);
                        })
                    })));
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  return newrecord;
}

export {
  Method    ,
  component ,
  render    ,
  make      ,
  
}
/* component Not a pure module */
