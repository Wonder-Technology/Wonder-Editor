


function getMessageIndex(uiRecord) {
  return uiRecord[/* messageIndex */0];
}

function setMessageIndex(messageIndex, uiRecord) {
  return /* record */[
          /* messageIndex */messageIndex,
          /* intervalId */uiRecord[/* intervalId */1],
          /* isHasMessage */uiRecord[/* isHasMessage */2],
          /* messageArray */uiRecord[/* messageArray */3]
        ];
}

export {
  getMessageIndex ,
  setMessageIndex ,
  
}
/* No side effect */
