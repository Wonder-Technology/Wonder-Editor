type debug = {
  isDebug: bool,
  showMessage: bool,
};

type redoUndo = {maxStackSize: int};

type hotKey = {
  name: string,
  values: array(string),
};

type settingRecord = {
  debug: option(debug),
  redoUndo: option(redoUndo),
  hotKeys: array(hotKey),
};