type messageType =
  | Log
  | Info 
  | Error
  | Warn;

type message = {
  id: int,
  type_: messageType,
  info: string,
  time: int,
  isActive: bool,
};