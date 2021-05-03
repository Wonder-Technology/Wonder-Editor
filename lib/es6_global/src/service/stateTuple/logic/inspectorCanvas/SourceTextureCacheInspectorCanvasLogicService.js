

import * as LogUtils$WonderEditor from "../../../../core/utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../core/utils/ui/ConsoleUtils.js";
import * as SourceTextureEngineService$WonderEditor from "../../../state/engine/SourceTextureEngineService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function _error(textureInMainEngineState, editorState) {
  return ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("textureInMainEngineState:" + (String(textureInMainEngineState) + " should be basicSourceTexture"), "", "", ""), editorState);
}

function addCache(textureInMainEngineState, textureInInspectorEngineState, mainEngineState, editorState) {
  var match = SourceTextureEngineService$WonderEditor.isBasicSourceTextureIndex(textureInMainEngineState, mainEngineState);
  if (match) {
    var init = editorState[/* inspectorCanvasRecord */0];
    return /* record */[
            /* inspectorCanvasRecord : record */[
              /* containerGameObject */init[/* containerGameObject */0],
              /* basicSourceTextureCacheMap */ImmutableSparseMapService$WonderCommonlib.set(textureInMainEngineState, textureInInspectorEngineState, editorState[/* inspectorCanvasRecord */0][/* basicSourceTextureCacheMap */1]),
              /* materialSphereGameObjectInInspectorCanvas */init[/* materialSphereGameObjectInInspectorCanvas */2]
            ],
            /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
            /* uiRecord */editorState[/* uiRecord */2],
            /* settingRecord */editorState[/* settingRecord */3],
            /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
            /* assetRecord */editorState[/* assetRecord */5],
            /* sceneViewRecord */editorState[/* sceneViewRecord */6],
            /* gameViewRecord */editorState[/* gameViewRecord */7],
            /* eventRecord */editorState[/* eventRecord */8],
            /* imguiRecord */editorState[/* imguiRecord */9],
            /* inspectorRecord */editorState[/* inspectorRecord */10],
            /* consoleRecord */editorState[/* consoleRecord */11],
            /* transformRecord */editorState[/* transformRecord */12],
            /* pickingRecord */editorState[/* pickingRecord */13],
            /* currentDragSource */editorState[/* currentDragSource */14],
            /* currentSelectSource */editorState[/* currentSelectSource */15],
            /* loopId */editorState[/* loopId */16],
            /* languageType */editorState[/* languageType */17]
          ];
  } else {
    _error(textureInMainEngineState, editorState);
    return editorState;
  }
}

function removeCache(textureInMainEngineState, mainEngineState, editorState) {
  var match = SourceTextureEngineService$WonderEditor.isBasicSourceTextureIndex(textureInMainEngineState, mainEngineState);
  if (match) {
    var init = editorState[/* inspectorCanvasRecord */0];
    return /* record */[
            /* inspectorCanvasRecord : record */[
              /* containerGameObject */init[/* containerGameObject */0],
              /* basicSourceTextureCacheMap */ImmutableSparseMapService$WonderCommonlib.deleteVal(textureInMainEngineState, editorState[/* inspectorCanvasRecord */0][/* basicSourceTextureCacheMap */1]),
              /* materialSphereGameObjectInInspectorCanvas */init[/* materialSphereGameObjectInInspectorCanvas */2]
            ],
            /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
            /* uiRecord */editorState[/* uiRecord */2],
            /* settingRecord */editorState[/* settingRecord */3],
            /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
            /* assetRecord */editorState[/* assetRecord */5],
            /* sceneViewRecord */editorState[/* sceneViewRecord */6],
            /* gameViewRecord */editorState[/* gameViewRecord */7],
            /* eventRecord */editorState[/* eventRecord */8],
            /* imguiRecord */editorState[/* imguiRecord */9],
            /* inspectorRecord */editorState[/* inspectorRecord */10],
            /* consoleRecord */editorState[/* consoleRecord */11],
            /* transformRecord */editorState[/* transformRecord */12],
            /* pickingRecord */editorState[/* pickingRecord */13],
            /* currentDragSource */editorState[/* currentDragSource */14],
            /* currentSelectSource */editorState[/* currentSelectSource */15],
            /* loopId */editorState[/* loopId */16],
            /* languageType */editorState[/* languageType */17]
          ];
  } else {
    _error(textureInMainEngineState, editorState);
    return editorState;
  }
}

function getCache(textureInMainEngineState, param) {
  var editorState = param[0];
  var match = SourceTextureEngineService$WonderEditor.isBasicSourceTextureIndex(textureInMainEngineState, param[1]);
  if (match) {
    return ImmutableSparseMapService$WonderCommonlib.get(textureInMainEngineState, editorState[/* inspectorCanvasRecord */0][/* basicSourceTextureCacheMap */1]);
  } else {
    _error(textureInMainEngineState, editorState);
    return undefined;
  }
}

export {
  _error ,
  addCache ,
  removeCache ,
  getCache ,
  
}
/* LogUtils-WonderEditor Not a pure module */
