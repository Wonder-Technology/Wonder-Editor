

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as IsShowChildrenSceneTreeService$WonderEditor from "../../../record/editor/sceneTree/IsShowChildrenSceneTreeService.js";
import * as CurrentSceneTreeNodeSceneTreeService$WonderEditor from "../../../record/editor/sceneTree/CurrentSceneTreeNodeSceneTreeService.js";

function unsafeGetCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneTreeService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState[/* sceneTreeRecord */4]);
}

function getCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneTreeService$WonderEditor.getCurrentSceneTreeNode(editorState[/* sceneTreeRecord */4]);
}

function setCurrentSceneTreeNode(gameObject, editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */CurrentSceneTreeNodeSceneTreeService$WonderEditor.setCurrentSceneTreeNode(gameObject, editorState[/* sceneTreeRecord */4]),
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
}

function hasCurrentSceneTreeNode(editorState) {
  return Js_option.isSome(CurrentSceneTreeNodeSceneTreeService$WonderEditor.getCurrentSceneTreeNode(editorState[/* sceneTreeRecord */4]));
}

function clearCurrentSceneTreeNode(editorState) {
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */CurrentSceneTreeNodeSceneTreeService$WonderEditor.clearCurrentSceneTreeNode(editorState[/* sceneTreeRecord */4]),
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
}

function getIsShowChildrenMap(param) {
  return IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(param[/* sceneTreeRecord */4]);
}

function getDefaultIsShowChildren(param) {
  return false;
}

function getIsShowChildern(gameObject, sceneGameObject, param) {
  var match = gameObject === sceneGameObject;
  if (match) {
    return true;
  } else {
    var match$1 = ImmutableSparseMapService$WonderCommonlib.get(gameObject, IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(param[/* sceneTreeRecord */4]));
    if (match$1 !== undefined) {
      return match$1;
    } else {
      return false;
    }
  }
}

function setIsShowChildren(gameObject, isShowChildren, editorState) {
  var sceneTreeRecord = editorState[/* sceneTreeRecord */4];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord : record */[
            /* currentSceneTreeNode */sceneTreeRecord[/* currentSceneTreeNode */0],
            /* isShowChildrenMap */ImmutableSparseMapService$WonderCommonlib.set(gameObject, isShowChildren, IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(sceneTreeRecord))
          ],
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
}

function removeIsShowChildren(gameObject, editorState) {
  var sceneTreeRecord = editorState[/* sceneTreeRecord */4];
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord : record */[
            /* currentSceneTreeNode */sceneTreeRecord[/* currentSceneTreeNode */0],
            /* isShowChildrenMap */ImmutableSparseMapService$WonderCommonlib.deleteVal(gameObject, IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(sceneTreeRecord))
          ],
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
}

export {
  unsafeGetCurrentSceneTreeNode ,
  getCurrentSceneTreeNode ,
  setCurrentSceneTreeNode ,
  hasCurrentSceneTreeNode ,
  clearCurrentSceneTreeNode ,
  getIsShowChildrenMap ,
  getDefaultIsShowChildren ,
  getIsShowChildern ,
  setIsShowChildren ,
  removeIsShowChildren ,
  
}
/* CurrentSceneTreeNodeSceneTreeService-WonderEditor Not a pure module */
