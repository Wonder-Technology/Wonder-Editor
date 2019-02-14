


function getEventTarget(editorState) {
  return editorState[/* eventRecord */5][/* eventTarget */0];
}

function setEventTarget(eventTarget, editorState) {
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord */editorState[/* assetRecord */2],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord : record */[/* eventTarget */eventTarget],
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

function getPointDownEventName() {
  return "wd_editor_pointdown";
}

function getPointUpEventName() {
  return "wd_editor_pointup";
}

function getPointTapEventName() {
  return "wd_editor_pointtap";
}

function getPointMoveEventName() {
  return "wd_editor_pointmove";
}

function getPointScaleEventName() {
  return "wd_editor_pointscale";
}

function getPointDragEventName() {
  return "wd_editor_pointdrag";
}

function getRefreshInspectorEventName() {
  return "wd_editor_refresh_inspector";
}

function getPickSuccessEventName() {
  return "wd_editor_pick_success";
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
  getPickSuccessEventName ,
  
}
/* No side effect */
