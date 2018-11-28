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
    (messageObj => messageObj##warn(message, 4), WonderLog.Log.warn),
  );

let log = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##log(message, 4), WonderLog.Log.log),
  );

let info = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##info(message, 4), WonderLog.Log.info),
  );

let debug = (buildMessageFunc, isDebug, editorState) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##info(buildMessageFunc(), 4))
    |> ignore;

  WonderLog.Log.debug(buildMessageFunc, isDebug);
};

let error = (message, editorState) =>
  _console(
    message,
    editorState,
    (messageObj => messageObj##error(message, 4), WonderLog.Log.error),
  );

let logStack = stack => WonderLog.Log.log(stack);