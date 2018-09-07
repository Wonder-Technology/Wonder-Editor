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

let _setIMGUIFunc = (editorState, editEngineState) =>
  ManageIMGUIEngineService.setIMGUIFunc(
    EditIMGUIFuncUtils.getEditEngineStateCustomData(
      editorState,
      editEngineState,
    ),
    EditIMGUIFuncUtils.getEditEngineStateIMGUIFunc(),
    editEngineState,
  );

let initEditorForEditEngineStateJob = (_, editEngineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, editEngineState, editCamera) =
    editEngineState
    |> DefaultSceneUtils.prepareSpecificGameObjectsForEditEngineState(
         editorState,
       );

  let (editEngineState, cubeGeometry) =
    editEngineState
    |> DefaultSceneUtils.prepareDefaultComponentForEditEngineState;
  let editEngineState =
    editEngineState
    |> DefaultSceneUtils.createDefaultSceneForEditEngineState(cubeGeometry);
  let editorState = DefaultSceneUtils.computeDiffValue(editorState);

  editorState |> StateEditorService.setState |> ignore;

  editEngineState
  |> GameObjectComponentEngineService.getBasicCameraViewComponent(editCamera)
  |. BasicCameraViewEngineService.activeBasicCameraView(editEngineState)
  |> _setIMGUIFunc(editorState);
};

let handleEditEngineState = editEngineState => {
  let editEngineState =
    JobEngineService.registerNoWorkerInitJob(
      "init_editor",
      initEditorForEditEngineStateJob,
      editEngineState,
    );

  StateEngineService.setIsDebug(true) |> ignore;

  let scene = editEngineState |> SceneEngineService.getSceneGameObject;

  editEngineState
  |> _setEditEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setEditEngineState;
};

let initEditorForRunEngineStateJob = (_, runEngineState) => {
  let editorState = StateEditorService.getState();

  let (editorState, runEngineState, cubeGeometry) =
    DefaultSceneUtils.prepareDefaultComponentForRunEngineState(
      editorState,
      runEngineState,
    );
  let (editorState, runEngineState) =
    runEngineState
    |> DefaultSceneUtils.createDefaultSceneForRunEngineState(
         cubeGeometry,
         editorState,
       );

  editorState |> StateEditorService.setState |> ignore;

  runEngineState;
};

let handleRunEngineState = runEngineState => {
  let runEngineState =
    JobEngineService.registerNoWorkerInitJob(
      "init_editor",
      initEditorForRunEngineStateJob,
      runEngineState,
    );

  let scene = runEngineState |> SceneEngineService.getSceneGameObject;

  runEngineState
  |> _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  |> DirectorEngineService.loopBody(0.)
  |> StateLogicService.setRunEngineState;
};

let init = () =>
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
           (_, _) => (),
           editEngineState,
         )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.map(editEngineState =>
         editEngineState |> handleEditEngineState
       )
    |> WonderBsMost.Most.concat(
         _getLoadData("run")
         |> WonderBsMost.Most.flatMap(editEngineState =>
              LoaderManagerEngineService.loadIMGUIAsset(
                "./public/font/myFont.fnt",
                "./public/font/myFont.png",
                Js.Nullable.undefined,
                (_, _) => (),
                editEngineState,
              )
              |> WonderBsMost.Most.fromPromise
            )
         |> WonderBsMost.Most.map(runEngineState =>
              runEngineState |> handleRunEngineState
            ),
       )
    |> WonderBsMost.Most.drain
  );

let start = () => init();