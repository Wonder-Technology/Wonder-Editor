/* open StateDataMainType;

   let setLastXY = HandleMouseEventMainService.setLastXY;

   let getIsDrag = HandleMouseEventMainService.getIsDrag;

   let setIsDrag = HandleMouseEventMainService.setIsDrag;

    */

let buildMouseEvent =
    (
      ~pageX=10,
      ~pageY=20,
      ~button=0,
      ~movementX=1,
      ~movementY=2,
      ~detail=Js.Nullable.undefined,
      ~wheelDelta=Js.Nullable.undefined,
      ~preventDefaultFunc=() => (),
      ~stopPropagationFunc=() => (),
      (),
    ) => {
  "pageX": pageX,
  "pageY": pageY,
  "button": button,
  "movementX": movementX,
  "movementY": movementY,
  "detail": detail,
  "wheelDelta": wheelDelta,
  "preventDefault": preventDefaultFunc,
  "stopPropagation": stopPropagationFunc,
};

let setPointerLocked = [%raw () => {|
 document.pointerLockElement = {};
  |}];

let setNotPointerLocked = [%raw
  () => {|
 document.pointerLockElement = undefined;
  |}
];

let prepareWithState =
    (
      ~sandbox,
      ~engineState,
      ~offsetLeft=1,
      ~offsetTop=2,
      ~offsetParent=Js.Nullable.undefined,
      ~setBrowserFunc=BrowserDetectToolEngine.setChrome,
      (),
    ) => {
  let canvasDom =
    EventTool.buildFakeCanvas((offsetLeft, offsetTop, offsetParent));

  let engineState =
    ViewToolEngine.setCanvas(canvasDom |> Obj.magic, engineState);

  StateEngineService.setState(engineState) |> ignore;

  setBrowserFunc();
};

/*

 let prepareForPointerLock = (sandbox, engineState) => {
   open Sinon;

   let canvas = ViewTool.unsafeGetCanvas(engineState) |> Obj.magic;
   let requestPointerLockStub = createEmptyStubWithJsObjSandbox(sandbox);
   canvas##requestPointerLock#=requestPointerLockStub;

   (engineState, requestPointerLockStub);
 }; */