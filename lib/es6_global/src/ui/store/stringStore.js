'use strict';


function stringReduce(state, action) {
  if (action !== 0) {
    return state + "b";
  } else {
    return state + "a";
  }
}

export {
  stringReduce ,
  
}
/* No side effect */
