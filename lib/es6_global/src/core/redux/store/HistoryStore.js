

import * as Middleware$WonderEditor from "../Middleware.js";

function thunkedLoggedTimeTravelLogger(store, next) {
  return (function (param) {
      return Middleware$WonderEditor.thunk(store, (function (param) {
                    return Middleware$WonderEditor.logger(store, next, param);
                  }), param);
    });
}

export {
  thunkedLoggedTimeTravelLogger ,
  
}
/* No side effect */
