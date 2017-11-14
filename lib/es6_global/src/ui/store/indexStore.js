'use strict';

import * as AppStore$WonderEditor     from "./appStore.js";
import * as Reductive$WonderEditor    from "../utils/reductive.js";
import * as HistoryStore$WonderEditor from "./historyStore.js";

var store = Reductive$WonderEditor.Store[/* create */0](AppStore$WonderEditor.appReducter, AppStore$WonderEditor.state, /* Some */[HistoryStore$WonderEditor.thunkedLoggedTimeTravelLogger], /* () */0);

export {
  store ,
  
}
/* store Not a pure module */
