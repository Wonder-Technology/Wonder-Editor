open Js.Promise;

let _getLoadData = type_ => {
  let engineDataDir = "./src/engine/data/";
  switch (type_) {
  | "edit" =>
    AssetEngineService.loadToData(
      [|"./src/engine/setting/editSetting.json", engineDataDir|],
      EngineStateDataEditorService.getEditEngineStateData(),
    )
  | "run" =>
    AssetEngineService.loadToData(
      [|"./src/engine/setting/runSetting.json", engineDataDir|],
      EngineStateDataEditorService.getRunEngineStateData(),
    )
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="_getLoadData",
        ~description={j|the type_ is not find|j},
        ~reason="",
        ~solution={j|check the param|j},
        ~params={j|type:$type_|j},
      ),
    )
  };
};

let _buildSetStateFuncForEditEngineState = setEngineStateFunc =>
  (. state) => {
    let state =
      SceneEditorService.getIsRun |> StateLogicService.getEditorState ?
        state : state |> DirectorEngineService.loopBody(0.);

    state |> setEngineStateFunc;

    state;
  };

let _buildSetStateFuncForRunEngineState = setEngineStateFunc =>
  (. state) => {
    state |> setEngineStateFunc;

    state;
  };

let _setUnsafeGetStateFuncAndSetStateFuncForEvent =
    (getEngineStateFunc, setEngineStateFunc, buildSetStateFunc, engineState) =>
  engineState
  |> StateEngineService.setUnsafeGetStateFunc((.) => getEngineStateFunc())
  |> StateEngineService.setSetStateFunc(
       buildSetStateFunc(setEngineStateFunc),
     );

let _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent =
    editEngineState =>
  _setUnsafeGetStateFuncAndSetStateFuncForEvent(
    StateLogicService.getEditEngineState,
    StateLogicService.setEditEngineState,
    _buildSetStateFuncForEditEngineState,
    editEngineState,
  );

let _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent =
    runEngineState =>
  _setUnsafeGetStateFuncAndSetStateFuncForEvent(
    StateLogicService.getRunEngineState,
    StateLogicService.setRunEngineState,
    _buildSetStateFuncForRunEngineState,
    runEngineState,
  );

let handleEditEngineState = (editorState, editEngineState) => {
  StateEngineService.setIsDebug(true) |> ignore;

  let scene = editEngineState |> SceneEngineService.getSceneGameObject;


  let (editEngineState, editCamera) =
    editEngineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState;

  let (editEngineState,  cubeGeometry) = 
    editEngineState |> DefaultSceneUtils.prepareDefaultComponentForEditEngineState;
  let editEngineState =
    editEngineState |> DefaultSceneUtils.createDefaultSceneForEditEngineState(cubeGeometry);
  let (editorState, editEngineState) =
    editEngineState |> DefaultSceneUtils.computeDiffValue(editorState);

  editEngineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
  |> _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent
  |> SetIMGUIFuncUtils.setIMGUIFunc
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;

  editorState |> StateEditorService.setState |> ignore;
};

let handleRunEngineState = runEngineState => {
  let editorState = StateEditorService.getState();

  let scene = runEngineState |> SceneEngineService.getSceneGameObject;
  let (editEngineState,  cubeGeometry) = 
    editEngineState |> DefaultSceneUtils.prepareDefaultComponentForRunEngineState;
  let (editorState, runEngineState) =
    runEngineState
    |> DefaultSceneUtils.createDefaultSceneForRunEngineState(editorState);

  runEngineState
  |> _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;

  editorState |> StateEditorService.setState |> ignore;
};

let init = editorState =>
  Wonderjs.StateDataMainType.(
    _getLoadData("edit")
    |> WonderBsMost.Most.flatMap(editEngineState =>
         LoaderManagerEngineService.loadIMGUIAsset(
           "./public/font/myFont.fnt",
           "./public/font/myFont.png",
           Js.Nullable.return([|
             ("./public/img/camera.png", "camera"),
             ("./public/img/sun.png", "directionLight"),
             ("./public/img/point.png", "pointLight"),
           |]),
           editEngineState,
         )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.map(editEngineState =>
         editEngineState |> handleEditEngineState(editorState)
       )
    |> WonderBsMost.Most.concat(
         _getLoadData("run")
         |> WonderBsMost.Most.map(runEngineState =>
              runEngineState |> handleRunEngineState
            ),
       )
    |> WonderBsMost.Most.drain
    |> then_(_ => StateEditorService.getState() |> resolve)
  );

let start = () =>
  StateEditorService.getState()
  |> init
  |> then_(editorState =>
       editorState |> StateEditorService.setState |> resolve
     );