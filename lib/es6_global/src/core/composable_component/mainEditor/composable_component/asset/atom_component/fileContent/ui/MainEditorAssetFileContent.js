'use strict';

import * as React                            from "react";
import * as ReasonReact                      from "../../../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                    from "../../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as DomHelper$WonderEditor           from "../../../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor          from "../../../utils/AssetUtils.js";
import * as EventUtils$WonderEditor          from "../../../../../../../utils/EventUtils.js";
import * as AssetEditorService$WonderEditor  from "../../../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor  from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

function getSign() {
  return "fileContent";
}

function showSpecificTreeNodeJson(fileMap, jsonArr) {
  return jsonArr.map((function (jsonId) {
                var jsonResult = SparseMapService$WonderCommonlib.unsafeGet(jsonId, fileMap);
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: "file-item"
                          }, React.createElement("img", {
                                src: "./public/img/12.jpg",
                                onDragStart: (function (param) {
                                    return EventUtils$WonderEditor.dragStart(jsonId, "fileContent", param);
                                  })
                              }), React.createElement("span", {
                                className: "item-text"
                              }, DomHelper$WonderEditor.textEl(jsonResult[/* name */0])));
              }));
}

function showSpecificTreeNodeImage(fileMap, imgArr) {
  return imgArr.map((function (imgId) {
                var imgResult = SparseMapService$WonderCommonlib.unsafeGet(imgId, fileMap);
                return React.createElement("div", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            className: "file-item"
                          }, React.createElement("img", {
                                src: imgResult[/* result */2],
                                onDragStart: (function (param) {
                                    return EventUtils$WonderEditor.dragStart(imgId, "fileContent", param);
                                  })
                              }), React.createElement("span", {
                                className: "item-text"
                              }, DomHelper$WonderEditor.textEl(imgResult[/* name */0])));
              }));
}

function buildContent() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var currentTreeNode = AssetUtils$WonderEditor.getSpecificTreeNodeById(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), AssetUtils$WonderEditor.getRootTreeNode(editorState));
  var fileMap = AssetEditorService$WonderEditor.getFileMap(editorState);
  if (currentTreeNode) {
    var treeNode_ = currentTreeNode[0];
    return showSpecificTreeNodeImage(fileMap, treeNode_[/* imgArray */2]).concat(showSpecificTreeNodeJson(fileMap, treeNode_[/* jsonArray */3]));
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("buildContent", "the treeNode:" + (String(currentTreeNode) + " not exist in assetTree"), "", "", ""));
  }
}

var Method = /* module */[
  /* getSign */getSign,
  /* showSpecificTreeNodeJson */showSpecificTreeNodeJson,
  /* showSpecificTreeNodeImage */showSpecificTreeNodeImage,
  /* buildContent */buildContent
];

var component = ReasonReact.statelessComponent("MainEditorAssetHeader");

function render(_, _$1, _$2) {
  return React.createElement("article", {
              key: "assetHeader",
              className: "asset-content"
            }, buildContent(/* () */0));
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
