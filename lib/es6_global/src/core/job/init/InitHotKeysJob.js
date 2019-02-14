

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_builtin_exceptions from "../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as EventHelper$WonderEditor from "../../external/EventHelper.js";
import * as AllStateData$WonderEditor from "../../../service/stateTuple/data/AllStateData.js";
import * as Hotkeys from "wonder-hotkey/dist/hotkeys";
import * as UIStateService$WonderEditor from "../../../service/state/ui/UIStateService.js";
import * as AllHistoryService$WonderEditor from "../../../service/stateTuple/history/AllHistoryService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../service/stateTuple/history/StateHistoryService.js";
import * as MainEditorLeftHeader$WonderEditor from "../../composable_component/mainEditor/composable_component/left_components/atom_component/header/MainEditorLeftHeader.js";
import * as GameObjectLogicService$WonderEditor from "../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as OperateStateHistoryService$WonderEditor from "../../../service/stateTuple/history/OperateStateHistoryService.js";
import * as HotKeysSettingEditorService$WonderEditor from "../../../service/state/editor/setting/HotKeysSettingEditorService.js";

function _getHotKeyAction(hotKeyName) {
  switch (hotKeyName) {
    case "delete" : 
        return /* Delete */3;
    case "duplicate" : 
        return /* Duplicate */2;
    case "redo" : 
        return /* Redo */0;
    case "undo" : 
        return /* Undo */1;
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
  var isCurrentSceneTreeNodeCanBeOperate = StateLogicService$WonderEditor.getStateToGetData(GameObjectLogicService$WonderEditor.isCurrentSceneTreeNodeCanBeOperate);
  switch (hotKeyAction) {
    case 0 : 
        return (function () {
            var match = OperateStateHistoryService$WonderEditor.hasRedoState(AllStateData$WonderEditor.getHistoryState(/* () */0));
            if (match) {
              return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                            return AllHistoryService$WonderEditor.redoHistoryState(uiState, dispatch, param);
                          }));
            } else {
              return /* () */0;
            }
          });
    case 1 : 
        return (function () {
            return AllHistoryService$WonderEditor.handleUndo(uiState, dispatch);
          });
    case 2 : 
        return (function () {
            if (isCurrentSceneTreeNodeCanBeOperate) {
              return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* cloneCurrentSceneTreeNode */2], /* tuple */[
                          uiState,
                          dispatch
                        ], /* () */0, /* () */0);
            } else {
              return /* () */0;
            }
          });
    case 3 : 
        return (function () {
            if (isCurrentSceneTreeNodeCanBeOperate) {
              return Curry._3(MainEditorLeftHeader$WonderEditor.Method[/* disposeCurrentSceneTreeNode */1], /* tuple */[
                          uiState,
                          dispatch
                        ], /* () */0, /* () */0);
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
          Hotkeys.default(param[0].join(","), (function (e, _) {
                  EventHelper$WonderEditor.preventDefault(e);
                  var handleFunc = _getHandleFuncByHotKeyAction(hotKeyAction);
                  return Curry._1(handleFunc, /* () */0);
                }));
          return /* () */0;
        }));
  return /* () */0;
}

function initHotKeysForEditorJob(_, engineState) {
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
/* wonder-hotkey/dist/hotkeys Not a pure module */
