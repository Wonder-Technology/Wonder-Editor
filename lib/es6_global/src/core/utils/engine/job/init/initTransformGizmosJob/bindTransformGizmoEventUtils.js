

import * as MouseEventService$WonderEditor from "../../../../../../service/record/editor/event/MouseEventService.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../service/state/editor/StateEditorService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as BindScaleGizmoEventUtils$WonderEditor from "./scale/BindScaleGizmoEventUtils.js";
import * as CustomEventEditorService$WonderEditor from "../../../../../../service/state/editor/event/CustomEventEditorService.js";
import * as ManageEventEngineService$WonderEditor from "../../../../../../service/state/engine/event/ManageEventEngineService.js";
import * as BindRotationGizmoEventUtils$WonderEditor from "./rotation/BindRotationGizmoEventUtils.js";
import * as SceneViewEventEditorService$WonderEditor from "../../../../../../service/state/editor/event/SceneViewEventEditorService.js";
import * as BindTranslationGizmoEventUtils$WonderEditor from "./translation/BindTranslationGizmoEventUtils.js";
import * as MoveTranslationPlaneGizmosUtils$WonderEditor from "./translation/MoveTranslationPlaneGizmosUtils.js";
import * as SelectScaleGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/scale/SelectScaleGizmoSceneViewEditorService.js";
import * as SelectRotationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/rotation/SelectRotationGizmoSceneViewEditorService.js";
import * as SelectTransformGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/SelectTransformGizmoSceneViewEditorService.js";
import * as CurrentTransformGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/CurrentTransformGizmoSceneViewEditorService.js";
import * as IsTransformGizmoRenderSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/IsTransformGizmoRenderSceneViewEditorService.js";
import * as SelectTranslationGizmoSceneViewEditorService$WonderEditor from "../../../../../../service/state/editor/view/sceneView/transform/translation/SelectTranslationGizmoSceneViewEditorService.js";

function _bindSelectSceneTreeNodeEventName(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(CustomEventEditorService$WonderEditor.getSelectSceneTreeNodeEventName(/* () */0), (function ($$event, engineState) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var engineState$1 = MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState);
                return /* tuple */[
                        engineState$1,
                        $$event
                      ];
              }), engineState, undefined, /* () */0);
}

function _bindDragStartEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragStartEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isLeftMouseButton($$event);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var match$1 = IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTransformGizmoRender(editorState);
                  var match$2;
                  if (match$1) {
                    SceneTreeEditorService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState);
                    var match$3 = CurrentTransformGizmoSceneViewEditorService$WonderEditor.getCurrentGizmoType(editorState);
                    switch (match$3) {
                      case 0 : 
                          match$2 = BindTranslationGizmoEventUtils$WonderEditor.handleDragStartEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                          break;
                      case 1 : 
                          match$2 = BindRotationGizmoEventUtils$WonderEditor.handleDragStartEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                          break;
                      case 2 : 
                          match$2 = BindScaleGizmoEventUtils$WonderEditor.handleDragStartEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                          break;
                      
                    }
                  } else {
                    match$2 = /* tuple */[
                      SelectTransformGizmoSceneViewEditorService$WonderEditor.markNotSelectAnyTransformGizmo(editorState),
                      engineState
                    ];
                  }
                  var engineState$1 = StateLogicService$WonderEditor.renderWhenStop(match$2[1]);
                  StateEditorService$WonderEditor.setState(match$2[0]);
                  return /* tuple */[
                          engineState$1,
                          $$event
                        ];
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragOverEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragOverEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isLeftMouseButton($$event);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var match$1 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isSelectAnyTranslationGizmo(editorState);
                  var match$2;
                  if (match$1) {
                    match$2 = BindTranslationGizmoEventUtils$WonderEditor.handleDragOverEvent($$event, /* tuple */[
                          editorState,
                          engineState
                        ]);
                  } else {
                    var match$3 = SelectRotationGizmoSceneViewEditorService$WonderEditor.isSelectAnyRotationGizmo(editorState);
                    if (match$3) {
                      match$2 = BindRotationGizmoEventUtils$WonderEditor.handleDragOverEvent($$event, /* tuple */[
                            editorState,
                            engineState
                          ]);
                    } else {
                      var match$4 = SelectScaleGizmoSceneViewEditorService$WonderEditor.isSelectAnyScaleGizmo(editorState);
                      match$2 = match$4 ? BindScaleGizmoEventUtils$WonderEditor.handleDragOverEvent($$event, /* tuple */[
                              editorState,
                              engineState
                            ]) : /* tuple */[
                          editorState,
                          engineState
                        ];
                    }
                  }
                  StateEditorService$WonderEditor.setState(match$2[0]);
                  return /* tuple */[
                          match$2[1],
                          $$event
                        ];
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragGizmoDropEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isLeftMouseButton($$event);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var match$1 = SelectTranslationGizmoSceneViewEditorService$WonderEditor.isSelectAnyTranslationGizmo(editorState);
                  if (match$1) {
                    return BindTranslationGizmoEventUtils$WonderEditor.handleDragDropEvent($$event, /* tuple */[
                                editorState,
                                engineState
                              ]);
                  } else {
                    var match$2 = SelectRotationGizmoSceneViewEditorService$WonderEditor.isSelectAnyRotationGizmo(editorState);
                    if (match$2) {
                      return BindRotationGizmoEventUtils$WonderEditor.handleDragDropEvent($$event, /* tuple */[
                                  editorState,
                                  engineState
                                ]);
                    } else {
                      var match$3 = SelectScaleGizmoSceneViewEditorService$WonderEditor.isSelectAnyScaleGizmo(editorState);
                      if (match$3) {
                        return BindScaleGizmoEventUtils$WonderEditor.handleDragDropEvent($$event, /* tuple */[
                                    editorState,
                                    engineState
                                  ]);
                      } else {
                        return /* tuple */[
                                engineState,
                                $$event
                              ];
                      }
                    }
                  }
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragEditCameraDropEvent(engineState) {
  return ManageEventEngineService$WonderEditor.onCustomGlobalEvent(SceneViewEventEditorService$WonderEditor.getPointDragDropEventName(/* () */0), (function ($$event, engineState) {
                var match = MouseEventService$WonderEditor.isRightMouseButton($$event) && StateLogicService$WonderEditor.getEditorState(IsTransformGizmoRenderSceneViewEditorService$WonderEditor.isTranslationWholeGizmoRender);
                if (match) {
                  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                  var engineState$1 = MoveTranslationPlaneGizmosUtils$WonderEditor.moveTranslationPlaneGizmo(editorState, engineState);
                  var engineState$2 = StateLogicService$WonderEditor.renderWhenStop(engineState$1);
                  return /* tuple */[
                          engineState$2,
                          $$event
                        ];
                } else {
                  return /* tuple */[
                          engineState,
                          $$event
                        ];
                }
              }), engineState, undefined, /* () */0);
}

function _bindDragDropEvent(engineState) {
  return _bindDragEditCameraDropEvent(_bindDragGizmoDropEvent(engineState));
}

function bindEvent(engineState) {
  var engineState$1 = _bindDragOverEvent(_bindDragStartEvent(_bindSelectSceneTreeNodeEventName(engineState)));
  return _bindDragEditCameraDropEvent(_bindDragGizmoDropEvent(engineState$1));
}

export {
  _bindSelectSceneTreeNodeEventName ,
  _bindDragStartEvent ,
  _bindDragOverEvent ,
  _bindDragGizmoDropEvent ,
  _bindDragEditCameraDropEvent ,
  _bindDragDropEvent ,
  bindEvent ,
  
}
/* MouseEventService-WonderEditor Not a pure module */
