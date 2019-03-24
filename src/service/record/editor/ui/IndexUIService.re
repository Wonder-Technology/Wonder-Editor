open UIType;

let getMessageIndex = uiRecord => uiRecord.messageIndex;

let setMessageIndex = (messageIndex, uiRecord) => {
  ...uiRecord,
  messageIndex,
};
