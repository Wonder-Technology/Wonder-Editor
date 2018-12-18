


function getEventTarget(editorState) {
  return editorState[/* eventRecord */5][/* eventTarget */0];
}

function setEventTarget(eventTarget, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord : record */[/* eventTarget */eventTarget],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function getPointDownEventName(param) {
  return "wd_editor_pointdown";
}

function getPointUpEventName(param) {
  return "wd_editor_pointup";
}

function getPointTapEventName(param) {
  return "wd_editor_pointtap";
}

function getPointMoveEventName(param) {
  return "wd_editor_pointmove";
}

function getPointScaleEventName(param) {
  return "wd_editor_pointscale";
}

function getPointDragEventName(param) {
  return "wd_editor_pointdrag";
}

function getRefreshInspectorEventName(param) {
  return "wd_editor_refresh_inspector";
}

export {
  getEventTarget ,
  setEventTarget ,
  getPointDownEventName ,
  getPointUpEventName ,
  getPointTapEventName ,
  getPointMoveEventName ,
  getPointScaleEventName ,
  getPointDragEventName ,
  getRefreshInspectorEventName ,
  
}
/* No side effect */
