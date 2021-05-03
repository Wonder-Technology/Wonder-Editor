


function generateMessageId(messageIndex) {
  return /* tuple */[
          messageIndex + 1 | 0,
          messageIndex + 1 | 0
        ];
}

export {
  generateMessageId ,
  
}
/* No side effect */
