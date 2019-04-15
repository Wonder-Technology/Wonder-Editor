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
<<<<<<< HEAD
  isActive: bool,
=======
  mutable isActive: bool,
>>>>>>> origin/mickey
};