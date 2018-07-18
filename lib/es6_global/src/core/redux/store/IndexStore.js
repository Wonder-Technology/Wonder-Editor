

import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as Reductive$WonderEditor from "../Reductive.js";
import * as Middleware$WonderEditor from "../Middleware.js";

function thunkedLoggedTimeTravelLogger(store, next) {
  return (function (param) {
      return Middleware$WonderEditor.thunk(store, (function (param) {
                    return Middleware$WonderEditor.logger(store, next, param);
                  }), param);
    });
}

var store = Reductive$WonderEditor.Store[/* create */0](AppStore$WonderEditor.appReducter, AppStore$WonderEditor.state, /* Some */[thunkedLoggedTimeTravelLogger], /* () */0);

export {
  thunkedLoggedTimeTravelLogger ,
  store ,
  
}
/* store Not a pure module */
