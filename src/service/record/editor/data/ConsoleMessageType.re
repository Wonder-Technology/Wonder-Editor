type consoleType =
  | Error
  | Info
  | Warn
  | Trace
  | Log;

type consoleMessageType = {
  message: string,
  consoleType,
  traceInfo:option(string)
};