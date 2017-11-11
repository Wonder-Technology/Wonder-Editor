'use strict';


function stringReducer(state, action) {
  if (action !== 0) {
    return /* record */[
            /* text */state[/* text */0] + "b",
            /* age */state[/* age */1]
          ];
  } else {
    return /* record */[
            /* text */state[/* text */0] + "a",
            /* age */state[/* age */1]
          ];
  }
}

export {
  stringReducer ,
  
}
/* No side effect */
