'use strict';


function countReducer(state, action) {
  if (action !== 0) {
    return state - 1 | 0;
  } else {
    return state + 1 | 0;
  }
}

export {
  countReducer ,
  
}
/* No side effect */
