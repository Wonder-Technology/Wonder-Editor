

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";
import * as IsShowChildrenSceneTreeService$WonderEditor from "../../../record/editor/sceneTree/IsShowChildrenSceneTreeService.js";
import * as CurrentSceneTreeNodeSceneTreeService$WonderEditor from "../../../record/editor/sceneTree/CurrentSceneTreeNodeSceneTreeService.js";

function unsafeGetCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneTreeService$WonderEditor.unsafeGetCurrentSceneTreeNode(editorState[/* sceneTreeRecord */1]);
}

function getCurrentSceneTreeNode(editorState) {
  return CurrentSceneTreeNodeSceneTreeService$WonderEditor.getCurrentSceneTreeNode(editorState[/* sceneTreeRecord */1]);
}

function setCurrentSceneTreeNode(gameObject, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */CurrentSceneTreeNodeSceneTreeService$WonderEditor.setCurrentSceneTreeNode(gameObject, editorState[/* sceneTreeRecord */1]),
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function hasCurrentSceneTreeNode(editorState) {
  return Js_option.isSome(CurrentSceneTreeNodeSceneTreeService$WonderEditor.getCurrentSceneTreeNode(editorState[/* sceneTreeRecord */1]));
}

function clearCurrentSceneTreeNode(editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */CurrentSceneTreeNodeSceneTreeService$WonderEditor.clearCurrentSceneTreeNode(editorState[/* sceneTreeRecord */1]),
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function getIsShowChildrenMap(param) {
  return IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(param[/* sceneTreeRecord */1]);
}

function getDefaultIsShowChildren(param) {
  return false;
}

function getIsShowChildern(gameObject, sceneGameObject, param) {
  var match = gameObject === sceneGameObject;
  if (match) {
    return true;
  } else {
    var match$1 = ImmutableSparseMapService$WonderCommonlib.get(gameObject, IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(param[/* sceneTreeRecord */1]));
    if (match$1 !== undefined) {
      return match$1;
    } else {
      return false;
    }
  }
}

function setIsShowChildren(gameObject, isShowChildren, editorState) {
  var sceneTreeRecord = editorState[/* sceneTreeRecord */1];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord : record */[
            /* currentSceneTreeNode */sceneTreeRecord[/* currentSceneTreeNode */0],
            /* isShowChildrenMap */ImmutableSparseMapService$WonderCommonlib.set(gameObject, isShowChildren, IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(sceneTreeRecord))
          ],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
        ];
}

function removeIsShowChildren(gameObject, editorState) {
  var sceneTreeRecord = editorState[/* sceneTreeRecord */1];
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord : record */[
            /* currentSceneTreeNode */sceneTreeRecord[/* currentSceneTreeNode */0],
            /* isShowChildrenMap */ImmutableSparseMapService$WonderCommonlib.deleteVal(gameObject, IsShowChildrenSceneTreeService$WonderEditor.getIsShowChildrenMap(sceneTreeRecord))
          ],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13]
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
