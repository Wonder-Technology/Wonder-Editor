


function convertColorObjToColorPickRgbType(rgbObj) {
  return /* record */[
          /* r */rgbObj.r,
          /* g */rgbObj.g,
          /* b */rgbObj.b
        ];
}

function convertColorObjToColorPickType(colorObj) {
  return /* record */[
          /* hex */colorObj.hex,
          /* rgb */convertColorObjToColorPickRgbType(colorObj.rgb)
        ];
}

export {
  convertColorObjToColorPickRgbType ,
  convertColorObjToColorPickType ,
  
}
/* No side effect */
