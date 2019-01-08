type consoleType =
  | Error
  | Info
  | Warn
  | Debug
  | Trace
  | Log;

type consoleMessageType = {
  message: string,
  consoleType,
  traceInfo:option(string)
};