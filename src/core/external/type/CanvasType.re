open ImageType;

type context;
/* TODO move to canvasTool */

external convertDomEleToCanvas: Dom.element => Js.t({..}) = "%identity";

external convertContextToJsObj: context => Js.t({..}) = "%identity";

let getCanvasContext: Dom.element => context = [%raw
  canvas => {j|
    return canvas.getContext("2d");
    |j}
];

let drawImage:
  (
    context,
    Dom.element,
    float,
    float,
    float,
    float,
    float,
    float,
    float,
    float
  ) =>
  unit = [%raw
  (
    canvasContext,
    canvasDom,
    clipBegin,
    clipEnd,
    clipWidth,
    clipHeight,
    snapshotBegin,
    snapshotEnd,
    snapshotWidth,
    snapshotHeight,
  ) => {j|
       canvasContext.drawImage(canvasDom, clipBegin, clipEnd, clipWidth, clipHeight, snapshotBegin, snapshotEnd, snapshotWidth, snapshotHeight);
     |j}
];

let clearRect: (context, Dom.element) => context = [%raw
  (canvasContext, canvasDom) => {j|
  canvasContext.clearRect(0, 0, canvasDom.width, canvasDom.height);

  return canvasContext;
     |j}
];

let toDataURL: Dom.element => string = [%raw
  canvasDom => {j|
    return canvasDom.toDataURL();
  |j}
];