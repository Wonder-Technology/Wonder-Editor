open AllStateDataType;

let clearAllState = () =>
  AllStateData.setHistoryState(AllStateData.createHistoryState());