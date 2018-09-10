open Js.Promise;

let _getLoadData = () => {
  let engineDataDir = "./src/engine/data/";
  /* switch (type_) {
     | "edit" =>
       AssetEngineService.loadToData(
         [|"./src/engine/setting/editSetting.json", engineDataDir|],
         EngineStateDataEditorService.getEngineStateData(),
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
     }; */

  AssetEngineService.loadToData(
    [|"./src/engine/setting/setting.json", engineDataDir|],
    StateDataEngineService.getEngineStateData(),
  );
};

/* let _buildSetStateFuncForEngineState = setEngineStateFunc =>
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

   let _setEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent =
       engineState =>
     _setUnsafeGetStateFuncAndSetStateFuncForEvent(
       StateLogicService.getEngineState,
       StateLogicService.setEngineState,
       _buildSetStateFuncForEngineState,
       engineState,
     );

   let _setRunEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent =
       runEngineState =>
     _setUnsafeGetStateFuncAndSetStateFuncForEvent(
       StateLogicService.getRunEngineState,
       StateLogicService.setRunEngineState,
       _buildSetStateFuncForRunEngineState,
       runEngineState,
     ); */

let handleEngineState = engineState => {
  let engineState =
    JobEngineService.registerNoWorkerInitJob(
      "init_editor",
      InitEditorJobUtils.initEditorJob,
      engineState,
    )
    /* TODO handle loopBody */
    |> JobEngineService.registerNoWorkerInitJob(
         "init_event_for_editor",
         InitEventJobUtils.initEventForEditorJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "prepare_render_scene_view",
         PrepareRenderViewJobUtils.prepareRenderSceneViewJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "prepare_render_game_view",
         PrepareRenderViewJobUtils.prepareRenderGameViewJob,
       )
    |> JobEngineService.registerNoWorkerLoopJob(
         "restore",
         RestoreJobUtils.restoreJob,
       );

  StateEngineService.setIsDebug(true) |> ignore;

  let scene = engineState |> SceneEngineService.getSceneGameObject;

  engineState
  /* |> _setEnginestateUnsafeGetStateFuncAndSetStateFuncForEvent */
  |> GameObjectEngineService.setGameObjectName("scene", scene)
  |> DirectorEngineService.init
  /* TODO test */
  /* |> DirectorEngineService.loopBody(0.) */
  |> StateEngineService.setState;
};

/* let initEditorForRunEngineStateJob = (_, runEngineState) => {
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
   }; */

/* let handleRunEngineState = runEngineState => {
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
   }; */

let init = () =>
  Wonderjs.StateDataMainType.(
    _getLoadData()
    |> WonderBsMost.Most.flatMap(engineState =>
         LoaderManagerEngineService.loadIMGUIAsset(
           "./public/font/myFont.fnt",
           "./public/font/myFont.png",
           Js.Nullable.return([|
             ("./public/img/camera.png", "camera"),
             ("./public/img/sun.png", "directionLight"),
             ("./public/img/point.png", "pointLight"),
           |]),
           (_, _) => (),
           engineState,
         )
         |> WonderBsMost.Most.fromPromise
       )
    |> WonderBsMost.Most.map(engineState => engineState |> handleEngineState)
    /* |> WonderBsMost.Most.concat(
         _getLoadData("run")
         |> WonderBsMost.Most.flatMap(engineState =>
              LoaderManagerEngineService.loadIMGUIAsset(
                "./public/font/myFont.fnt",
                "./public/font/myFont.png",
                Js.Nullable.undefined,
                (_, _) => (),
                engineState,
              )
              |> WonderBsMost.Most.fromPromise
            )
         |> WonderBsMost.Most.map(runEngineState =>
              runEngineState |> handleRunEngineState
            ),
       ) */
    |> WonderBsMost.Most.drain
  );

let start = () => init();