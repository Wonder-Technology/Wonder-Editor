'use strict';

import * as Most                            from "most";
import * as Curry                           from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                           from "react";
import * as Js_dict                         from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as ReasonReact                     from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                   from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor           from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor          from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor         from "../../../utils/AssetUtils.js";
import * as FileReader$WonderEditor         from "../../../../../../../external/FileReader.js";
import * as StateLogicService$WonderEditor  from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../utils/AssetTreeNodeUtils.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";

function addFolder(dispatch, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var match = AssetUtils$WonderEditor.increaseIndex(editorState);
          var editorState$1 = match[1];
          var nextIndex = match[0];
          return AssetEditorService$WonderEditor.setAsseTree(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1), AssetTreeNodeUtils$WonderEditor.buildAssetTreeNodeByIndex(nextIndex), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState$1)), AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(nextIndex, editorState$1));
        }));
  Log$WonderLog.print(AssetEditorService$WonderEditor.unsafeGetNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
  Log$WonderLog.print(AssetEditorService$WonderEditor.unsafeGetAssetTree(StateEditorService$WonderEditor.getState(/* () */0)));
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
                                                            /* type_ */AssetTreeNodeUtils$WonderEditor.getAssetTreeFileTypeByFileType(fileInfo[/* type_ */1]),
                                                            /* result */result
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
  /* addFolder */addFolder,
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
                }, React.createElement("button", undefined, DomHelper$WonderEditor.textEl("remove"))), React.createElement("div", {
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
