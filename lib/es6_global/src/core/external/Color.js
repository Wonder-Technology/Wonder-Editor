

import * as ColorService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/ColorService.js";

var getHex = function (r,g,b){return (r * 255) << 16^(g * 255) << 8^(b * 255) << 0;};

var getHexString = function (arr){return '#' + ( '000000' + getHex(arr[0],arr[1],arr[2]).toString( 16 ) ).slice( - 6 )};

function getEngineColorRgbArr(param) {
  var rgb = param[/* rgb */1];
  return /* array */[
          rgb[/* r */0] / 255,
          rgb[/* g */1] / 255,
          rgb[/* b */2] / 255
        ];
}

function convert16HexToRGBArr(hexStr) {
  var match = ColorService$Wonderjs.convert16HexToRGBA(hexStr);
  return /* array */[
          match[0],
          match[1],
          match[2]
        ];
}

export {
  getHex ,
  getHexString ,
  getEngineColorRgbArr ,
  convert16HexToRGBArr ,
  
}
/* ColorService-Wonderjs Not a pure module */
