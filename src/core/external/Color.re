open Wonderjs;

open ColorType;

let getHex = [%raw
  (r, g, b) => "return (r * 255) << 16^(g * 255) << 8^(b * 255) << 0;"
];

let getHexString = [%raw
  arr => "return '#' + ( '000000' + getHex(arr[0],arr[1],arr[2]).toString( 16 ) ).slice( - 6 )"
];

let _convertToEngineColorRgbArr = rgb => [|
  (rgb.r |> float_of_int) /. 255.,
  (rgb.g |> float_of_int) /. 255.,
  (rgb.b |> float_of_int) /. 255.,
|];

let getEngineColorRgbArr = ({hex, rgb}) =>
  rgb |> _convertToEngineColorRgbArr;

let convert16HexToRGBArr = (hexStr: string) => {
  let (r, g, b, _a) = ColorService.convert16HexToRGBA(hexStr);

  [|r, g, b|];
};

let convertColorObjToRGBArr = (colorObj: colorPickJsObjType) =>
  convertColorObjToColorPickRgbType(colorObj##rgb)
  |> _convertToEngineColorRgbArr;