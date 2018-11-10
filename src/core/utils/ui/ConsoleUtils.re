let warn = (message, editorState) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##warn(message, 4))
    |> ignore;

  WonderLog.Log.warn(message);
};

let log = (message, editorState) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##log(message, 4))
    |> ignore;

  WonderLog.Log.log(message);
};

let info = (message, editorState) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##info(message, 4))
    |> ignore;

  WonderLog.Log.info(message);
};

let error = (message, editorState) => {
  DebugSettingEditorService.isNotShowMessage(editorState) ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##error(message, 4))
    |> ignore;

  WonderLog.Log.error(message);
};