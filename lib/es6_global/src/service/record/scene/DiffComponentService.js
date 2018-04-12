'use strict';

import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function getEditEngineComponent(type_, diffMap) {
  switch (type_) {
    case 0 : 
        return HashMapService$WonderCommonlib.unsafeGet("gameObject", diffMap);
    case 1 : 
        return HashMapService$WonderCommonlib.unsafeGet("transform", diffMap);
    case 2 : 
        return HashMapService$WonderCommonlib.unsafeGet("material", diffMap);
    
  }
}

export {
  getEditEngineComponent ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
