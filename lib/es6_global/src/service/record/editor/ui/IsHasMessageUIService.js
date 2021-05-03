


function getIsHasMessage(uiRecord) {
  return uiRecord[/* isHasMessage */2];
}

function setIsHasMessage(isHasMessage, uiRecord) {
  return /* record */[
          /* messageIndex */uiRecord[/* messageIndex */0],
          /* intervalId */uiRecord[/* intervalId */1],
          /* isHasMessage */isHasMessage,
          /* messageArray */uiRecord[/* messageArray */3]
        ];
}

export {
  getIsHasMessage ,
  setIsHasMessage ,
  
}
/* No side effect */
