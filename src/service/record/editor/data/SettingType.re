type debug = {
  isDebug: bool,
  showMessage: bool,
};

type redoUndo = {maxStackSize: int};

type hotKeys = {
  redo: array(string),
  undo: array(string),
  duplicate: array(string),
  delete: array(string),
};

type settingRecord = {
  debug: option(debug),
  redoUndo: option(redoUndo),
  hotKeys: option(hotKeys),
};