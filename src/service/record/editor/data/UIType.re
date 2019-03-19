open MessageType;

type uiRecord = {
  messageIndex: int,
  intervalId: int,
  isHasMessage: bool,
  messageArray: array(message),
};