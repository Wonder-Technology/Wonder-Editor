open ImageType;

type context;

external convertCanvasToJsObj: Dom.element => Js.t({..}) = "%identity";

external convertContextToJsObj: context => Js.t({..}) = "%identity";

let getCanvasContext: Dom.element => context = [%raw
  canvas => {j|
    return canvas.getContext("2d");
    |j}
];
