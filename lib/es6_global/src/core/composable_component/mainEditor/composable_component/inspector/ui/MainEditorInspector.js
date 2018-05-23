'use strict';

import * as React                                   from "react";
import * as Caml_obj                                from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact                             from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as StateLogicService$WonderEditor          from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor         from "../../../../../../service/state/editor/AssetEditorService.js";
import * as AssetTreeInspector$WonderEditor         from "../atom_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor         from "../../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor         from "../atom_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor         from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib        from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as CurrentSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSourceEditorService.js";

function showInspectorBySourceType(store, dispatch, allShowComponentConfig, param) {
  var currentAssetTreeNode = param[2];
  var currentSource = param[0];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  if (currentSource) {
    if (currentSource[0] !== 0) {
      if (currentAssetTreeNode) {
        var nodeId = currentAssetTreeNode[0];
        return ReasonReact.element(/* None */0, /* None */0, AssetTreeInspector$WonderEditor.make(store, dispatch, nodeId, SparseMapService$WonderCommonlib.unsafeGet(nodeId, AssetEditorService$WonderEditor.unsafeGetNodeMap(editorState)), /* array */[]));
      } else {
        return null;
      }
    } else {
      return ReasonReact.element(/* None */0, /* None */0, SceneTreeInspector$WonderEditor.make(store, dispatch, allShowComponentConfig, param[1], /* array */[]));
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
                  self[/* retainedProps */5][/* currentSceneTreeNode */1],
                  self[/* retainedProps */5][/* currentAssetTreeNode */2]
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
    /* currentSceneTreeNode */StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode),
    /* currentAssetTreeNode */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentAssetTreeNode)
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
