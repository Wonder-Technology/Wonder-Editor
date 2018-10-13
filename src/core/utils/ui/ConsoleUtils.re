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

let info = message => {
  let root = RootUtils.getRoot();

  root##isTestConsole ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##info(message, 4))
    |> ignore;

  WonderLog.Log.info(message);
};

let error = message => {
  let root = RootUtils.getRoot();

  root##isTestConsole ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##error(message, 4))
    |> ignore;

  WonderLog.Log.error(message);
};

let success = message => {
  let root = RootUtils.getRoot();

  root##isTestConsole ?
    () :
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##success(message, 4))
    |> ignore;

  WonderLog.Log.log(message);
};