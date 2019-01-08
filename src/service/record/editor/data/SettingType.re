type debug = {
  isDebug: bool,
  showMessage: bool,
};

type redoUndo = {maxStackSize: int};

type settingRecord = {
  debug: option(debug),
  redoUndo: option(redoUndo),
};