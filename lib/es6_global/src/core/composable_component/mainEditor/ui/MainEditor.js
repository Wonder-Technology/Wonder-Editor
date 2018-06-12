

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Css$WonderEditor from "../../../external/Css.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as MainUtils$WonderEditor from "../../../utils/scene/MainUtils.js";
import * as SceneTreeUtils$WonderEditor from "../composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as MainEditorAsset$WonderEditor from "../composable_component/asset/ui/MainEditorAsset.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeNodeUtils$WonderEditor from "../composable_component/asset/utils/AssetTreeNodeUtils.js";
import * as MainEditorInspector$WonderEditor from "../composable_component/inspector/ui/MainEditorInspector.js";
import * as MainEditorSceneTree$WonderEditor from "../composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../service/state/editor/asset/AssetTreeRootEditorService.js";
import * as GameObjectAllComponentParseUtils$WonderEditor from "../../../config/utils/GameObjectAllComponentParseUtils.js";

import '../../../../../../../src/core/composable_component/mainEditor/ui/css/mainEditor.css';

var component = ReasonReact.statelessComponent("MainEditor");

function _buildNotStartElement() {
  return React.createElement("article", {
              key: "mainEditor",
              className: "wonder-mainEditor-component"
            }, React.createElement("div", {
                  key: "topComponent",
                  className: "top-component"
                }, React.createElement("div", {
                      key: "webglParent",
                      className: "webgl-parent"
                    }, React.createElement("canvas", {
                          key: "editWebgl",
                          id: "editCanvas"
                        })), React.createElement("div", {
                      key: "webglRun",
                      className: "webgl-parent"
                    }, React.createElement("canvas", {
                          key: "runWebgl",
                          id: "runCanvas"
                        }))), React.createElement("div", {
                  key: "bottomComponent",
                  className: "bottom-component"
                }));
}

function _buildStartedElement(store, dispatchFunc) {
  return React.createElement("article", {
              key: "mainEditor",
              className: "wonder-mainEditor-component"
            }, React.createElement("div", {
                  key: "topComponent",
                  className: "top-component"
                }, React.createElement("div", {
                      className: "inline-component inspector-parent"
                    }, ReasonReact.element(/* None */0, /* None */0, MainEditorInspector$WonderEditor.make(store, dispatchFunc, GameObjectAllComponentParseUtils$WonderEditor.getGameObjectAllComponentConfig(/* () */0), /* array */[]))), React.createElement("div", {
                      className: "inline-component sceneTree-parent"
                    }, ReasonReact.element(/* None */0, /* None */0, MainEditorSceneTree$WonderEditor.make(store, dispatchFunc, /* array */[]))), React.createElement("div", {
                      key: "webglParent",
                      className: "webgl-parent"
                    }, React.createElement("canvas", {
                          key: "editWebgl",
                          id: "editCanvas"
                        })), React.createElement("div", {
                      key: "webglRun",
                      className: "webgl-parent"
                    }, React.createElement("canvas", {
                          key: "runWebgl",
                          id: "runCanvas"
                        }))), React.createElement("div", {
                  key: "bottomComponent",
                  className: "bottom-component"
                }, ReasonReact.element(/* None */0, /* None */0, MainEditorAsset$WonderEditor.make(store, dispatchFunc, /* array */[]))));
}

function render(store, dispatchFunc, _) {
  var match = store[/* isEditorAndEngineStart */0];
  if (match) {
    return _buildStartedElement(store, dispatchFunc);
  } else {
    return _buildNotStartElement(/* () */0);
  }
}

function make(store, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function () {
              MainUtils$WonderEditor.start(/* () */0).then((function () {
                      StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                              var match = AssetTreeNodeUtils$WonderEditor.initRootAssetTree(editorState);
                              return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]);
                            }));
                      Curry._1(dispatchFunc, [
                            AppStore$WonderEditor.SceneTreeAction,
                            /* SetSceneGraph */[/* Some */[StateLogicService$WonderEditor.getStateToGetData(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine)]]
                          ]);
                      return Promise.resolve(Curry._1(dispatchFunc, AppStore$WonderEditor.StartEngineAction));
                    }));
              return /* () */0;
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(store, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */component[/* reducer */12],
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
        ];
}

export {
  component ,
  _buildNotStartElement ,
  _buildStartedElement ,
  render ,
  make ,
  
}
/*  Not a pure module */

