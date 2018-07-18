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