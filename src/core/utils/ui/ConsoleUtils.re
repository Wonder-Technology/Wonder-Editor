let _console = (message, editorState, (messageConsoleFunc, logConsoleFunc)) => {
    editorState
    |> messageConsoleFunc(message, 6000)
    |> StateEditorService.setState
    |> ignore;

  logConsoleFunc(message);
};

let warn = (message, editorState) =>
  _console(
    message,
    editorState,
    (MessageUIEditorService.warn, LogUtils.warn),
  );

let log = (message, editorState) =>
  _console(message, editorState, (MessageUIEditorService.log, LogUtils.log));

let info = (message, editorState) =>
  _console(
    message,
    editorState,
    (MessageUIEditorService.info, LogUtils.info),
  );

let debug = (buildMessageFunc, isDebug, editorState) =>
  /* DebugSettingEditorService.isNotShowMessage(editorState) ?
     () :
     Antd.Message.message
     |> Antd.Message.convertToJsObj
     |> (messageObj => messageObj##info(buildMessageFunc(), 4))
     |> ignore; */
  LogUtils.debug(buildMessageFunc, isDebug);

let error = (message, editorState) =>
  _console(
    message,
    editorState,
    (MessageUIEditorService.error, LogUtils.error),
  );

let logStack = stack => LogUtils.logStr(stack);