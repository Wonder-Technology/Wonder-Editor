

import * as ArrayService$WonderEditor from "../../../../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../../../../service/primitive/OptionService.js";
import * as Vector2Service$WonderEditor from "../../../../../../service/primitive/Vector2Service.js";
import * as SceneEngineService$WonderEditor from "../../../../../../service/state/engine/SceneEngineService.js";
import * as SceneViewIMGUIUtils$WonderEditor from "../../loop/SceneViewIMGUIUtils.js";

function _isPickIMGUIGameObject(param, param$1) {
  var y = param$1[1];
  var x = param$1[0];
  var locationInViewY = param[1];
  var locationInViewX = param[0];
  if (locationInViewX >= x && locationInViewX < x + param$1[2] && locationInViewY >= y) {
    return locationInViewY < y + param$1[3];
  } else {
    return false;
  }
}

function findPickedIMGUIGameObject($$event, editorState, engineState) {
  var match = OptionService$WonderEditor.unsafeGet($$event[/* userData */4]);
  var locationInView = match[/* locationInView */2];
  return ArrayService$WonderEditor.getFirst(SceneViewIMGUIUtils$WonderEditor.getIMGUIGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState).filter((function (imguiGameObject) {
                    return _isPickIMGUIGameObject(Vector2Service$WonderEditor.convertIntToFloat(locationInView), SceneViewIMGUIUtils$WonderEditor.computePositionAndSize(imguiGameObject, editorState, engineState));
                  })));
}

export {
  _isPickIMGUIGameObject ,
  findPickedIMGUIGameObject ,
  
}
/* ArrayService-WonderEditor Not a pure module */
