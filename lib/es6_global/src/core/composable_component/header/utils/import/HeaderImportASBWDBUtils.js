

import * as WDBAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/WDBAssetLogicService.js";

function importWDB(param, param$1, param$2) {
  return WDBAssetLogicService$WonderEditor.importAssetWDB(/* tuple */[
              param[0],
              param[1]
            ], /* tuple */[
              param$1[0],
              param$1[1]
            ], false, /* tuple */[
              param$2[0],
              param$2[1]
            ]);
}

export {
  importWDB ,
  
}
/* WDBAssetLogicService-WonderEditor Not a pure module */
