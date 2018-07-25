

import * as HashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";

function getEditEngineComponent(type_, diffMap) {
  switch (type_) {
    case 0 : 
        return HashMapService$WonderCommonlib.unsafeGet("gameObject", diffMap);
    case 1 : 
        return HashMapService$WonderCommonlib.unsafeGet("transform", diffMap);
    case 2 : 
        return HashMapService$WonderCommonlib.unsafeGet("meshRenderer", diffMap);
    case 3 : 
        return HashMapService$WonderCommonlib.unsafeGet("basicMaterial", diffMap);
    case 4 : 
        return HashMapService$WonderCommonlib.unsafeGet("lightMaterial", diffMap);
    case 5 : 
        return HashMapService$WonderCommonlib.unsafeGet("directionLight", diffMap);
    case 6 : 
        return HashMapService$WonderCommonlib.unsafeGet("texture", diffMap);
    
  }
}

export {
  getEditEngineComponent ,
  
}
/* HashMapService-WonderCommonlib Not a pure module */
