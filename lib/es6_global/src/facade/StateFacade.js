'use strict';

import * as StateCompositeService$WonderEditor from "../service/logic_service/composite/StateCompositeService.js";

var prepareState = StateCompositeService$WonderEditor.prepareState;

var finishState = StateCompositeService$WonderEditor.finishState;

var getState = StateCompositeService$WonderEditor.getState;

var setState = StateCompositeService$WonderEditor.setState;

var getAndSetState = StateCompositeService$WonderEditor.getAndSetState;

export {
  prepareState   ,
  finishState    ,
  getState       ,
  setState       ,
  getAndSetState ,
  
}
/* StateCompositeService-WonderEditor Not a pure module */
