

import * as WDBAssetLogicService$WonderEditor from "../../../../../service/stateTuple/logic/asset/WDBAssetLogicService.js";

function importWDB(param, param$1, param$2) {
  var partial_arg_000 = param[0];
  var partial_arg_001 = param[1];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001
  ];
  return WDBAssetLogicService$WonderEditor.importAssetWDB(/* tuple */[
              param[2],
              param[3]
            ], /* tuple */[
              param$1[0],
              param$1[1],
              false
            ], (function (param, param$1) {
                return WDBAssetLogicService$WonderEditor.createWDBNodeUseImageDataMapSnapshot(partial_arg, param, param$1);
              }), /* tuple */[
              param$2[0],
              param$2[1]
            ]);
}

export {
  importWDB ,
  
}
/* WDBAssetLogicService-WonderEditor Not a pure module */
