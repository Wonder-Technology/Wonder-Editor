

import * as React from "react";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as StoreUtils$WonderEditor from "../../../../../utils/ui/StoreUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeInspector$WonderEditor from "../composable_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor from "../composable_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";
import * as CurrentNodeDataAssetEditorService$WonderEditor from "../../../../../../service/state/editor/asset/CurrentNodeDataAssetEditorService.js";

function showInspectorBySourceType(param, addableComponentConfig, param$1) {
  var currentSelectSource = param$1[0];
  if (currentSelectSource !== undefined) {
    var currentNodeData = param$1[2];
    var dispatchFunc = param[1];
    var store = param[0];
    if (currentSelectSource) {
      if (currentNodeData !== undefined) {
        var match = currentNodeData;
        return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, AssetTreeInspector$WonderEditor.make(store, dispatchFunc, match[/* currentNodeId */0], match[/* nodeType */1], /* array */[]));
      } else {
        return null;
      }
    } else {
      return ReasonReact.element(undefined, undefined, SceneTreeInspector$WonderEditor.make(store, dispatchFunc, addableComponentConfig, param$1[1], /* array */[]));
    }
  } else {
    return null;
  }
}

var Method = /* module */[/* showInspectorBySourceType */showInspectorBySourceType];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

function render(param, addableComponentConfig, _self) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return React.createElement("article", {
              key: "inspector",
              className: "wonder-inspector-component"
            }, showInspectorBySourceType(/* tuple */[
                  param[0],
                  param[1]
                ], addableComponentConfig, /* tuple */[
                  CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource(editorState),
                  SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState),
                  StateLogicService$WonderEditor.getEditorState(CurrentNodeDataAssetEditorService$WonderEditor.getCurrentNodeData)
                ]));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* Inspector */2, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
}

function make(store, dispatchFunc, addableComponentConfig, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */shouldUpdate,
          /* render */(function (self) {
              return render(/* tuple */[
                          store,
                          dispatchFunc
                        ], addableComponentConfig, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(store)],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  Method ,
  component ,
  render ,
  shouldUpdate ,
  make ,
  
}
/* component Not a pure module */
