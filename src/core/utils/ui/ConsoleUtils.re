let _console = (message, editorState, (messageConsoleFunc, logConsoleFunc)) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> messageConsoleFunc
    |> ignore;

  logConsoleFunc(message);
};

let warn = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##warn(message, 4), LogUtils.warn),
  );

let log = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##log(message, 4), LogUtils.log),
  );

let info = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##info(message, 4), LogUtils.info),
  );

let debug = (buildMessageFunc, isDebug, editorState) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##info(buildMessageFunc(), 4))
    |> ignore;

  LogUtils.debug(buildMessageFunc, isDebug);
};

let error = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##error(message, 4), LogUtils.error),
  );

let logStack = stack => LogUtils.logStr(stack);