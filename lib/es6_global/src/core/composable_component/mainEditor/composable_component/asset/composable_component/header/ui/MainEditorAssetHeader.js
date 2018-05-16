'use strict';

import * as Most                            from "most";
import * as Curry                           from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                           from "react";
import * as Js_dict                         from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Js_boolean                      from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";
import * as ReasonReact                     from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                   from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor           from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor          from "../../../../../../../external/DomHelper.js";
import * as FileUtils$WonderEditor          from "../../../utils/FileUtils.js";
import * as AssetUtils$WonderEditor         from "../../../utils/AssetUtils.js";
import * as FileReader$WonderEditor         from "../../../../../../../external/FileReader.js";
import * as StateLogicService$WonderEditor  from "../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";

function removeFolder(dispatch, _) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.isTargetIdEqualRootId);
  if (match !== 0) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeFolder", "can\'t remove root folder", "", "", ""));
  } else {
    StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
            var match = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
            return AssetEditorService$WonderEditor.clearCurrentTreeNode(AssetEditorService$WonderEditor.setAsseTree(match[0], editorState));
          }));
    Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    return /* () */0;
  }
}

function removeFile(dispatch, _) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var fileId = AssetEditorService$WonderEditor.unsafeGetCurrentFile(editorState);
  StateEditorService$WonderEditor.setState(AssetEditorService$WonderEditor.clearCurrentFile(AssetEditorService$WonderEditor.setAsseTree(AssetUtils$WonderEditor.removeFileFromTargetTreeNode(AssetEditorService$WonderEditor.unsafeGetCurrentTreeNode(editorState), fileId, FileUtils$WonderEditor.getFileTypeByFileId(fileId, editorState), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState)), editorState)));
  Curry._2(DomHelper$WonderEditor.deleteKeyInDict, fileId, AssetEditorService$WonderEditor.unsafeGetFileMap(editorState));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function addFolder(dispatch, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var match = AssetUtils$WonderEditor.increaseIndex(editorState);
          var editorState$1 = match[1];
          return AssetEditorService$WonderEditor.setAsseTree(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1), AssetUtils$WonderEditor.buildAssetTreeNodeByIndex(match[0]), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState$1)), editorState$1);
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function _fileLoad(dispatch, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var fileInfoArr = Js_dict.values($$event.target.files).map(FileUtils$WonderEditor.convertFileJsObjectToFileInfoRecord);
  return Most.forEach(FileUtils$WonderEditor.handleFileByType, Most.flatMap((function (fileInfo) {
                      return Most.fromPromise(new Promise((function (resolve, _) {
                                        var reader = new FileReader();
                                        Curry._2(FileReader$WonderEditor.onload, reader, (function (result) {
                                                return resolve(/* record */[
                                                            /* name */fileInfo[/* name */0],
                                                            /* type_ */FileUtils$WonderEditor.getAssetTreeFileTypeByFileType(fileInfo[/* type_ */1]),
                                                            /* result */result
                                                          ]);
                                              }));
                                        return FileUtils$WonderEditor.readFileByType(reader, fileInfo);
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
  /* removeFolder */removeFolder,
  /* removeFile */removeFile,
  /* addFolder */addFolder,
  /* _fileLoad */_fileLoad,
  /* fileLoad */fileLoad
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(_, dispatch, _$1) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentFile);
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
                      disabled: Js_boolean.to_js_boolean(StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.isTargetIdEqualRootId)),
                      onClick: (function (param) {
                          return removeFolder(dispatch, param);
                        })
                    }, DomHelper$WonderEditor.textEl("removeFolder"))), React.createElement("div", {
                  className: "header-item"
                }, React.createElement("button", {
                      disabled: match ? false : true,
                      onClick: (function (param) {
                          return removeFile(dispatch, param);
                        })
                    }, DomHelper$WonderEditor.textEl("removeFile"))), React.createElement("div", {
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
