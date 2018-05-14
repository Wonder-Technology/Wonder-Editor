'use strict';

import * as React                                   from "react";
import * as Caml_obj                                from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_option                               from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ReasonReact                             from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as DomHelper$WonderEditor                  from "../../../../../external/DomHelper.js";
import * as AssetUtils$WonderEditor                 from "../../asset/utils/AssetUtils.js";
import * as StateLogicService$WonderEditor          from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor         from "../../../../../../service/state/editor/AssetEditorService.js";
import * as AssetFileInspector$WonderEditor         from "../atom_component/assetFile_Inspector/ui/AssetFileInspector.js";
import * as AssetTreeInspector$WonderEditor         from "../atom_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor         from "../../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor         from "../atom_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor         from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib        from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as CurrentSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSourceEditorService.js";

function showInspectorBySourceType(store, dispatch, allShowComponentConfig, param) {
  var currentFile = param[3];
  var currentTreeNode = param[2];
  var currentSource = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  if (currentSource) {
    switch (currentSource[0]) {
      case 0 : 
          return ReasonReact.element(/* None */0, /* None */0, SceneTreeInspector$WonderEditor.make(store, dispatch, allShowComponentConfig, param[1], /* array */[]));
      case 1 : 
          if (currentTreeNode) {
            var folderId = currentTreeNode[0];
            return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AssetTreeInspector$WonderEditor.make(store, dispatch, folderId, Js_option.getExn(AssetUtils$WonderEditor.getSpecificTreeNodeById(folderId, AssetUtils$WonderEditor.getRootTreeNode(editorState))), /* array */[]));
          } else {
            return null;
          }
          break;
      case 2 : 
          if (currentFile) {
            var fileId = currentFile[0];
            return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, AssetFileInspector$WonderEditor.make(store, dispatch, fileId, SparseMapService$WonderCommonlib.unsafeGet(fileId, AssetEditorService$WonderEditor.unsafeGetFileMap(editorState)), /* array */[]));
          } else {
            return null;
          }
          break;
      
    }
  } else {
    return null;
  }
}

var Method = /* module */[/* showInspectorBySourceType */showInspectorBySourceType];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

function render(store, dispatch, allShowComponentConfig, self) {
  return React.createElement("article", {
              key: "inspector",
              className: "inspector-component"
            }, showInspectorBySourceType(store, dispatch, allShowComponentConfig, /* tuple */[
                  self[/* retainedProps */5][/* currentSource */0],
                  self[/* retainedProps */5][/* currentGameObject */1],
                  self[/* retainedProps */5][/* currentTreeNode */2],
                  self[/* retainedProps */5][/* currentFile */3]
                ]));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, allShowComponentConfig, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, allShowComponentConfig, self);
    });
  newrecord[/* retainedProps */11] = /* record */[
    /* currentSource */StateLogicService$WonderEditor.getEditorState(CurrentSourceEditorService$WonderEditor.getCurrentSource),
    /* currentGameObject */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentGameObject),
    /* currentTreeNode */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentTreeNode),
    /* currentFile */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentFile)
  ];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/* component Not a pure module */
