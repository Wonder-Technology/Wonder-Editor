'use strict';


function getState(data) {
  return data[/* state */0];
}

function setState(data, state) {
  data[/* state */0] = state;
  return state;
}

export {
  getState ,
  setState ,
  
}
/* No side effect */
