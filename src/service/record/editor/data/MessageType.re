type messageType =
  | Log
  | Warn;

type message = {
  id: int,
  type_: messageType,
  info: string,
};