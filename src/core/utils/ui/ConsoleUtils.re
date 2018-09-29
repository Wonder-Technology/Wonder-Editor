let warn = message => {
  let root = RootUtils.getRoot();

  root##isTestConsole ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##warn(message, 4))
    |> ignore;

  WonderLog.Log.warn(message);
};