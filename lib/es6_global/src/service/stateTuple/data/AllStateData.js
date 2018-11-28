


function createHistoryState() {
  return /* record */[
          /* copiedRedoUndoStackRecord */undefined,
          /* uiRedoStack : [] */0,
          /* uiUndoStack : [] */0,
          /* editorRedoStack : [] */0,
          /* editorUndoStack : [] */0,
          /* engineRedoStack : [] */0,
          /* engineUndoStack : [] */0
        ];
}

var allStateData = /* record */[/* historyState : record */[
    /* copiedRedoUndoStackRecord */undefined,
    /* uiRedoStack : [] */0,
    /* uiUndoStack : [] */0,
    /* editorRedoStack : [] */0,
    /* editorUndoStack : [] */0,
    /* engineRedoStack : [] */0,
    /* engineUndoStack : [] */0
  ]];

function getHistoryState() {
  return allStateData[/* historyState */0];
}

function setHistoryState(state) {
  allStateData[/* historyState */0] = state;
  return /* () */0;
}

export {
  createHistoryState ,
  allStateData ,
  getHistoryState ,
  setHistoryState ,
  
}
/* No side effect */
