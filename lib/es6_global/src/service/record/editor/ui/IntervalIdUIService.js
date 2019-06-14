


function getIntervalId(uiRecord) {
  return uiRecord[/* intervalId */1];
}

function setIntervalId(intervalId, uiRecord) {
  return /* record */[
          /* messageIndex */uiRecord[/* messageIndex */0],
          /* intervalId */intervalId,
          /* isHasMessage */uiRecord[/* isHasMessage */2],
          /* messageArray */uiRecord[/* messageArray */3]
        ];
}

export {
  getIntervalId ,
  setIntervalId ,
  
}
/* No side effect */
