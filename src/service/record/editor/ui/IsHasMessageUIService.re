open UIType;

let getIsHasMessage = uiRecord => uiRecord.isHasMessage;

let setIsHasMessage = (isHasMessage, uiRecord) => {
  ...uiRecord,
  isHasMessage,
};