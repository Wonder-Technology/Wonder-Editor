

import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as ScreenEngineService$WonderEditor from "../../../service/state/engine/ScreenEngineService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as SceneViewEditorService$WonderEditor from "../../../service/state/editor/view/sceneView/SceneViewEditorService.js";
import * as DeviceManagerEngineService$WonderEditor from "../../../service/state/engine/DeviceManagerEngineService.js";
import * as PerspectiveCameraProjectionEngineService$WonderEditor from "../../../service/state/engine/camera/PerspectiveCameraProjectionEngineService.js";

function _getCanvasParentSize(parent) {
  return /* tuple */[
          parent.offsetWidth,
          parent.offsetHeight
        ];
}

function getCanvasParentSize(param) {
  return _getCanvasParentSize(document.getElementById("canvasParent"));
}

function getCanvasSize(param) {
  var canvas = document.getElementById("canvas");
  return /* tuple */[
          canvas.width,
          canvas.height
        ];
}

function resizeCanvas(param) {
  var height = param[1];
  var width = param[0];
  ScreenEngineService$WonderEditor.setScreenSize(/* tuple */[
        width,
        height,
        width,
        height
      ], document.getElementById("canvas"));
  return /* () */0;
}

function resizeViewport(param, engineState) {
  return DeviceManagerEngineService$WonderEditor.setViewport(/* tuple */[
              0,
              0,
              param[0],
              param[1]
            ], PerspectiveCameraProjectionEngineService$WonderEditor.markAllPerspectiveCameraProjectionsDirty(engineState));
}

function updateViewRect(param, editorState) {
  var canvasHeight = param[1];
  var canvasWidth = param[0];
  return GameViewEditorService$WonderEditor.updateViewRect(/* tuple */[
              canvasWidth / 2 | 0,
              0,
              canvasWidth / 2 | 0,
              canvasHeight
            ], SceneViewEditorService$WonderEditor.updateViewRect(/* tuple */[
                  0,
                  0,
                  canvasWidth / 2 | 0,
                  canvasHeight
                ], editorState));
}

function isSizeEqual(size1, size2) {
  if (size1 >= (size2 - 1 | 0)) {
    return size1 <= (size2 + 1 | 0);
  } else {
    return false;
  }
}

function getViewWidth(sceneViewWidth, gameViewWidth) {
  return sceneViewWidth + gameViewWidth | 0;
}

function getViewHeight(sceneViewHeight, gameViewHeight) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sceneViewHeight == gameViewHeight", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* = */0](sceneViewHeight, gameViewHeight);
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return sceneViewHeight;
}

function isViewSizeChange(param, param$1, param$2) {
  if (isSizeEqual(param[2] + param$1[2] | 0, param$2[0])) {
    return !isSizeEqual(getViewHeight(param[3], param$1[3]), param$2[1]);
  } else {
    return true;
  }
}

function resizeScreen(param) {
  var canvasParentSize = _getCanvasParentSize(document.getElementById("canvasParent"));
  resizeCanvas(canvasParentSize);
  var match = Js_option.isSome(DeviceManagerEngineService$WonderEditor.getGl(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  if (match) {
    StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
            return updateViewRect(canvasParentSize, param);
          }));
    StateLogicService$WonderEditor.refreshEngineState(resizeViewport(canvasParentSize, StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
    return /* () */0;
  } else {
    return /* () */0;
  }
}

export {
  _getCanvasParentSize ,
  getCanvasParentSize ,
  getCanvasSize ,
  resizeCanvas ,
  resizeViewport ,
  updateViewRect ,
  isSizeEqual ,
  getViewWidth ,
  getViewHeight ,
  isViewSizeChange ,
  resizeScreen ,
  
}
/* Log-WonderLog Not a pure module */
