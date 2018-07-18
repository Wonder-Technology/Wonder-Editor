


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

export {
  getHex ,
  getHexString ,
  getEngineColorRgbArr ,
  
}
/* No side effect */
