'use strict';


var editorState = /* record */[/* sceneData : record */[
    /* scene : None */0,
    /* currentGameObject : None */0
  ]];

var stateData = /* record */[
  /* state */editorState,
  /* isDebug : true */1
];

function getStateIsDebug() {
  return stateData[/* isDebug */1];
}

export {
  editorState     ,
  stateData       ,
  getStateIsDebug ,
  
}
/* No side effect */
