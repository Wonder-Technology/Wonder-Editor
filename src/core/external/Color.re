/* TODO external all: extract type file.(move type, external cast type there) */

type colorPickRgbType = {
  r: int,
  g: int,
  b: int,
};

type colorPickType = {
  hex: string,
  rgb: colorPickRgbType,
};

type colorPickJsObjType = {
  .
  hex: string,
  rgb: {
    .
    r: int,
    g: int,
    b: int,
  },
};

let convertColorObjToColorPickRgbType = rgbObj => {
  r: rgbObj##r,
  g: rgbObj##g,
  b: rgbObj##b,
};
let convertColorObjToColorPickType = colorObj => {

  hex: colorObj##hex,
  rgb: convertColorObjToColorPickRgbType(colorObj##rgb),
};

let getHex = [%bs.raw
  (r, g, b) => "return (r * 255) << 16^(g * 255) << 8^(b * 255) << 0;"
];

let getHexString = [%bs.raw
  arr => "return '#' + ( '000000' + getHex(arr[0],arr[1],arr[2]).toString( 16 ) ).slice( - 6 )"
];

let getEngineColorRgbArr = ({hex, rgb}) => [|
  (rgb.r |> float_of_int) /. 255.,
  (rgb.g |> float_of_int) /. 255.,
  (rgb.b |> float_of_int) /. 255.,
|];