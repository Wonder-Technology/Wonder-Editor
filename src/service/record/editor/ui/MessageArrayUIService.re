open UIType;

let getMessageArray = uiRecord => uiRecord.messageArray;

let setMessageArray = (messageArray, uiRecord) => {
  ...uiRecord,
  messageArray,
};

let addMessage = (message, uiRecord) => {
  ...uiRecord,
  messageArray: uiRecord.messageArray |> ArrayService.push(message),
};

let removeMessage = (message, uiRecord) => {
  ...uiRecord,
  messageArray:
    uiRecord.messageArray |> Js.Array.filter(item => item != message),
};