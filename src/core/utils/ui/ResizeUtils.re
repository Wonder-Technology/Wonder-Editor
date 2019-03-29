/* let computeCanvasSize = ((_,_, sceneViewWidth, sceneViewHeight), (_,_, gameViewWidth, gameViewHeight) ) => {
       WonderLog.Contract.requireCheck (() => {
       open WonderLog;
       open Contract;
       open Operators;

       test
       (Log.buildAssertMessage(~expect={j|sceneViewHeight === gameViewHeight|j}, ~actual={j|not|j}),
       (
       () => {
           sceneViewHeight == gameViewHeight

       })
       );
       }, StateEditorService.getStateIsDebug());

       (
           sceneViewWidth,
       )
   }; */

let _getCanvasParentSize = parent => (
  parent##offsetWidth,
  parent##offsetHeight,
);

let getCanvasParentSize = canvasParentDom =>
  canvasParentDom
  |> DomHelperType.convertDomElementToJsObj
  |> _getCanvasParentSize;

let getCanvasSize = () => {
  let canvas =
    DomHelper.getElementById("canvas")
    |> DomHelperType.convertDomElementToJsObj;

  (canvas##width, canvas##height);
};

let resizeCanvas = (canvasDom, (width, height)) =>
  canvasDom
  |> DomHelperType.convertDomElementToJsObj
  |> ScreenEngineService.setScreenSize((width, height, width, height))
  |> ignore;

let resizeViewport = ((width, height), engineState) =>
  engineState
  |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjectionsDirty
  |> DeviceManagerEngineService.setViewport((0, 0, width, height));

/*
 let resizeViewport2 = ((width, height), engineState) =>
   engineState
   |> PerspectiveCameraProjectionEngineService.markAllPerspectiveCameraProjectionsDirty
   |> DeviceManagerEngineService.setViewport((0, 0, width, height)); */

let updateViewRect = ((canvasWidth, canvasHeight), editorState) =>
  editorState
  |> SceneViewEditorService.updateViewRect((
       0,
       0,
       canvasWidth / 2,
       canvasHeight,
     ))
  |> GameViewEditorService.updateViewRect((
       canvasWidth / 2,
       0,
       canvasWidth / 2,
       canvasHeight,
     ));

let isSizeEqual = (size1, size2) => size1 >= size2 - 1 && size1 <= size2 + 1;

let getViewWidth = (sceneViewWidth, gameViewWidth) =>
  sceneViewWidth + gameViewWidth;

let getViewHeight = (sceneViewHeight, gameViewHeight) => {
  WonderLog.Contract.requireCheck(
    () =>
      WonderLog.(
        Contract.(
          Operators.(
            test(
              Log.buildAssertMessage(
                ~expect={j|sceneViewHeight == gameViewHeight|j},
                ~actual={j|not|j},
              ),
              () =>
              sceneViewHeight == gameViewHeight
            )
          )
        )
      ),
    StateEditorService.getStateIsDebug(),
  );
  sceneViewHeight;
};

let isViewSizeChange =
    (
      (_, _, sceneViewWidth, sceneViewHeight),
      (_, _, gameViewWidth, gameViewHeight),
      (canvasWidth, canvasHeight),
    ) =>
  !isSizeEqual(getViewWidth(sceneViewWidth, gameViewWidth), canvasWidth)
  || !
       isSizeEqual(
         getViewHeight(sceneViewHeight, gameViewHeight),
         canvasHeight,
       );

let resizeScreen = () => {
  let engineState = StateEngineService.unsafeGetState();
  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();

  let canvasParentSize =
    DomHelper.getElementById("canvasParent") |> getCanvasParentSize;
  let inspectorCanvasParentSize =
    DomHelper.getElementById("inspectorCanvasParent") |> getCanvasParentSize;

  canvasParentSize |> resizeCanvas(DomHelper.getElementById("canvas"));

  inspectorCanvasParentSize
  |> resizeCanvas(DomHelper.getElementById("inspector-canvas"));

  engineState |> DeviceManagerEngineService.getGl |> Js.Option.isSome ?
    {
      updateViewRect(canvasParentSize)
      |> StateLogicService.getAndSetEditorState;

      engineState
      |> resizeViewport(canvasParentSize)
      |> StateLogicService.refreshEngineState
      |> ignore;
    } :
    ();

  inspectorEngineState |> DeviceManagerEngineService.getGl |> Js.Option.isSome ?
    inspectorEngineState
    |> resizeViewport(inspectorCanvasParentSize)
    |> DirectorEngineService.loopBody(0.)
    |> StateInspectorEngineService.setState
    |> ignore :
    ();
};