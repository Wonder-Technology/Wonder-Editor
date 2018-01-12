'use strict';

import * as AppStore$WonderEditor     from "../../ui/store/AppStore.js";
import * as Reductive$WonderEditor    from "../Reductive.js";
import * as HistoryStore$WonderEditor from "./HistoryStore.js";

var store = Reductive$WonderEditor.Store[/* create */0](AppStore$WonderEditor.appReducter, AppStore$WonderEditor.state, /* Some */[HistoryStore$WonderEditor.thunkedLoggedTimeTravelLogger], /* () */0);

export {
  store ,
  
}
/* store Not a pure module */
