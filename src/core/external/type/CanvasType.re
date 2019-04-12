open ImageType;

type context = {
  .
  "drawImage":
    (Dom.element, float, float, float, float, float, float, float, float) =>
    unit,
};

type canvas = {
  .
  "width": float,
  "height": float,
  "getContext": unit => context,
  "toDataURL": unit => string,
};

external convertDomEleToCanvas: Dom.element => canvas = "%identity";

let getCanvasContext: Dom.element => context = [%raw
  canvas => {j|
    return canvas.getContext("2d");
    |j}
];