let _isEmpty = msg => msg |> Js.String.length === 0;

let _isNotEmpty = msg => msg |> Js.String.length > 0;

let _buildMessage = (description, reason, solution, params) => {
  let message = "";

  let message =
    _isNotEmpty(description)
    && _isEmpty(reason)
    && _isEmpty(solution)
    && _isEmpty(params) ?
      message ++ description :
      {
        let message =
          _isNotEmpty(description) ?
            message ++ {j|description
    $description|j} : message;

        let message =
          _isNotEmpty(reason) ?
            message ++ {j|
    reason
    $reason|j} : message;

        let message =
          _isNotEmpty(solution) ?
            message ++ {j|
    solution
    $solution|j} : message;
        let message =
          _isNotEmpty(params) ?
            message ++ {j|
    params
    $params|j} : message;

        message;
      };

  message;
};

let buildFatalMessage = (~description, ~reason, ~solution, ~params) =>
  _buildMessage(description, reason, solution, params);

let buildErrorMessage = (~description, ~reason, ~solution, ~params) =>
  _buildMessage(description, reason, solution, params);

let buildDebugMessage = (~description, ~params, ()) => {
  let message = "";

  let message =
    _isNotEmpty(description) && _isEmpty(params) ?
      message ++ description :
      {
        let message =
          _isNotEmpty(description) ?
            message ++ {j|description
    $description|j} : message;

        let message =
          _isNotEmpty(params) ?
            message ++ {j|
    params
    $params|j} : message;

        message;
      };

  message;
};

let _stringify = msg => Js.Json.stringify(msg |> Obj.magic) |> Obj.magic;

let print = msg => {
  msg |> _stringify |> WonderLog.Log.print |> ignore;

  msg;
};

let printJson = json => WonderLog.Log.printJson(json);

let info = msg => msg |> _stringify |> WonderLog.Log.info;

let warn = (msg: string) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|msg be string|j},
                ~actual={j|not|j},
              ),
              () =>
              TypeUtils.isString(msg) |> assertTrue
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );

  msg |> WonderLog.Log.warn;
};

let logStr = str => str |> WonderLog.Log.log;

let log = msg => msg |> _stringify |> WonderLog.Log.log;

let logVar = msg => msg |> _stringify |> WonderLog.Log.logVar;

let logJson = json => json |> WonderLog.Log.logJson;

let debug = WonderLog.Log.debug;

let error = WonderLog.Log.error;

let fatal = WonderLog.Log.fatal;