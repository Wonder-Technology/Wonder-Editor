

import * as React from "react";
import * as Caml_obj from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as ReasonReact from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor from "../../../../../external/Css.js";
import * as DomHelper$WonderEditor from "../../../../../external/DomHelper.js";
import * as SceneTreeUtils$WonderEditor from "../../sceneTree/utils/SceneTreeUtils.js";
import * as StateAssetService$WonderEditor from "../../../../../../service/state/asset/StateAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeInspector$WonderEditor from "../composable_component/assetTree_Inspector/ui/AssetTreeInspector.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/SceneEditorService.js";
import * as SceneTreeInspector$WonderEditor from "../composable_component/sceneTree_Inspector/ui/SceneTreeInspector.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as InspectorComponentUtils$WonderEditor from "../utils/InspectorComponentUtils.js";
import * as CurrentNodeDataAssetService$WonderEditor from "../../../../../../service/state/asset/CurrentNodeDataAssetService.js";
import * as CurrentSelectSourceEditorService$WonderEditor from "../../../../../../service/state/editor/CurrentSelectSourceEditorService.js";

import '../../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/ui/css/mainEditorInspector.css';

function showInspectorBySourceType(param, allShowComponentConfig, param$1) {
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
      return ReasonReact.element(undefined, undefined, SceneTreeInspector$WonderEditor.make(store, dispatchFunc, allShowComponentConfig, param$1[1], /* array */[]));
    }
  } else {
    return null;
  }
}

var Method = /* module */[/* showInspectorBySourceType */showInspectorBySourceType];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorInspector");

function render(param, allShowComponentConfig, self) {
  return React.createElement("article", {
              key: "inspector",
              className: "wonder-inspector-component"
            }, showInspectorBySourceType(/* tuple */[
                  param[0],
                  param[1]
                ], allShowComponentConfig, /* tuple */[
                  self[/* retainedProps */2][/* currentSelectSource */4],
                  self[/* retainedProps */2][/* currentSceneTreeNode */5],
                  self[/* retainedProps */2][/* currentNodeData */7]
                ]));
}

function shouldUpdate(param) {
  return Log$WonderLog.print(Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */2], param[/* newSelf */1][/* retainedProps */2]));
}

function make(store, dispatchFunc, allShowComponentConfig, _) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var assetState = StateAssetService$WonderEditor.getState(/* () */0);
  var engineStateToGetData = StateLogicService$WonderEditor.getRunEngineState(/* () */0);
  var currentSceneTreeNode = SceneEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
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
                        ], allShowComponentConfig, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[
            /* sceneGraphData */SceneTreeUtils$WonderEditor.getSceneGraphDataFromStore(store),
            /* currentTransformData */InspectorComponentUtils$WonderEditor.getCurrentGameObjectTransform(currentSceneTreeNode, engineStateToGetData),
            /* currentMapData */InspectorComponentUtils$WonderEditor.getCurrentGameObjectMap(currentSceneTreeNode, engineStateToGetData),
            /* currentColorData */InspectorComponentUtils$WonderEditor.getCurrentGameObjectColor(currentSceneTreeNode, engineStateToGetData),
            /* currentSelectSource */CurrentSelectSourceEditorService$WonderEditor.getCurrentSelectSource(editorState),
            /* currentSceneTreeNode */currentSceneTreeNode,
            /* currentSceneTreeNodeName */InspectorComponentUtils$WonderEditor.getCurrentGameObjectName(currentSceneTreeNode, engineStateToGetData),
            /* currentNodeData */CurrentNodeDataAssetService$WonderEditor.getCurrentNodeData(assetState)
          ],
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
/*  Not a pure module */

