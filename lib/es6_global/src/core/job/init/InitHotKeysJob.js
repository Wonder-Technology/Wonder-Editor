

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_builtin_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as Controller$WonderEditor from "../../composable_component/controller/ui/Controller.js";
import * as FocusUtils$WonderEditor from "../../utils/engine/job/init/initHotKeysJob/FocusUtils.js";
import * as EventHelper$WonderEditor from "../../external/EventHelper.js";
import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as Hotkeys from "wonder-hotkey/dist/hotkeys";
import * as UIStateService$WonderEditor from "../../../service/state/ui/UIStateService.js";
import * as AllHistoryService$WonderEditor from "../../../service/stateTuple/history/AllHistoryService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";
import * as MainEditorLeftHeader$WonderEditor from "../../composable_component/mainEditor/composable_component/left_components/atom_component/header/MainEditorLeftHeader.js";
import * as MainEditorAssetHeader$WonderEditor from "../../composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/header/ui/MainEditorAssetHeader.js";
import * as GameObjectLogicService$WonderEditor from "../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as OperateStateHistoryService$WonderEditor from "../../../service/stateTuple/history/OperateStateHistoryService.js";
import * as HotKeysSettingEditorService$WonderEditor from "../../../service/state/editor/setting/HotKeysSettingEditorService.js";
import * as CurrentNodeIdAssetEditorService$WonderEditor from "../../../service/state/editor/asset/CurrentNodeIdAssetEditorService.js";

function _getHotKeyAction(hotKeyName) {
  switch (hotKeyName) {
    case "delete" : 
        return /* Delete */6;
    case "duplicate" : 
        return /* Duplicate */5;
    case "focus" : 
        return /* Focus */7;
    case "redo" : 
        return /* Redo */3;
    case "rotation" : 
        return /* Rotation */1;
    case "scale" : 
        return /* Scale */2;
    case "translation" : 
        return /* Translation */0;
    case "undo" : 
        return /* Undo */4;
    default:
      throw [
            Caml_builtin_exceptions.match_failure,
            /* tuple */[
              "InitHotKeysJob.re",
              6,
              2
            ]
          ];
  }
}

function _getHandleFuncByHotKeyAction(hotKeyAction) {
  var uiState = UIStateService$WonderEditor.getState(/* () */0);
  var dispatch = UIStateService$WonderEditor.getDispatch(/* () */0);
  var isCurrentSceneTreeNodeSceneChildren = StateLogicService$WonderEditor.getStateToGetData(GameObjectLogicService$WonderEditor.isCurrentSceneTreeNodeSceneChildren);
  switch (hotKeyAction) {
    case 0 : 
        return (function (param) {
            return Controller$WonderEditor.Method[/* handleChangeCurrentTransformGizmoType */5](dispatch, /* Translation */0);
          });
    case 1 : 
        return (function (param) {
            return Controller$WonderEditor.Method[/* handleChangeCurrentTransformGizmoType */5](dispatch, /* Rotation */1);
          });
    case 2 : 
        return (function (param) {
            return Controller$WonderEditor.Method[/* handleChangeCurrentTransformGizmoType */5](dispatch, /* Scale */2);
          });
    case 3 : 
        return (function (param) {
            var match = OperateStateHistoryService$WonderEditor.hasRedoState(AllStateData$WonderEditor.getHistoryState(/* () */0));
            if (match) {
              return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                            return AllHistoryService$WonderEditor.redoHistoryState(uiState, dispatch, param);
                          }));
            } else {
              return /* () */0;
            }
          });
    case 4 : 
        return (function (param) {
            return AllHistoryService$WonderEditor.handleUndo(uiState, dispatch);
          });
    case 5 : 
        return (function (param) {
            if (isCurrentSceneTreeNodeSceneChildren) {
              return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* cloneCurrentSceneTreeNode */2], /* tuple */[
                          uiState,
                          dispatch
                        ], /* () */0, /* () */0);
            } else {
              return /* () */0;
            }
          });
    case 6 : 
        return (function (param) {
            if (isCurrentSceneTreeNodeSceneChildren) {
              return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* disposeCurrentSceneTreeNode */1], /* tuple */[
                          uiState,
                          dispatch
                        ], /* () */0, /* () */0);
            } else {
              var match = StateLogicService$WonderEditor.getEditorState(CurrentNodeIdAssetEditorService$WonderEditor.couldRemoveCurrentNode);
              if (match) {
                return Curry._3(MainEditorAssetHeader$WonderEditor.Method[/* removeAssetNode */1], /* tuple */[
                            uiState,
                            dispatch
                          ], /* () */0, /* () */0);
              } else {
                return /* () */0;
              }
            }
          });
    case 7 : 
        return (function (param) {
            var editorState = StateEditorService$WonderEditor.getState(/* () */0);
            var match = SceneTreeEditorService$WonderEditor.getCurrentSceneTreeNode(editorState);
            if (match !== undefined) {
              return StateLogicService$WonderEditor.refreshEngineState(FocusUtils$WonderEditor.setEditorCameraFocusTargetGameObject(SceneViewEditorService$WonderEditor.unsafeGetEditCamera(editorState), match, editorState, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
            } else {
              return /* () */0;
            }
          });
    
  }
}

var _preventBrowserHotKeys = EventHelper$WonderEditor.preventDefault;

function _handleHotKeyFunc(hotKeyDataArray) {
  hotKeyDataArray.forEach((function (param) {
          var hotKeyAction = param[1];
          Hotkeys.default(param[0].join(","), (function (e, handler) {
                  EventHelper$WonderEditor.preventDefault(e);
                  var handleFunc = _getHandleFuncByHotKeyAction(hotKeyAction);
                  return Curry._1(handleFunc, /* () */0);
                }));
          return /* () */0;
        }));
  return /* () */0;
}

function initHotKeysForEditorJob(param, engineState) {
  _handleHotKeyFunc(HotKeysSettingEditorService$WonderEditor.getHotKeys(StateEditorService$WonderEditor.getState(/* () */0)).map((function (param) {
              return /* tuple */[
                      param[/* values */1],
                      _getHotKeyAction(param[/* name */0])
                    ];
            })));
  return engineState;
}

export {
  _getHotKeyAction ,
  _getHandleFuncByHotKeyAction ,
  _preventBrowserHotKeys ,
  _handleHotKeyFunc ,
  initHotKeysForEditorJob ,
  
}
/* Controller-WonderEditor Not a pure module */
