/* open StateDataMainType;

   let setLastXY = HandleMouseEventMainService.setLastXY;

   let getIsDrag = HandleMouseEventMainService.getIsDrag;

   let setIsDrag = HandleMouseEventMainService.setIsDrag;

    */

let buildMouseDomEvent =
    (
      ~pageX=10,
      ~pageY=20,
      ~which=1,
      ~movementX=1,
      ~movementY=2,
      ~detail=Js.Nullable.undefined,
      ~wheelDelta=Js.Nullable.undefined,
      ~preventDefaultFunc=(.) => (),
      ~stopPropagationFunc=(.) => (),
      ~target={"tagName": "CANVAS"},
      (),
    ) => {
  "pageX": pageX,
  "pageY": pageY,
  "which": which,
  "movementX": Js.Nullable.return(movementX),
  "movementY": Js.Nullable.return(movementY),
  "webkitMovementX": Js.Nullable.return(movementX),
  "mozMovementX": Js.Nullable.return(movementX),
  "webkitMovementY": Js.Nullable.return(movementY),
  "mozMovementY": Js.Nullable.return(movementY),
  "detail": detail,
  "wheelDelta": wheelDelta,
  "preventDefault": preventDefaultFunc,
  "stopPropagation": stopPropagationFunc,
  "target": target,
};

let buildMouseEvent =
    (
      ~eventName=EventType.Click
                 |> EventType.editorDomEventNameToEngineDomEventName,
      ~location=(0, 0),
      ~locationInView=(0, 0),
      ~button=Wonderjs.EventType.Left,
      ~wheel=0,
      ~movementDelta=(1, 2),
      ~event=buildMouseDomEvent() |> Obj.magic,
      (),
    )
    : EventType.mouseEvent => {
  name: eventName,
  location,
  locationInView,
  button,
  wheel,
  movementDelta,
  event,
};

let setPointerLocked = [%raw
  param => {|
 document.pointerLockElement = {};
  |}
];

let setNotPointerLocked = [%raw
  param => {|
 document.pointerLockElement = undefined;
  |}
];

let prepareWithState =
    (
      ~sandbox,
      ~engineState,
      ~canvasWidth=0,
      ~canvasHeight=0,
      ~offsetLeft=1,
      ~offsetTop=2,
      ~offsetParent=Js.Nullable.undefined,
      ~setBrowserFunc=BrowserDetectToolEngine.setChrome,
      ~setEngineFunc=StateEngineService.setState,
      (),
    ) => {
  let canvasDom =
    EventTool.buildFakeCanvasWithSize(
      canvasWidth,
      canvasHeight,
      (offsetLeft, offsetTop, offsetParent),
    );

  let engineState =
    ViewToolEngine.setCanvas(canvasDom |> Obj.magic, engineState)
    |> FakeGlToolEngine.setFakeGl(FakeGlToolEngine.buildFakeGl(~sandbox, ()));

  setEngineFunc(engineState) |> ignore;

  setBrowserFunc();
};

let prepareForPointerLock =
    (~sandbox, ~unsafeGetStateFunc=StateEngineService.unsafeGetState, ()) => {
  open Sinon;

  let canvas =
    ViewEngineService.unsafeGetCanvas(unsafeGetStateFunc()) |> Obj.magic;
  let requestPointerLockStub = createEmptyStubWithJsObjSandbox(sandbox);
  canvas##requestPointerLock #= requestPointerLockStub;

  requestPointerLockStub;
};