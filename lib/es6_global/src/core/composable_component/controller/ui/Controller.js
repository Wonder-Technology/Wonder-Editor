

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Color$WonderEditor from "../../../external/Color.js";
import * as AppStore$WonderEditor from "../../../ui/store/AppStore.js";
import * as ColorType$WonderEditor from "../../../external/type/ColorType.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as StoreUtils$WonderEditor from "../../../utils/ui/StoreUtils.js";
import * as ControllerUtils$WonderEditor from "../../../utils/controller/ControllerUtils.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as PickColorComponent$WonderEditor from "../../mainEditor/composable_component/inspector/atom_component/PickColorComponent/ui/PickColorComponent.js";
import * as SceneEngineService$WonderEditor from "../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as TransformGizmoSwitch$WonderEditor from "../atom_component/transformGizmo/ui/TransformGizmoSwitch.js";
import * as TransformGizmoCoordinateSystemSwitch$WonderEditor from "../atom_component/transformGizmo/ui/TransformGizmoCoordinateSystemSwitch.js";
import * as SelectTransformGizmoSceneViewEditorService$WonderEditor from "../../../../service/state/editor/view/sceneView/transform/SelectTransformGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as ControllerAmbientLightCloseColorPickEventHandler$WonderEditor from "../eventHandler/ControllerAmbientLightCloseColorPickEventHandler.js";
import * as CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor from "../../../../service/state/editor/view/sceneView/transform/CoordinateSystemTransformGizmoSceneViewEditorService.js";

function changeColor(value) {
  var partial_arg = Color$WonderEditor.getEngineColorRgbArr(ColorType$WonderEditor.convertColorObjToColorPickType(value));
  return StateLogicService$WonderEditor.getAndRefreshEngineStateWithFunc((function (param) {
                return SceneEngineService$WonderEditor.setAmbientLightColor(partial_arg, param);
              }));
}

function getColor(param) {
  return Color$WonderEditor.getHexString(StateLogicService$WonderEditor.getEngineStateToGetData(SceneEngineService$WonderEditor.getAmbientLightColor));
}

var closeColorPick = ControllerAmbientLightCloseColorPickEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithCopiedEngineState */1];

function buildAmbientLightComponent(uiState, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, PickColorComponent$WonderEditor.make("Ambient Color : ", getColor, changeColor, Curry._2(closeColorPick, /* tuple */[
                              uiState,
                              dispatchFunc
                            ], /* () */0), /* array */[]))));
}

function handleChangeCurrentTransformGizmoType(dispatchFunc, type_) {
  StateEditorService$WonderEditor.setState(SelectTransformGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyTransformGizmo(CurrentTransformGizmoSceneViewEditorService$WonderEditor.mark(type_, StateEditorService$WonderEditor.getState(/* () */0))));
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  Curry._1(dispatchFunc, [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Controller */7]]
      ]);
  return /* () */0;
}

function _handleChangeCurrentTransformGizmoCoordinateSystem(coordinateSystem) {
  StateEditorService$WonderEditor.setState(CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.setCoordinateSystem(coordinateSystem, StateEditorService$WonderEditor.getState(/* () */0)));
  StateLogicService$WonderEditor.getAndRefreshEngineState(/* () */0);
  return /* () */0;
}

function _getCurrentTransformGizmoType(param) {
  return StateLogicService$WonderEditor.getEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType);
}

function _getCurrentTransformGizmoCoordinateSystem(param) {
  return StateLogicService$WonderEditor.getEditorState(CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.getCoordinateSystem);
}

function _isTransformGizmoCoordinateSystemSwitchDisable(param) {
  var match = StateLogicService$WonderEditor.getEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType);
  return match >= 2;
}

function buildTransformComponent(uiState, dispatchFunc) {
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, TransformGizmoSwitch$WonderEditor.make(/* array */[
                          /* record */[
                            /* type_ : Translation */0,
                            /* onChangeFunc */(function (param) {
                                return handleChangeCurrentTransformGizmoType(dispatchFunc, param);
                              })
                          ],
                          /* record */[
                            /* type_ : Rotation */1,
                            /* onChangeFunc */(function (param) {
                                return handleChangeCurrentTransformGizmoType(dispatchFunc, param);
                              })
                          ],
                          /* record */[
                            /* type_ : Scale */2,
                            /* onChangeFunc */(function (param) {
                                return handleChangeCurrentTransformGizmoType(dispatchFunc, param);
                              })
                          ]
                        ], StateLogicService$WonderEditor.getEditorState(CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType), /* array */[])), ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, TransformGizmoCoordinateSystemSwitch$WonderEditor.make(StateLogicService$WonderEditor.getEditorState(CoordinateSystemTransformGizmoSceneViewEditorService$WonderEditor.getCoordinateSystem), _isTransformGizmoCoordinateSystemSwitchDisable(/* () */0), _handleChangeCurrentTransformGizmoCoordinateSystem, /* array */[]))));
}

function renderRunAndStop(uiState, dispatchFunc) {
  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
  return React.createElement("div", {
              className: "controller-runAndStop",
              onClick: (function (_e) {
                  var match = StateEditorService$WonderEditor.getIsRun(/* () */0);
                  if (match) {
                    ControllerUtils$WonderEditor.stop(dispatchFunc);
                  } else {
                    ControllerUtils$WonderEditor.run(uiState);
                  }
                  Curry._1(dispatchFunc, [
                        AppStore$WonderEditor.UpdateAction,
                        /* Update */[/* array */[/* All */1]]
                      ]);
                  return /* () */0;
                })
            }, match ? React.createElement("img", {
                    src: "./public/img/stop.png"
                  }) : React.createElement("img", {
                    src: "./public/img/run.png"
                  }));
}

var Method = /* module */[
  /* changeColor */changeColor,
  /* getColor */getColor,
  /* closeColorPick */closeColorPick,
  /* buildAmbientLightComponent */buildAmbientLightComponent,
  /* handleChangeCurrentTransformGizmoType */handleChangeCurrentTransformGizmoType,
  /* _handleChangeCurrentTransformGizmoCoordinateSystem */_handleChangeCurrentTransformGizmoCoordinateSystem,
  /* _getCurrentTransformGizmoType */_getCurrentTransformGizmoType,
  /* _getCurrentTransformGizmoCoordinateSystem */_getCurrentTransformGizmoCoordinateSystem,
  /* _isTransformGizmoCoordinateSystemSwitchDisable */_isTransformGizmoCoordinateSystemSwitchDisable,
  /* buildTransformComponent */buildTransformComponent,
  /* renderRunAndStop */renderRunAndStop
];

var component = ReasonReact.statelessComponentWithRetainedProps("Controller");

function render(uiState, dispatchFunc, param) {
  return React.createElement("article", {
              key: "controller",
              className: "wonder-controller-component"
            }, React.createElement("div", {
                  className: "header-controller"
                }, React.createElement("div", {
                      className: "controller-ambient"
                    }, buildAmbientLightComponent(uiState, dispatchFunc)), React.createElement("div", {
                      className: "controller-transform"
                    }, buildTransformComponent(uiState, dispatchFunc)), renderRunAndStop(uiState, dispatchFunc), React.createElement("div", {
                      className: "controller-other"
                    })));
}

function shouldUpdate(param) {
  return StoreUtils$WonderEditor.shouldComponentUpdate(/* Controller */7, param[/* newSelf */1][/* retainedProps */2][/* updateTypeArr */0]);
}

function make(uiState, dispatchFunc, _children) {
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
              return render(uiState, dispatchFunc, self);
            }),
          /* initialState */component[/* initialState */10],
          /* retainedProps : record */[/* updateTypeArr */StoreUtils$WonderEditor.getUpdateComponentTypeArr(uiState)],
          /* reducer */component[/* reducer */12],
          /* jsElementWrapped */component[/* jsElementWrapped */13]
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
